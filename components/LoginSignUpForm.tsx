import { Button } from "./ui/button";
import { login } from "@/app/login/actions";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import GoogleOAuth from "./GoogleOAuth";

export default function LoginSignUpForm() {
  return (
    <div className="md:w-[70%] w-[82%] max-w-[600px] transition-all duration-300 h-[340px]">
      <>
        <GoogleOAuth />
        {/* <Auth
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
            providers={[]}
          ></Auth> */}
        <form>
          <div className="flex flex-col gap-3">
            <div className="grid gap-2 mt-5">
              <Label className="dark:text-textMainDark" htmlFor="email">
                Email
              </Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label className="dark:text-textMainDark" htmlFor="password">
                  Password
                </Label>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-4 hover:underline dark:text-textMainDark"
                >
                  Forgot your password?
                </a>
              </div>
              <Input name="password" id="password" type="password" required />
            </div>
            <Button type="submit" formAction={login} className="w-full">
              Login
            </Button>
          </div>
        </form>
      </>
    </div>
  );
}
