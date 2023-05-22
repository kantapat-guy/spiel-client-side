import React, { useEffect, useState } from "react"
import { styled } from "styled-components"
import LogoChat from "../assets/chat.png"

function Contact({ contact, user, setCurrentChat }) {
  const [currentUser, setCurrentUser] = useState([])
  const [currentSelected, setCurrentSelected] = useState("")

  const handleCurrentChat = (idx, contact) => {
    setCurrentSelected(idx)
    setCurrentChat(contact)
  }

  useEffect(() => {
    if (user) {
      setCurrentUser(user)
    }
  }, [user])

  // useEffect(() => {
  //   console.log(currentSelected, user)
  // }, [currentSelected, user])

  return (
    <>
      {currentUser && (
        <Container>
          <div className="brand">
            <img src={LogoChat} alt="logo" />
            <h3>Spiel</h3>
          </div>
          <div className="contacts">
            {contact.map((data, idx) => (
              <div
                className={`contact ${
                  idx === currentSelected ? "selected" : null
                }`}
                key={idx + data.username}
                onClick={() => handleCurrentChat(idx, data)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${data.avatarImage}`}
                    alt="avatar"
                  />
                </div>
                <div className="username">
                  <h3>{data.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="currentUser">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${user.avatarImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{user.username}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      padding: 0.4rem;
      border-radius: 0.2rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;
      gap: 1rem;
      .username {
        h3 {
          color: white;
        }
      }
      .avatar {
        img {
          height: 3rem;
        }
      }
    }
    .selected {
        background-color: #9186f3;
      }
  }

  .currentUser {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`

export default Contact
