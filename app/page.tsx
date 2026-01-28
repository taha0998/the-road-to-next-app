import { Suspense } from "react";

import { Heading } from "@/components/Heading";
import { Spinner } from "@/components/Spinner";
import { TicketList } from "@/features/ticket/components/TicketList";

const HomePage = () => {
  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="All tickets"
        description="All users tickets at one place to start"
      />
      <div className="flex-1 flex flex-col items-center">
        <Suspense fallback={<Spinner />}>
          <TicketList />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
