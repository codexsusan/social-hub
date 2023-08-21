import AppNavbar from "@/components/common/AppNavbar";

function AppContainer(props: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col bg-[#030303]">
      <AppNavbar />
      {props.children}
    </div>
  );
}

export default AppContainer;
