import React from "react"
import { useNavigate } from "react-router-dom"
import LogOut from "../assets/logout.png"
import styled from "styled-components"
import axios from "axios"
// import { logoutRoute } from "../utils/APIRoutes"

export default function Logout() {
  const navigate = useNavigate()
  const handleClick = async () => {
    const id = await JSON.parse(localStorage.getItem("spiel-user"))._id
    // const data = await axios.get(`${logoutRoute}/${id}`)
    // if (data.status === 200) {
      localStorage.clear()
      navigate("/login")
    // }
  }
  return (
    <Button onClick={handleClick}>
      <img src={LogOut} alt="logout" />
    </Button>
  )
}

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #9a86f3;
  border: none;
  cursor: pointer;
  img {
    width: 1rem;
  }
`
