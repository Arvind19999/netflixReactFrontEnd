  import { Box, Container, Button, VStack, Input, HStack } from "@chakra-ui/react"
  import { onAuthStateChanged ,getAuth, GoogleAuthProvider, signInWithPopup,signOut} from "firebase/auth"
  import {getFirestore,addDoc, collection, serverTimestamp,onSnapshot,query,orderBy} from "firebase/firestore"

  import "./App.scss"
  import Message from "./Components/Message";
  import  app  from "./Components/firebase";
  import { useEffect, useRef, useState } from "react";


  const auth = getAuth(app);
  const db = getFirestore(app)
  

  const loginHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  }


  const signOutHandler =()=> signOut(auth)

  function App() {
    const [user,setUser] = useState(false)
    const [message,setMessage] = useState("")
    const [messages,setMessages] = useState([])
    const divForScroll = useRef(null)
    const submitHandler =async (e)=>{
      e.preventDefault()
      try {
          await addDoc(collection(db,"message"),{
            text  : message,
            uid : user.uid,
            uri : user.photoURL,
            createdAt : serverTimestamp()
          })
          setMessage("")
            divForScroll.current.scrollIntoView({behaviour : "smooth"});
      } catch (error) {
        alert(error) 
      }
  }
    useEffect(()=>{
      const q = query(collection(db,"message"),orderBy("createdAt","asc"))
      onAuthStateChanged(auth,(data)=>{
            setUser(data)
      });

      onSnapshot(q,(snap)=>{
        setMessages(snap.docs.map(item=>{
          const id = item.id
          return {id,...item.data()}
        })) 
      })
      
    },[])
    return (
      <Box bg={"red.50"}>
          {
            user?<Container h={"100vh"} w={"100vh"} bg={"white"}>
            <VStack h={"full"} paddingY={"4"}>
              <Button onClick={signOutHandler} w={"full"} colorScheme={"red"}> LogOut </Button>
              <VStack h={"full"} w={"full"} overflowY={"auto"}>
                {
                  messages.map(item=>(
                    <Message key={item.id} text={item.text} uri={item.uri}  user={item.uid === user.uid?"me" : "other"} />
                  ))
                }
                <div ref={divForScroll}></div>
              </VStack>
              <form onSubmit={submitHandler} style={{ width: "100%" }}>
                <HStack>
                  <Input value={message} onChange={(e)=>setMessage(e.target.value)} placeholder="Enter a Message..." />
                  <Button colorScheme={"purple"} type="submit"> Send </Button>
                </HStack>
              </form>
              
            </VStack>
          </Container>: <VStack h={"100vh"} bg={"white"} justifyContent={"center"}>
          <Button onClick={loginHandler} colorScheme={"purple"}> SignIn With Google </Button>
            </VStack>
          }
      </Box>
    );
  }

  export default App;
