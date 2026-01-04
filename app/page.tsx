import Link from "next/link";

import { ticketsPath } from "@/lib/paths";

const HomePage = () => {
  return (
    <div>
      <h2>Homepage</h2>
      <Link href={ticketsPath()} className="underline">
        go to tickets
      </Link>
    </div>
  );
};

export default HomePage;
