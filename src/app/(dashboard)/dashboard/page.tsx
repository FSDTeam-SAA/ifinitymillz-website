import React from "react";
import OverviewCard from "../_components/OverviewCard";
import RevenueOverviewChart from "../_components/ParticipantsPage";

function page() {
  return (
    <div className="p-6">
      <OverviewCard />
      <div className="mt-10">
        <RevenueOverviewChart />
      </div>
    </div>
  );
}

export default page;
