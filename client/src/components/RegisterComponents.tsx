import {
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";

interface RegisterComponentsProps {
  email: string;
  username: string;
  password: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleRegister: React.MouseEventHandler<HTMLButtonElement>;
  isLoading: boolean;
}

const RegisterComponents: FC<RegisterComponentsProps> = ({
  email,
  handleChange,
  username,
  password,
  handleRegister,
  isLoading,
}) => {
  return (
    <>
      <Text fontSize="xl" fontWeight="bold">
        Register
      </Text>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="text" name="email" value={email} onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          name="username"
          type="text"
          value={username}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          name="password"
          type="password"
          value={password}
          onChange={handleChange}
        />
      </FormControl>
      <Button
        colorScheme="blue"
        isLoading={isLoading}
        mt="10"
        w="100%"
        onClick={handleRegister}
      >
        Register
      </Button>
      <Box mt="2" textAlign="center">
        <Link color="blue" to="/login">
          login
        </Link>
      </Box>
    </>
  );
};

export default RegisterComponents;
