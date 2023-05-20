import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import LogoChat from "../assets/chat.png"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"
import { registerRoute } from "../utils/APIroute"

function Register() {
  const [value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const option = {
    position: "bottom-right",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    const { username, password, confirmPassword, email } = value
    e.preventDefault()
    if (handleValidate(username, password, confirmPassword, email)) {
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      })

      if (data.status === false) {
        toast.error(data.msg, {
          position: "bottom-right",
          autoClose: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        })
      } else {
        toast.success("Create a user success.", option)
        localStorage.setItem("spiel-user", JSON.stringify(data.createUser))
        setTimeout(() => {
          navigate("/")
        }, 3000)
      }
    }
  }

  const handleValidate = (username, password, confirmPassword, email) => {
    if (password !== confirmPassword) {
      toast.error("Password and confirm password must be same.", option)
      return false
    } else if (username.length < 6) {
      toast.warning(
        "length of username must be more than 6 characters.",
        option
      )
      return false
    } else if (password.length < 6) {
      toast.warning(
        "length of password must be more than 6 characters.",
        option
      )
      return false
    } else if (email === "") {
      toast.warning("E-mail is required.", option)
      return false
    }

    return true
  }

  const handleInput = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if(localStorage.getItem('spiel-user')) {
        navigate('/')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={LogoChat} alt="logo" />
            <h1>Spiel</h1>
          </div>
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={(e) => handleInput(e)}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={(e) => handleInput(e)}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => handleInput(e)}
          />
          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => handleInput(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 10px;
    padding: 3rem 2rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #383838;
      border-radius: 10px;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
  }

  button {
    display: inline-block;
    background-color: #997af0;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
      /* text-decoration: underline; */
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
      &:hover {
        color: #997af0;
      }
    }
  }

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
`

export default Register
