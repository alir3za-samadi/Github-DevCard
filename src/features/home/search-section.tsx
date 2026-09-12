"use client";

import { useState, type SubmitEvent } from "react";
import { Field } from "@/components/base/field";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";
import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/base/tooltip";
import Link from "next/link";

const PRESET_USERS = ["torvalds", "gaearon", "sindresorhus"] as const;

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
        <div className="flex flex-col px-6 gap-2 md:flex-row">
          <Field orientation="horizontal" className="">
            <Input
              type="search"
              placeholder="Username to Search..."
              className="py-5 pl-3"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Field>
          <Button className="p-5 w-full md:w-auto" type="submit">
            Search
          </Button>
        </div>
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
