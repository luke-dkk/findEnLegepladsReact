import { Outlet } from "react-router";
import Header from "../header/Header";

export function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}