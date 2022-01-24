import { MenuItem } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AuthActionsType } from "../store/types/AuthTypes";
import axiosInstance from "../utils/AxiosInterceptor";
import { useNavigate } from "react-router-dom";
import { Dispatch } from "react";

const Logout = () => {
  const dispatch = useDispatch<Dispatch<AuthActionsType>>();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      dispatch({
        type: "SET_UNAUTHENTICATED",
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return <MenuItem onClick={handleLogout}>Logout</MenuItem>;
};

export default Logout;
