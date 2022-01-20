import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
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
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
