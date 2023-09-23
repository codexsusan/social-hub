import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

function BookmarkTab() {
  return (
    <Card className="bg-[#27272A]">
      <CardHeader>
        <CardTitle className="text-white">Bookmarks</CardTitle>
        <CardDescription>
          Overview of the user bookmarks will be listed here.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-sm border-slate-600 flex gap-2 flex-col text-white p-4 cursor-pointer"></div>
      </CardContent>
    </Card>
  );
}

export default BookmarkTab;
