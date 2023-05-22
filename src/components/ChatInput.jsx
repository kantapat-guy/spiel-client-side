import React, { useEffect, useRef, useState } from "react"
import EmojiPicker, { Theme } from "emoji-picker-react"
import { styled } from "styled-components"
import Arrow from "../assets/message.png"
import Emoji from "../assets/smile.png"


function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("")
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const wrapperRef = useRef(null)

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker)
  }

  const handleEmojiClick = (emojiData, event) => {
    let message = msg
    message += emojiData.emoji
    setMsg(message)
  }

  const sendChat = (event) => {
    event.preventDefault()
    if (msg.length > 0) {
      handleSendMsg(msg)
      setMsg("")
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowEmojiPicker(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [wrapperRef])

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <img src={Emoji} alt="emoji" onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && (
            <div ref={wrapperRef}>
              <EmojiPicker
                lazyLoadEmojis={true}
                theme={Theme.DARK}
                onEmojiClick={handleEmojiClick}
                autoFocusSearch={false}
              />
            </div>
          )}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Type your message."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
          <img src={Arrow} alt="sending" />
        </button>
      </form>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      img {
        height: 1.5rem;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        bottom: 100%;
        .epr-body::-webkit-scrollbar {
          background-color: #363636f6;
          width: 10px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        /* background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .epr-body::-webkit-scrollbar {
          background-color: #080420;
          width: 10px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .epr-emoji-category-label {
          background-color: #080420;
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .epr-header {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        } */
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        img {
          height: 1rem;
        }
      }
      img {
        height: 1.5rem;
      }
    }
  }
`

export default ChatInput
