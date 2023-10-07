import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CalendarIcon } from "lucide-react";
import React from "react";

function Test({
  // childrenA,
  childrenB,
}: {
  // childrenA: React.ReactNode;
  childrenB: React.ReactNode;
}) {
  return (
    <div className="text-white bg-[#030303]">
      <div className="grid grid-cols-1 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-9">
        <div className="col-span-1 sm:col-start-2 sm:col-span-3 md:col-span-5 md:col-start-2 lg:col-start-2 lg:col-span-5 xl:col-span-5 xl:col-start-2 overflow-y-auto">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@nextjs</Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 border-gray-500/30 bg-transparent text-white">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@nextjs</h4>
                  <p className="text-sm">
                    The React Framework – created and maintained by @vercel.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      Joined December 2021
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <div className="hidden lg:block lg:col-span-2 px-5">{childrenB}</div>
      </div>
    </div>
  );
}

export default Test;
