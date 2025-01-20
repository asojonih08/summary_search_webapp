import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function AnswerSkeleton() {
  return (
    <div className="w-full h-[21vh] dark:bg-mainBackgroundDark dark:border-borderMain/20 border rounded-lg shadow-lg p-6">
      <div className="space-y-2">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            type: "spring",
            duration: 400,
            damping: 20,
          }}
        >
          <Skeleton className="h-4 w-full dark:bg-borderMain" />
        </motion.div>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "90%" }}
          transition={{
            type: "spring",
            duration: 400,
            delay: 0.05,
            damping: 20,
          }}
        >
          <Skeleton className="h-4 dark:bg-borderMain" />
        </motion.div>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "80%" }}
          transition={{
            type: "spring",
            duration: 400,
            delay: 0.1,
            damping: 20,
          }}
        >
          <Skeleton className="h-4 dark:bg-borderMain" />
        </motion.div>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "70%" }}
          transition={{
            type: "spring",
            duration: 400,
            delay: 0.15,
            damping: 20,
          }}
        >
          <Skeleton className="h-4 dark:bg-borderMain" />
        </motion.div>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "60%" }}
          transition={{
            type: "spring",
            duration: 400,
            delay: 0.2,
            damping: 20,
          }}
        >
          <Skeleton className="h-4 dark:bg-borderMain" />
        </motion.div>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "50%" }}
          transition={{
            type: "spring",
            duration: 400,
            delay: 0.25,
            damping: 20,
          }}
        >
          <Skeleton className="h-4 dark:bg-borderMain" />
        </motion.div>
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "40%" }}
          transition={{
            type: "spring",
            duration: 400,
            delay: 0.3,
            damping: 20,
          }}
        >
          <Skeleton className="h-4 dark:bg-borderMain" />
        </motion.div>
      </div>
    </div>
  );
}
