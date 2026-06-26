"use client";

import React, { useState } from "react";
import { User, Mail, Phone, MapPin, Save, Camera, Loader2 } from "lucide-react";
import UseAxiosSecure from "@/UseAxiosSecure/UseAxiosSecure";
import { useUser } from "@clerk/nextjs";
import Swal from "sweetalert2";

export default function DashboardProfile() {
  const { user, isLoaded } = useUser();
  const axiosSecure = UseAxiosSecure();
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
  });

  React.useEffect(() => {
    if (isLoaded && user) {
      setFormData({
        name: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
        phone: user.primaryPhoneNumber?.phoneNumber || "",
        location: "Rajshahi, Bangladesh",
        bio: "Passionate Full Stack Developer and AI Enthusiast.",
      });
    }
  }, [isLoaded, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await axiosSecure.patch("/api/users/profile", formData);
      Swal.fire({
        title: "Success",
        text: "Profile updated successfully!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error: any) {
      Swal.fire("Error", error.response?.data?.message || "Failed to update profile", "error");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">My Profile</h1>
        <p className="text-sm text-muted-foreground">
          Manage your personal information and preferences.
        </p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        {/* Cover Photo Area */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-violet-500 w-full relative">
          <button className="absolute bottom-3 right-3 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-full transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar */}
        <div className="px-6 sm:px-8 relative -mt-12 mb-6 flex justify-between items-end">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full border-4 border-card bg-secondary flex items-center justify-center text-3xl font-bold text-primary shadow-md overflow-hidden">
              <img
                src={user?.imageUrl || "https://github.com/md-tahmid-hasan-golap.png"}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center -z-10 bg-indigo-100 dark:bg-indigo-900/50">
                {formData.name ? formData.name.charAt(0).toUpperCase() : "TH"}
              </span>
            </div>
            <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1.5 rounded-full border-2 border-card shadow-sm hover:scale-105 transition-transform">
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="px-6 sm:px-8 pb-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-foreground">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Location */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-foreground">Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-semibold text-foreground">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 bg-background border border-input rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl shadow-md transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
