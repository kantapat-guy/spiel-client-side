import React from "react"
import { styled } from "styled-components"
import * as Hello from "../assets/hello.json"
import Lottie from "react-lottie"

function Welcome({ user }) {
  const lottieOption = {
    loop: true,
    autoplay: true,
    animationData: Hello,
  }

  return (
    <Container>
      <div className="img">
        <Lottie options={lottieOption} />
      </div>
      <h1>{`Welcome, ${user.username}`}</h1>
      <p>Please select a chat to start messaging</p>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  .img {
    height: 30vh;
    /* @media screen and (min-width: 720px) {
        width: 50%;
    } */
  }
`

export default Welcome
