import SideBar from "@/components/SideBar.tsx";
import { Outlet } from "react-router-dom";

const KH = () => {
  return (
    <div
      className={
        "fixed top-0 bottom-0 left-0 right-0 flex flex-row overflow-hidden"
      }
    >
      <SideBar />
      <div className={" grow"}>
        <Outlet />
      </div>
    </div>
  );
};
export default KH;
