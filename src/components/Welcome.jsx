import React from "react"
import { styled } from "styled-components"
import Hello from "../assets/hello.json"
import Lottie from "lottie-react"
import Logout from "./Logout"

function Welcome({ user }) {
  // const lottieOption = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: Hello,
  // }

  return (
    <AllContainer>
      <BtnContainer>
        <Logout />
      </BtnContainer>
      <Container>
        <div className="img">
          <Lottie animationData={Hello} loop={true} autoPlay={true} />
        </div>
        <h1>{`Welcome, ${user.username}`}</h1>
        <p>Please select a chat to start messaging</p>
      </Container>
    </AllContainer>
  )
}

const AllContainer = styled.div`
  position: relative;
`

const Container = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  .img {
    height: 30vh;
  }
`

const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 1rem 1rem 0 0;
  position: sticky;
`

export default Welcome
