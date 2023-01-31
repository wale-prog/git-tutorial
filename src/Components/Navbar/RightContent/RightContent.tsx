import { Button } from "@chakra-ui/react";
import AuthModal from "@/Components/Modal/Auth/AuthModal";
import { auth } from "@/firebase/clientApp";
import { Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";

type RightContentProps = {
  user?: User | null;
};

const RightContent: React.FC<RightContentProps> = ({ user }) => {
  console.log(user)
  return (
    <>
      <AuthModal />
      <Flex justify="center" align="center">
        {user ? (
          // <Button
          //   onClick={() => {
          //     signOut(auth);
          //   }}
          // >
          //   Logout
          // </Button>
          <Icons />
        ) : (
          <AuthButtons />
        )}
        {/* <Menu /> */}
      </Flex>
    </>
  );
};
export default RightContent;
