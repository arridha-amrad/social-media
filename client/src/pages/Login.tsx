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
import axios from "axios";
import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store";
import {
  AuthActionsType,
  LOADING_AUTH,
  STOP_LOADING_AUTH,
} from "../store/types/AuthTypes";
import getGoogleOauthURL from "../utils/GetGoogleOAuthURL";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<Dispatch<AuthActionsType>>();
  const [message, setMessage] = useState("");
  const { isLoadingAuth, isAuthenticated } = useSelector(
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
      dispatch({ type: LOADING_AUTH });
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
        state,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({
        type: "AUTHENTICATED_USER_DATA",
        payload: data.user,
      });
      window.location.href = "/";
    } catch (err: any) {
      console.log(err);
      setMessage(err.response.data.message);
    } finally {
      dispatch({ type: STOP_LOADING_AUTH });
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("e");
    if (myParam) {
      setMessage(myParam);
    }
    if (!isLoadingAuth && isAuthenticated) {
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
