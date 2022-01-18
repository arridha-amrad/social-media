import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Image, Text } from "@chakra-ui/react";
import { FC } from "react";
import Logout from "../components/Logout";


const Home: FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const { authenticatedUser, isLoadingAuth } = useSelector(
    (state: RootState) => state.auth
  );
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {!isLoadingAuth && authenticatedUser && (
        <>
          <Text>{authenticatedUser.username}</Text>
          <Text>{authenticatedUser.email}</Text>
          <Image src={authenticatedUser.avatarURL} alt="avatar" />
          <Logout />
        </>
      )}
    </div>
  );
};

export default Home;
