import { auth } from "@/firebase/clientApp";
import { Flex, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import {
  useSignInWithGoogle,
  useSignInWithFacebook,
} from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signUpWithGoogle, user, loading, userError] =
    useSignInWithGoogle(auth);
  const [signUpWithFacebook, fuser, floading, fuserError] =
    useSignInWithFacebook(auth);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button
        variant="oauth"
        mb={2}
        isLoading={loading}
        onClick={() => signUpWithGoogle()}
      >
        <Image height="20px" mr={4} src="/images/googlelogo.png" />
        Continue with Google
      </Button>
      <Button
        variant="oauth"
        isLoading={floading}
        onClick={() => signUpWithFacebook()}
      >
        <Image height="24px" mr={3} src="/images/facebooklogo.png" />
        Continue with Facebook
      </Button>
      <Text textAlign="center" color="red" fontSize="10pt">
        {userError?.message as keyof typeof userError || fuserError?.message }
      </Text>
    </Flex>
  );
};
export default OAuthButtons;
