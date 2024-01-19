import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

const ErrorComponent = () => {
  const navigate = useNavigate();
  const { url } = useParams();
  console.log(url);
  const handleTryAgain = () => {
    navigate('/' + url);
  };

  return (
    <Box height='80%' textAlign="center" p={8}>
      <Heading as="h2" size="lg" mb={4}>
        Oops! Something went wrong.
      </Heading>
      <Text mb={4}>
        We encountered an error while processing your request. Please try again.
      </Text>
      <Link color="blue.500" onClick={handleTryAgain}>
        Try Again
      </Link>
    </Box>
  );
};

export default ErrorComponent;
