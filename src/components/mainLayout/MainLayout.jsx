import { Outlet } from "react-router";
import Header from "../header/Header";
import "./MainLayout.css";
export function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}