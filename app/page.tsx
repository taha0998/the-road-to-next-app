import Link from "next/link";

import { Heading } from "@/components/Heading";
import { getAuth } from "@/features/auth/actions/getAuth";
import { signInPath, ticketsPath } from "@/lib/paths";

const HomePage = async () => {
  const { user } = await getAuth();
  const path = user ? ticketsPath() : signInPath();
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="Home" description="Your home place to start" />
      <div className="flex-1 flex flex-col items-center">
        <Link href={path} className="underline">
          Go to Tickets
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
