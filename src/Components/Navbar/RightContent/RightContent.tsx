import { Button } from "@chakra-ui/react";
import AuthModal from "@/Components/Modal/Auth/AuthModal";
import { auth } from "@/firebase/clientApp";
import { Flex } from "@chakra-ui/react";
import { signOut, User } from "firebase/auth";
import React from "react";
import AuthButtons from "./AuthButtons";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

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
          <Icons />
        ) : (
          <AuthButtons />
        )}
        <UserMenu user={user} />
      </Flex>
    </>
  );
};
export default RightContent;
