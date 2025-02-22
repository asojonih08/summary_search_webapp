import LoginSignUpForm from "@/components/LoginSignUpForm";
import Logo from "@/components/Logo";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export default function LoginPage() {
  return (
    <div className="fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] gap-4 border border-neutral-200 p-6 duration-200 sm:rounded-lg dark:border-neutral-800 dark:bg-backgroundDark h-full w-full max-w-[100%] flex flex-col justify-center items-center">
      <div className="relative bg-mainBackgroundDark md:w-[70%] w-[82%] max-w-[700px] h-auto flex flex-col items-center justify-center rounded-lg">
        <GlowingEffect
          blur={1}
          borderWidth={1.5}
          spread={40}
          glow={true}
          disabled={false}
          proximity={104}
          inactiveZone={0.01}
          movementDuration={8}
        />
        <Logo size="large" />
        <LoginSignUpForm />
      </div>
    </div>
  );
}
