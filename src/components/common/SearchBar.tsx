import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchBar() {
  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        className="bg-[#272729] w-full flex-1 "
        type="text"
        placeholder="Search"
      />
      <Button type="submit">
        <Search />
      </Button>
    </div>
  );
}
