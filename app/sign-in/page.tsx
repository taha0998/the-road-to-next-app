import Link from "next/link";
import { redirect } from "next/navigation";

import CardCompact from "@/components/CardCompact";
import { getAuth } from "@/features/auth/actions/getAuth";
import { SignInForm } from "@/features/auth/components/SignInForm";
import { signUpPath, ticketsPath } from "@/lib/paths";

const signInPage = async () => {
  const {user} = await getAuth();
  if (user) {
    redirect(ticketsPath());
  }
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <CardCompact
        className="w-full max-w-105 animate-fade-in-top"
        title="Sign In"
        description="Sign in to your account"
        content={<SignInForm />}
        footer={
          <>
            <Link className="text-sm text-muted-foreground" href={signUpPath()}>
              No account yet?
            </Link>
            <Link className="text-sm text-muted-foreground" href="#">
              Forget Password?
            </Link>
          </>
        }
      />
    </div>
  );
};

export default signInPage;
