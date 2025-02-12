import React from "react";
import Logo from "./Logo";

export default function MobileHeader() {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 flex items-center mb-6">
      <div className="w-full border-b dark:border-borderMain/50 mx-3.5 h-full flex items-center dark:ring-borderMain/50 dark:divide-borderMain/50 shadow-md">
        <Logo size="large" />
      </div>
    </nav>
  );
}
