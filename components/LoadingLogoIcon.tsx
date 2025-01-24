"use client";
import React, { useEffect } from "react";
import { useAnimate } from "framer-motion";
import LogoIcon from "./LogoIcon";

interface LoadingLogoIconProps {
  className: string;
  isLoading: boolean;
}

export default function LoadingLogoIcon({
  className,
  isLoading,
}: LoadingLogoIconProps) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isLoading) {
      // Start infinite pulsing (scaling up and down)
      animate(
        scope.current,
        { scale: [1, 1.3, 1] }, // Scale up to 1.5, then back to 1
        { duration: 1.3, repeat: Infinity, ease: "easeInOut" } // Smooth pulsing
      );
    } else {
      // Stop pulsing and reset to original size
      animate(scope.current, { scale: 1 }, { duration: 0.5 });
    }
  }, [isLoading, animate, scope]);

  return (
    <div ref={scope}>
      <LogoIcon className={`${className}`} />
    </div>
  );
}
