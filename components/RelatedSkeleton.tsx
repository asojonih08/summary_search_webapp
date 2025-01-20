import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function RelatedSkeleton() {
  return (
    <motion.div
      initial={{ width: "0%" }}
      animate={{ width: "100%" }}
      transition={{
        type: "spring",
        duration: 300,
        damping: 20,
      }}
    >
      <Skeleton className="h-4 w-full dark:bg-borderMain" />
    </motion.div>
  );
}
