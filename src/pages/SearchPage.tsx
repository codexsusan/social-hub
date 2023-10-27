import PostSearch from "@/components/searchpage/PostSearch";

function SearchPage() {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-10">
        <div className="p-4 border col-start-3 sm:col-start-2 sm:col-span-8 md:col-start-3 md:col-span-6">
          <PostSearch />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
