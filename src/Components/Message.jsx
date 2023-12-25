import React from 'react'
import {HStack,Avatar,Text} from "@chakra-ui/react"
const Message = ({text,uri,user}) => {
  return (
    <HStack borderRadius={"base"} bg={"gray.100"} alignSelf={user==="me"?"flex-end":"flex-start"}>
        <Text>
            {
                user==="other" && <Avatar  src={uri} />
            }
            {text}
            {
                user==="me" && <Avatar  src={uri} />
            }
            
        </Text>
    </HStack>
  )
}

export default Message