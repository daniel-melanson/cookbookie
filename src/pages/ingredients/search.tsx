import React from "react";
import NavigationBar from "~/components/NavigationBar";

import PageBase from "~/components/PageBase";

export default function Page() {
  return (
    <PageBase title="Search">
      <NavigationBar />
      <main className="lg:mx-5"></main>
    </PageBase>
  );
}
