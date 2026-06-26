import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import UseAxiosSecure from "../UseAxiosSecure/UseAxiosSecure";
import { useAuth } from "@clerk/nextjs";

// 1. Zod Validation Schema
export const profileValidationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long.").optional(),
  phone: z.string().min(10, "Phone must be at least 10 characters.").optional(),
  bio: z.string().max(300, "Bio cannot exceed 300 characters.").optional(),
});

// 2. React Hook Form Setup Logic Shell
export const useProfileFormLogic = () => {
  const axiosSecure = UseAxiosSecure();
  const { userId } = useAuth();

  const methods = useForm({
    resolver: zodResolver(profileValidationSchema),
    defaultValues: {
      name: "",
      phone: "",
      bio: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = methods;

  // 3. Form Submission Handler
  const onSubmit = async (formData) => {
    try {
      if (!userId) {
        throw new Error("User not authenticated.");
      }

      const response = await axiosSecure.patch("/api/users/profile", formData, {
        headers: {
          "x-clerk-user-id": userId,
        },
      });

      if (response.data.success) {
        console.log("Profile updated successfully:", response.data);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return {
    methods,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    reset,
  };
};
