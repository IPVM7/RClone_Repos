import React, { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Community, CommunitySnippet, CommunityState } from 'Hypnos/atoms/communitiesAtom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from 'Hypnos/firebase/clientApp';
import { getDocs, collection, writeBatch, doc, increment } from 'firebase/firestore';
import { authModalState } from 'Hypnos/atoms/authModalAtom';



const useCommunityData = () => {
    const [ user ] = useAuthState(auth);
    const [communityStateValue, setCommunityStateValue] = useRecoilState(CommunityState);
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
      // Is the user Signed in?
      // If not => open auth modal
        if (!user){
            //open modal
            setAuthModalState({ open: true, view: "login"});
            return;
        }
        setLoading(true);
        if (isJoined){
            leaveCommunity(communityData.id);
            return;
        }
        joinCommunity(communityData);  
    };

    const getMySnippets = async () => {
        setLoading(true);
        try {
            // get users snippets
            const snippetDocs = await getDocs(collection(firestore,`users/${user?.uid}/communitySnippets`));
            const snippets = snippetDocs.docs.map(doc => ({ ...doc.data()}));
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: snippets as CommunitySnippet[],

            }));

            console.log('snippets', snippets);
        } catch (error: any) {
            console.log('getMySnippets error', error);
            setError(error.message);
        }
        setLoading(false);
    };

    const joinCommunity = async (communityData: Community) => {
        try {
            const batch = writeBatch(firestore);
        // creating a new community snippet     
            const newSnippet: CommunitySnippet = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || "",

            };
        // updating the numberOfMembers
            batch.set(doc(firestore,`users/${user?.uid}/communitySnippets`, communityData.id), newSnippet);
            batch.update(doc(firestore,'communities', communityData.id), {
                numberOfMembers: increment(1),
            });
            await batch.commit();
        // update recoil state - communityState.mySnippets
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet],
            }));
        } catch (error: any) {
            console.log('joinCommunity error', error);
            setError(error.message);
        }
        setLoading(false);

    };
    
    const leaveCommunity = async (communityId: string) => {
        
        
        
        
        try {
            const batch = writeBatch(firestore);
        // deleting the community snippet from user
            batch.delete(doc(firestore,`users/${user?.uid}/communitySnippets`, communityId));
        // updating the numberOfMembers (-1) 
            batch.update(doc(firestore,'communities', communityId), {
                numberOfMembers: increment(-1),
            });
          
            await batch.commit();
        //update recoil state - communityState.mySnippets
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(item => item.communityId !== communityId),
            }));     

        } catch (error: any) {
            console.log('leaveCommunity error', error);
            setError(error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!user) return;
        getMySnippets();
    }, [user]);
    return {
        // data and functions
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading,

    };
};
export default useCommunityData;