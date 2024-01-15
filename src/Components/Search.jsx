import React from 'react'
import { Stack,Button,Icon } from '@chakra-ui/react'
import { SearchIcon,ChatIcon } from '@chakra-ui/icons'

const Search = ({onNewChat}) => {
  return (
    <Stack direction='row' spacing={3} width='100%' marginTop='0.5rem'>
      <Button leftIcon={<ChatIcon />} colorScheme='teal' variant='solid' width='100%' onClick={onNewChat}>
        New Chat
      </Button>
      <Button rightIcon={<SearchIcon />} colorScheme='blue' variant='solid' width='100%'>
        Read Website
      </Button>
    </Stack>
  )
}

export default Search