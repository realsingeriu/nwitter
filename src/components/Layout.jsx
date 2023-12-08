import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <h2>로그아웃</h2>
      <Outlet />
    </>
  );
}
