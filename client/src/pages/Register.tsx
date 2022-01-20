import { Container, Alert, AlertIcon } from "@chakra-ui/react";
import React, { useState } from "react";
import EmailVerification from "../components/EmailVerification";
import RegisterComponents from "../components/RegisterComponents";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { LOADING_AUTH, STOP_LOADING_AUTH } from "../store/types/AuthTypes";
import axios, { AxiosRequestConfig } from "axios";

const Register = () => {
  const [state, setState] = useState({
    email: "",
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { isLoadingAuth } = useSelector((state: RootState) => state.auth);
  const [message, setMessage] = useState<{
    body: string;
    type: "error" | "success";
  }>({
    body: "",
    type: "success",
  });
  const registrationSteps = ["registration", "emailVerification"];
  const [step, setStep] = useState(0);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // to send json data and get cookies from server
  const axiosConfig: AxiosRequestConfig = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  const handleRegister = async () => {
    dispatch({ type: LOADING_AUTH });
    try {
      const { data, status } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/register`,
        state,
        axiosConfig
      );
      if (status === 201) {
        setStep((prev) => prev + 1);
        setMessage({
          body: data.message,
          type: "success",
        });
      }
      console.log(data);
    } catch (err: any) {
      console.log(err.response.data);
      setMessage({
        body: err.response.data.message,
        type: "error",
      });
    } finally {
      dispatch({
        type: STOP_LOADING_AUTH,
      });
    }
  };
  const [verificationCode, setCode] = useState("");

  const verify = async () => {
    console.log("verificationCode : ", verificationCode);
    dispatch({ type: LOADING_AUTH });
    try {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/verify-email`,
        {
          verificationCode,
        },
        axiosConfig
      );
      setStep(0);
      window.location.href = "/";
    } catch (err: any) {
      console.log(err.response);
      setMessage({
        type: "error",
        body: err.response.data.message,
      });
    } finally {
      dispatch({
        type: STOP_LOADING_AUTH,
      });
    }
  };
  return (
    <Container>
      {!!message.body && (
        <Alert status={message.type}>
          <AlertIcon />
          {message.body}
        </Alert>
      )}
      {registrationSteps[step] === "registration" && (
        <RegisterComponents
          isLoading={isLoadingAuth}
          email={state.email}
          username={state.username}
          password={state.password}
          handleChange={handleChange}
          handleRegister={handleRegister}
        />
      )}
      {registrationSteps[step] === "emailVerification" && (
        <EmailVerification
          isLoading={isLoadingAuth}
          setVerificationCode={setCode}
          verificationCode={verificationCode}
          verify={verify}
        />
      )}
    </Container>
  );
};

export default Register;
