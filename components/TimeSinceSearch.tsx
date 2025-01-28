import React, { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa6";

export default function TimeSinceSearch() {
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 60000); // Convert milliseconds to minutes
      setMinutes(elapsedTime);
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <div className="dark:text-textOffDark font-medium text-xs flex items-center gap-1">
      <FaRegClock className="h-[10.5px] w-[10.5px]" />
      <span>{minutes === 0 ? "Now" : minutes + "m"}</span>
    </div>
  );
}
