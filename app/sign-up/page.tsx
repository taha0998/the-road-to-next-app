import Link from "next/link";
import { redirect } from "next/navigation";

import CardCompact from "@/components/CardCompact";
import { getAuth } from "@/features/auth/actions/getAuth";
import { SignUpForm } from "@/features/auth/components/SignUpForm";
import { signInPath, ticketsPath } from "@/lib/paths";

const signUpPage = async () => {
  const {user}  = await getAuth();
  if (user) {
    redirect(ticketsPath());
  }
  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <CardCompact
        className="w-full max-w-105  animate-fade-in-top"
        title="Sign Up"
        description="Create an account to get started"
        content={<SignUpForm />}
        footer={
          <Link className="text-sm text-muted-foreground" href={signInPath()}>
            Have an account? Sign In now.
          </Link>
        }
      />
    </div>
  );
};

export default signUpPage;
