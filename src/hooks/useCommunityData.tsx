import {
  Community,
  communitySnippet,
  communityState,
} from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCummunityStateValue] =
    useRecoilState(communityState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // is the user signed in?
    //if not open auth modal

    if (isJoined) {
      leaveCommunity(communityData.id);
      return;
    }
    joinCommunity(communityData);
  };

  const getMySnippets = async () => {
    setLoading(true);
    try {
      // get users snippets

      const snippetsDocs = await getDocs(
        collection(firestore, `users/${user?.uid}/communitySnippets`)
      );
      const snippets = snippetsDocs.docs.map((doc) => ({ ...doc.data() }));
      setCummunityStateValue((prev) => ({
        ...prev,
        mySnippets: snippets as communitySnippet[],
      }));
      console.log("Here are the snippets", snippets);
    } catch (error: any) {
      console.log("getMySnippets error", error);
      setError(error.message)
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  const joinCommunity = (communityData: Community) => {

    // batch file
      // creating a new community snippet
      //updating the numbeOfMembers

    // update recoil state - communityState.mySnippets

    try {
      
    } catch (error: any) {
      console.log('joinCommunity Error', error)
      setError(error.message)
    }
  };
  const leaveCommunity = (communityId: string) => {

    // batch file
      // deleting the community snippet from user
      //updating the numbeOfMembers (-1)

    // update recoil state - communityState.mySnippets
  };
  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;
