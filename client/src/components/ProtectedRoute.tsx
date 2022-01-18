import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Login } from "../pages";
import { RootState } from "../store";
import Navbar from "./Navbar";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoadingAuth } = useSelector(
    (state: RootState) => state.auth
  );
  return !isLoadingAuth && isAuthenticated ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Login />
  );
};

export default ProtectedRoute;
