import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface Community {
  id: string;
  creatorId: string;
  numberOfMembers: number;
  privacyType: "public" | "restricted" | "private";
  createdAt?: Timestamp;
  imageURL?: string;
}

export interface communitySnippet {
  communityId: string;
  isModerator?: boolean;
  imageURL?: string;
}

interface communityState {
  mySnippets: communitySnippet[];
  // visitedCommunities
}

const defaultCommunityState: communityState = {
  mySnippets: [],
};

export const communityState = atom<communityState>({
  key: "communityState",
  default: defaultCommunityState,
});
