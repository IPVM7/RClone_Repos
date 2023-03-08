import { Flex } from '@chakra-ui/react';
import React from 'react';
import AuthButtons from './AuthButtons';

type RightContetProps = {
    //user: any;
};

const RightContet:React.FC<RightContetProps> = () => {
    
    return (
        <>
        {/*<AuthModal/>*/}
        <Flex justify='center' align='center'>
            <AuthButtons/>
        </Flex>   
        </>
    );
}
export default RightContet;