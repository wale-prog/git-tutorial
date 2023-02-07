import { auth, firestore } from "@/firebase/clientApp";
import { Flex, Button, Image, Text, useFocusEffect } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import {
  useSignInWithGoogle,
  useSignInWithFacebook,
} from "react-firebase-hooks/auth";

const OAuthButtons: React.FC = () => {
  const [signUpWithGoogle, userCred, loading, userError] =
    useSignInWithGoogle(auth);
  const [signUpWithFacebook, fuser, floading, fuserError] =
    useSignInWithFacebook(auth);

  const createUserDocument = async (user: User) => {
    const userDocRef = doc(firestore, "users", user.uid);
    await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
  };

  useEffect(() => {
    if (userCred) {
      createUserDocument(userCred.user);
    }
  }, [userCred]);

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
        {(userError?.message as keyof typeof userError) || fuserError?.message}
      </Text>
    </Flex>
  );
};
export default OAuthButtons;
