import {
  Avatar,
  Box,
  Container,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Logout from "./Logout";

const Navbar = () => {
  const { authenticatedUser } = useSelector((state: RootState) => state.auth);
  return (
    <Box h="20" bg="whitesmoke">
      <Container
        height="100%"
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        size=""
      >
        <Box>
          <Text fontSize="large" fontWeight="bold" color="black">
            Social Media
          </Text>
        </Box>
        <Box>
          <Menu>
            <MenuButton>
              <Avatar src={authenticatedUser?.avatarURL} />
            </MenuButton>
            <MenuList>
              <Logout />
            </MenuList>
          </Menu>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
