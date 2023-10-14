import * as Form from "@radix-ui/react-form";
import * as Checkbox from "@radix-ui/react-checkbox";
import React from "react";
import NavigationBar from "~/components/NavigationBar";

import PageBase from "~/components/PageBase";
import { RiCheckFill } from "react-icons/ri";

function CheckBox({ label }: { label: string }) {
  const name = label.toLowerCase();

  return (
    <div className="flex space-x-1">
      <Checkbox.Root
        value={"true"}
        name={name}
        className="hover:bg-violet3 flex h-[16px] w-[16px] appearance-none items-center justify-center rounded bg-white outline-none focus:shadow-[0_0_0_2px_black] "
      >
        <Checkbox.Indicator>
          <RiCheckFill />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default function Page() {
  // TODO use router to get query params
  // const rounter = useRouter();

  return (
    <PageBase title="Search">
      <NavigationBar />
      <main className="flex lg:m-5 lg:mb-0">
        <Form.Root className="bg-nobel-200 flex h-64 w-64 rounded-lg p-4">
          <div className="flex w-full flex-col">
            <label className="text-nobel-700 mb-1 text-lg">Meal</label>
            <CheckBox label="Breakfast" />
            <CheckBox label="Lunch" />
            <CheckBox label="Dinner" />
            <CheckBox label="Snack" />
          </div>
        </Form.Root>
        <div className="ml-4 grid flex-grow grid-cols-5 gap-4">
          <div className="h-[128px] w-[128px] rounded-lg bg-white" />
          <div className="h-[128px] w-[128px] bg-white" />
          <div className="h-[128px] w-[128px] bg-white" />
          <div className="h-[128px] w-[128px] bg-white" />
          <div className="h-[128px] w-[128px] bg-white" />
          <div className="h-[128px] w-[128px] bg-white" />
          <div className="h-[128px] w-[128px] bg-white" />
          <div className="h-[128px] w-[128px] bg-white" />
        </div>
      </main>
    </PageBase>
  );
}
