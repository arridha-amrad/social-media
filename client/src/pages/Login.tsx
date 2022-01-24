import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { RootState } from "../store";
import { AuthenticatedUserData } from "../store/reducers/AuthReducer";
import { AuthActionsType } from "../store/types/AuthTypes";
import axiosInstance from "../utils/AxiosInterceptor";
import getGoogleOauthURL from "../utils/GetGoogleOAuthURL";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<AuthActionsType>>();
  const [message, setMessage] = useState("");
  const [urlNextParam, setURLNextParam] = useState("");
  const { isLoadingAuth, isAuthenticated, authMessage } = useSelector(
    (state: RootState) => state.auth
  );
  const [state, setState] = useState({
    identity: "",
    password: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const { data } = await axiosInstance.post<{
        user: AuthenticatedUserData;
      }>(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, state);
      dispatch({
        type: "SET_AUTHENTICATED",
        payload: data.user,
      });
      if (urlNextParam) {
        navigate(`${urlNextParam}`);
      } else {
        navigate("/");
      }
    } catch (err: any) {
      console.log(err);
      setMessage(err.response.data.message);
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("e");
    const nextParam = urlParams.get("next");
    if (nextParam) {
      setURLNextParam(nextParam);
    }
    if (authMessage) {
      setMessage(authMessage);
    }
    if (myParam) {
      setMessage(myParam);
    }
    if (isAuthenticated) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  const openGoogleOauth = () => {
    window.open(getGoogleOauthURL(), "_blank");
  };
  const openFacebookOauth = () => {
    window.open("http://localhost:5000/api/facebook/login", "_blank");
  };
  return (
    <Container>
      {!!message && (
        <Alert status="error">
          <AlertIcon />
          {message}
        </Alert>
      )}
      <Text fontSize="xl" fontWeight="bold">
        Login
      </Text>
      <FormControl>
        <FormLabel>Email or Username</FormLabel>
        <Input
          type="text"
          name="identity"
          value={state.identity}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type="password"
          value={state.password}
          onChange={handleChange}
        />
      </FormControl>
      <Button mt="10" w="100%" onClick={handleLogin} color="blue">
        {isLoadingAuth ? "Loading..." : "Login"}
      </Button>
      <Box mt="2" textAlign="center">
        <Link to="/register">register</Link>
      </Box>
      <Box mt="5">
        <Button w="100%" mt="2" colorScheme="orange" onClick={openGoogleOauth}>
          Login with Google
        </Button>
        <Button
          colorScheme="facebook"
          w="100%"
          mt="2"
          onClick={openFacebookOauth}
        >
          Login with Facebook
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
