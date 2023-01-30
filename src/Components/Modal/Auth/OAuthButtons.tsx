import { Flex, Button, Image } from '@chakra-ui/react';
import React from 'react';

const OAuthButtons:React.FC = () => {
  
  return (
    <Flex direction='column' width='100%' mb={4}>
      <Button variant='oauth' mb={2}>
        <Image height='20px' mr={4} src='/images/googlelogo.png'/>
        Continue with Google
      </Button>
      <Button variant='oauth'>
        <Image height='24px' mr={3} src='/images/facebooklogo.png' />
        Continue with Facebook
      </Button>
    </Flex>
  )
}
export default OAuthButtons;