import AppNavbar from "@/components/common/AppNavbar";

function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-[#fbfffe] ">
      <AppNavbar />
      <div className="mt-16">{props.children}</div>
    </div>
  );
}

export default AppContainer;
