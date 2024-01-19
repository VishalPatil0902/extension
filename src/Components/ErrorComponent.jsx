import React from 'react';
import { Box, Heading, Text, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ErrorComponent = ({ url }) => {
  const navigate = useNavigate();

  const handleTryAgain = () => {
    navigate('/'+url);
  };

  return (
    <Box textAlign="center" p={8}>
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
