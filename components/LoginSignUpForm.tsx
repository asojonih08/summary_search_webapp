"use client";
import React, { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { createClient } from "@/utils/supabase/client";
import {
  // Import predefined theme
  ThemeSupa,
} from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";

export default function LoginSignUpForm() {
  const supabase = createClient();

  const router = useRouter();

  const [user, setUser] = useState<any>();
  const [view, setView] = useState("sign_in");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        router.push("/"); // Redirect to home page if user is logged in
      }
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          router.push("/"); // Redirect to home page after login
        }
      }
    );

    getUser();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase, router]);
  return (
    <div className="md:w-[70%] w-[82%] max-w-[600px] transition-all duration-300">
      {!user ? (
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#2D2F2F",
                  brandAccent: "#464949",
                  brandButtonText: "#1cb9cd",
                  inputBorderHover: "red",
                },
              },
              dark: {
                colors: {
                  inputBorderHover: "#1cb9cd54",
                  inputBorderFocus: "#1cb9cd7A",
                },
              },
            },
          }}
          theme="dark"
          providers={["google"]}
        ></Auth>
      ) : null}
    </div>
  );
}
