/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import { allUsersRoute, host } from "../utils/APIroute"
import Contact from "../components/Contact"
import Welcome from "../components/Welcome"
import ChatRoom from "../components/ChatRoom"
import { io } from "socket.io-client"

const socket = io.connect(host)

function Chat() {
  const [contact, setContact] = useState([])
  const [currentUser, setCurrentUser] = useState("")
  const [currentChat, setCurrentChat] = useState("")

  const navigate = useNavigate()


  useEffect(() => {
    if (currentUser) {
      socket.emit("add-user", currentUser._id)
    }
  }, [currentUser])

  useEffect(() => {
    if (!localStorage.getItem("spiel-user")) {
      navigate("/login")
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("spiel-user")))
    }
  }, [])

  useEffect(() => {
    const getContact = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const response = await axios.get(
            `${allUsersRoute}/${currentUser._id}`
          )

          setContact(response.data)
        } else {
          navigate("/set_avatar")
        }
      }
    }

    getContact()
  }, [currentUser])

  return (
    <Container>
      <div className="container">
        <Contact
          contact={contact}
          user={currentUser}
          setCurrentChat={setCurrentChat}
        />
        {currentChat ? (
          <ChatRoom currentChat={currentChat} socket={socket} />
        ) : (
          <Welcome user={currentUser} />
        )}
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`

export default Chat
