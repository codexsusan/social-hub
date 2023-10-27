import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { changeSearchQuery } from "@/features/searchpage/searchInfoSlice";
import { Search } from "lucide-react";
import { MouseEventHandler, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function SearchBar() {
  const navigate = useNavigate();
  const searchData = useAppSelector(
    (state) => state.search.searchInfo.searchQuery
  );
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState(searchData);
  const location = useLocation();
  const handleSearch: MouseEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex w-full items-center space-x-2">
      <Input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          dispatch(changeSearchQuery(e.target.value));
        }}
        className="border w-full flex-1 text-lg font-medium text-black"
        type="text"
        placeholder="Search"
        onClick={() => {
          if (location.pathname !== "/search") {
            navigate("/search");
          }
        }}
      />
      <Button onClick={handleSearch} type="submit">
        <Search />
      </Button>
    </div>
  );
}
