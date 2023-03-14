
import { Box, Text } from '@chakra-ui/react';
import PageContent from 'Hypnos/components/Layout/PageContent';
import NewPostForm from 'Hypnos/components/Posts/NewPostForm';
import React from 'react';



const SubmitPostPage:React.FC = () => {
    
    return (
        <PageContent>
            <>
                <Box p="14px 0px" borderBottom="1px solid" borderColor="white">
                    <Text>Create a Post</Text>
                </Box>
                <NewPostForm/>
            </>

            <>
                {/*<About/>*/} 
            </>
        </PageContent>
    );
}
export default SubmitPostPage;