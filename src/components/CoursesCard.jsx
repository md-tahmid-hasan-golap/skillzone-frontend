import React from "react";
import { BookOpen, Users, Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

const CoursesCard = ({ skill }) => {
  const {
    title,
    instructor,
    price,
    duration,
    rating,
    image,
    description,
    lessons,
    enrolledStudents,
    _id,
  } = skill;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      className="group relative bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 flex flex-col h-full"
    >
      {/* Top Gradient Glow on Hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

      {/* Course Image Wrapper */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-border text-xs font-semibold text-primary shadow-sm z-10">
          {duration}
        </div>
      </div>

      {/* Course Content Details */}
      <div className="p-5 flex flex-col flex-grow relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center text-amber-500 gap-1 bg-amber-500/10 px-2 py-0.5 rounded text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground font-medium">
            By {instructor}
          </span>
        </div>

        <h3 className="font-bold text-lg text-foreground line-clamp-2 mb-2 font-poppins leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>

        {/* Dynamic Meta Matrix */}
        <div className="grid grid-cols-2 gap-3 py-3 border-t border-b border-border/60 mb-5 mt-auto">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs font-medium">{lessons} Lessons</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs font-medium">
              {enrolledStudents} Students
            </span>
          </div>
        </div>

        {/* Action Layer */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
              Price
            </span>
            <span className="text-lg font-extrabold text-foreground font-poppins">
              TK. {price?.toLocaleString() || 0}
            </span>
          </div>

          <Link
            href={`/skillsDetails/${_id}`}
            className="px-4 py-2.5 bg-foreground hover:bg-primary text-background hover:text-primary-foreground text-sm font-semibold rounded-xl shadow-md transition-all duration-300 flex items-center gap-1.5 group/btn"
          >
            View Details
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CoursesCard;
