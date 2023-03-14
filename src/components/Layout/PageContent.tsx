import { Flex } from '@chakra-ui/react';
import React from 'react';

type PageContentProps = {
    
};

const PageContent:React.FC<PageContentProps> = ({ children }) => {
    console.log("HERE IS CHILDREn", children);
    
    return (
        <Flex justify="center" padding="16px 0px">
            <Flex width="95%" justify="center" maxWidth="860px">
                {/* L */}
                <Flex direction="column" width={{ base: "100%", md: "65%" }} mr={{base: 0, md:6}} >{children && children[0 as keyof typeof children]} </Flex>
                {/* R */}
                <Flex direction="column" display={{ base: "none", md: "flex"}} flexGrow={1}>{children && children[1 as keyof typeof children]}</Flex>
            </Flex>
        </Flex>
    );
}
export default PageContent;