import { authModalState } from "@/atoms/authmodalAtom";
import {
  Community,
  communitySnippet,
  communityState,
} from "@/atoms/communitiesAtom";
import { auth, firestore } from "@/firebase/clientApp";
import {
  collection,
  doc,
  getDocs,
  increment,
  writeBatch,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";

const useCommunityData = () => {
  const [user] = useAuthState(auth);
  const [communityStateValue, setCummunityStateValue] =
    useRecoilState(communityState);
  const setAuthModalState = useSetRecoilState(authModalState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onJoinOrLeaveCommunity = (
    communityData: Community,
    isJoined: boolean
  ) => {
    // is the user signed in?
    //if not open auth modal

    if (!user) {
      // Open modal
      setAuthModalState({ open: true, view: "login" });
      return;
    }

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
      setError(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user) return;
    getMySnippets();
  }, [user]);

  const joinCommunity = async (communityData: Community) => {
    // batch write
    try {
      const batch = writeBatch(firestore);

      // creating a new community snippet
      const newSnippet: communitySnippet = {
        communityId: communityData.id,
        imageURL: communityData.imageURL || "",
      };

      batch.set(
        doc(
          firestore,
          `users/${user?.uid}/communitySnippets`,
          communityData.id
        ),
        newSnippet
      );
      //updating the numbeOfMembers
      batch.update(doc(firestore, "communities", communityData.id), {
        numberOfMembers: increment(1),
      });
      await batch.commit();

      // update recoil state - communityState.mySnippets
      setCummunityStateValue((prev) => ({
        ...prev,
        mySnippets: [...prev.mySnippets, newSnippet],
      }));
    } catch (error: any) {
      console.log("joinCommunity Error", error);
      setError(error.message);
    }
    setLoading(false);
  };

  const leaveCommunity = async (communityId: string) => {
    // batch file
    try {
      const batch = writeBatch(firestore);

      // deleting the community snippet from user
      batch.delete(
        doc(firestore, `users/${user?.uid}/communitySnippets`, communityId)
      );

      //updating the numbeOfMembers (-1)
      batch.update(doc(firestore, "communities", communityId), {
        numberOfMembers: increment(-1),
      });

      await batch.commit();

      // update recoil state - communityState.mySnippets
      setCummunityStateValue((prev) => ({
        ...prev,
        mySnippets: prev.mySnippets.filter(
          (snippets) => snippets.communityId !== communityId
        ),
      }));
    } catch (error: any) {
      console.log("leaveCommunity error", error.message);
      setError(error.message);
    }
    setLoading(false);
  };
  return {
    communityStateValue,
    onJoinOrLeaveCommunity,
    loading,
  };
};
export default useCommunityData;
