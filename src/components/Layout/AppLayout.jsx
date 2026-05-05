import { Headers } from "../UI/Headers";
import { Footers } from "../UI/Footer";
import { Outlet } from "react-router-dom";


export const AppLayout = () => {
  return (
    <>
      <Headers />
      <Outlet />
      <Footers />
    </>
  );
};
