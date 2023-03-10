import { Button, Flex } from '@chakra-ui/react';
import { signOut, User } from 'firebase/auth';
import AuthModal from 'Hypnos/components/Modal/Auth/AuthModal';
import React from 'react';
import AuthButtons from './AuthButtons';
import { auth } from '../../../firebase/clientApp'
import Icons from './Icons';
import UserMenu from './UserMenu';
type RightContetProps = {
    user?: User | null;
};

const RightContet:React.FC<RightContetProps> = ({ user }) => {
    
    return (
        <>
        <AuthModal/>
        <Flex justify='center' align='center'>
            {user ? <Icons/> : <AuthButtons/>}
            <UserMenu user={user}></UserMenu>
        </Flex>   
        </>
    );
}
export default RightContet;