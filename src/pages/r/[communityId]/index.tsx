import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { firestore } from 'Hypnos/firebase/clientApp';
import { doc, getDoc } from 'firebase/firestore';
import { Community } from 'Hypnos/atoms/communitiesAtom';
import safeJsonStringify from 'safe-json-stringify';
import NotFound from 'Hypnos/components/Community/NotFound';
import Header from 'Hypnos/components/Community/Header';
import PageContent from 'Hypnos/components/Layout/PageContent';
import CreateCommunityModal from 'Hypnos/components/Modal/CreateCommunity/CreateCommunityModal';
import CreatePostLink from 'Hypnos/components/Community/CreatePostLink';

type CommunityPageProps = {
    communityData: Community;
};

const CommunityPage:React.FC<CommunityPageProps> = ({ communityData }) => {

    if(!communityData){
        return (
            <NotFound/>
        )

    }
    
    return (
        <>
            <Header communityData={communityData}/>
            <PageContent>
                <>
                    <CreatePostLink/>
                </>
                <><div>R</div></>
            </PageContent>
        </>
    );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    // get community data and pass it to client component
    try {
        const communityDocRef = doc(firestore, 'communities', context.query.communityId as string);
        const communityDoc = await getDoc(communityDocRef);

        return {
            props:{
                communityData: communityDoc.exists() ? JSON.parse(safeJsonStringify({ id: communityDoc.id, ...communityDoc.data() })
                ) : "",
            },
        };
    } catch (error) {
        // Could add error page here
        console.log('getServerSideProps error',error);
    }
}

export default CommunityPage;