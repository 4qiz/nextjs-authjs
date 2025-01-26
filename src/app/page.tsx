import { LoginButton } from "@/shared/components/login-button";
import { Button } from "@/shared/ui/button";

export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center ">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-foreground drop-shadow-md">
          Auth
        </h1>
        <p className="text-foreground text-lg">Auth service</p>
        <div>
          <LoginButton asChild mode="modal">
            <Button>Sign in</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
