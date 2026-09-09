"use client";

import { useState, type SubmitEvent } from "react";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import Link from "next/link";

const PRESET_USERS = ["torvalds", "gaearon", "sindresorhus"];

export default function SearchSection() {
  const [username, setUsername] = useState("");
  const router = useRouter();
  const validUsername = username.trim();

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    if (!validUsername) return;
    router.push(`/profile/${validUsername}`);
  }

  return (
    <div className="flex gap-4 flex-col items-center w-100">
      <form onSubmit={handleSubmit}>
        <Field
          orientation="horizontal"
          className="flex flex-col px-6 md:flex-row"
        >
          <Input
            type="search"
            placeholder="Username to Search..."
            className="py-5 pl-3"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <Button className="p-5 w-full md:w-25" type="submit">
            Search
          </Button>
        </Field>
      </form>
      <p className="flex gap-1 items-center text-muted-foreground">
        Try:
        {PRESET_USERS.map((user, index) => {
          return (
            <span key={user} className="">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Link
                      href={`/profile/${user}`}
                      className="text-foreground"
                    />
                  }
                >
                  {user}
                </TooltipTrigger>

                <TooltipContent side={"bottom"}>
                  <p>Click to search</p>
                </TooltipContent>
              </Tooltip>

              <span key={user} className="">
                {" "}
                {index < PRESET_USERS.length - 1 && <span>·</span>}
              </span>
            </span>
          );
        })}
      </p>
    </div>
  );
}
