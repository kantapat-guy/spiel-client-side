import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { styled } from "styled-components"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Lottie from "react-lottie"
import * as dotLoading from "../assets/dot-loading.json"

import axios from "axios"
import { setAvatarRoute } from "../utils/APIroute"
import { Buffer } from "buffer"

function SetAvatar() {
  // State
  const [avatar, setAvatar] = useState([])
  const [selectedAvatar, setSelectedAvatar] = useState("")
  const [loading, setLoading] = useState(true)

  const api = "https://api.multiavatar.com"
  const navigate = useNavigate()
  const option = {
    position: "bottom-right",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }

  const lottieOption = {
    loop: true,
    autoplay: true,
    animationData: dotLoading,
  }

  const setProfileAvatar = async () => {
    if (!selectedAvatar) {
      toast.error("Please select your avatar", {
        ...option,
        hideProgressBar: true,
        autoClose: 3000,
      })
    } else {
      const user = await JSON.parse(localStorage.getItem("spiel-user"))
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatar[selectedAvatar],
      })

      if (data.isSet) {
        user.isAvatarImageSet = true
        user.avatarImage = data.image
        localStorage.setItem("spiel-user", JSON.stringify(user))
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          navigate("/")
        }, 1500)
      } else {
        toast.error("Error while save your avatar, Please try again.", option)
      }
    }
  }

  useEffect(() => {
    const getAvatar = async () => {

      // wait for fixing to empty []
      const data = [
        "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMzEgMjMxIj48cGF0aCBkPSJNMzMuODMsMzMuODNhMTE1LjUsMTE1LjUsMCwxLDEsMCwxNjMuMzQsMTE1LjQ5LDExNS40OSwwLDAsMSwwLTE2My4zNFoiIHN0eWxlPSJmaWxsOiMxODEyODQ7Ii8+PHBhdGggZD0ibTExNS41IDUxLjc1YTYzLjc1IDYzLjc1IDAgMCAwLTEwLjUgMTI2LjYzdjE0LjA5YTExNS41IDExNS41IDAgMCAwLTUzLjcyOSAxOS4wMjcgMTE1LjUgMTE1LjUgMCAwIDAgMTI4LjQ2IDAgMTE1LjUgMTE1LjUgMCAwIDAtNTMuNzI5LTE5LjAyOXYtMTQuMDg0YTYzLjc1IDYzLjc1IDAgMCAwIDUzLjI1LTYyLjg4MSA2My43NSA2My43NSAwIDAgMC02My42NS02My43NSA2My43NSA2My43NSAwIDAgMC0wLjA5OTYxIDB6IiBzdHlsZT0iZmlsbDojZmVlM2M1OyIvPjxwYXRoIGQ9Im0xNDEuNzUgMTk1YTExNC43OSAxMTQuNzkgMCAwIDEgMzggMTYuNSAxMTUuNTMgMTE1LjUzIDAgMCAxLTEyOC40NiAwIDExNC43OSAxMTQuNzkgMCAwIDEgMzgtMTYuNWMwIDEwLjc2IDExLjc1IDE5LjQ4IDI2LjI1IDE5LjQ4czI2LjI1LTguNzIgMjYuMjUtMTkuNDh6IiBzdHlsZT0iZmlsbDojZjA2OyIvPjxwYXRoIGQ9Im05Mi41MDIgMTk0LjI3djAuNzAzOTFjMCA0LjMwMzMgMi40MzczIDguMjU4MyA2LjM4MDcgMTEuMTgzIDQuMjE5OSAzLjEyMDQgMTAuMTA2IDUuMDUwOCAxNi42NjEgNS4wNTA4IDYuNTQ4IDAgMTIuNDM0LTEuOTMwMyAxNi42NTQtNS4wNTA4IDMuOTQzNC0yLjkyNDUgNi4zODgtNi44Nzk1IDYuMzg4LTExLjE4M3YtMC42NzQ4OWMxLjA3NjggMC4yMTc3MSAyLjE0NjMgMC40NDk5NCAzLjIxNTggMC42OTY2NmgtN2UtM2MxLjA2OTUgMC4yNDY3MiAyLjEzMTggMC41MDc5OCAzLjE4NjcgMC43OTEtMC4yNzY0OCA2LjEwMy0zLjY1MjQgMTEuNTUzLTguOTcwOCAxNS40OTMtNS4yODIxIDMuOTExNC0xMi41MjEgNi4zMjgtMjAuNDY2IDYuMzI4LTcuOTQ0OSAwLTE1LjE4NC0yLjQxNjUtMjAuNDc0LTYuMzI4LTUuMzMzLTMuOTQ3Ny04LjcwODktOS40MTk0LTguOTcwOC0xNS41NDQgMS4wNTUtMC4yNzU3NyAyLjEwOTktMC41MzcwMiAzLjE3MjItMC43ODM3NiAxLjA2OTUtMC4yMzk0NyAyLjE0NjMtMC40NjQ0MyAzLjIzMDQtMC42ODIxM3oiIHN0eWxlPSJmaWxsOiM4ZTAwMzk7Ii8+PHBhdGggZD0ibTEwOC4zNyAyMi4wMTljLTYuMjY5OC0xMi44MjktMTcuMTUxLTEzLjM5Ni0xOC45NDkgMS4xNzY5LTExLjQ0OC05LjQ1ODMtMjYuMDIxLTQuNDgzLTIwLjM2MSAxMi40MjItMTIuMjUxLTcuOTI4Mi0yNC45MTkgMS43NzYxLTE3LjA3NiAyMC44NTMtMjcuMDggMi4zNjQ2LTIyLjcxNSAyNC43MjYtMTAuMTExIDMxLjQzNS05LjkwMDIgMy4zNTY2LTEwLjcwMSA5LjQwMDYtOC40NjQgMTQuNDk3IDIuNjU3NCA0Ljc4NDIgOS4wMTI2IDYuNDczNyAxMS41NDUgOS42NTE5LTYuNjI0IDAuNTk0MTktOC40MTEyIDUuNjAxMS01Ljc0MDQgOS41MTkyIDEuNjg5NiAyLjQ3ODcgNS4yNzU2IDQuMjIxOCA4LjU5NzEgNS41NDU1IDEuMDQ4NSAwLjQwNjU4IDMuNzAyIDEuMjczMiAzLjkwNTMgMi40MTgxIDAuMTg3NDQgMS4yMTU2LTYuNzg4NCAzLjAwNTUtNS43MjgxIDUuMjYxMiAwLjYwNjQ4IDEuNDIyNyAxLjc3NjQgMi43MTUxIDIuNjQ2NiAzLjcxNTYgMS4yODA3IDEuNjU5NSAxMC43NTUgOC4wMzUxIDkuNDU4MyA0LjIwNDktMS4wMjcxLTMuNzIzNC0yLjIxNDgtNy40NjgyLTMuMTQ1Ni0xMS4xOTItMS4xNjYyLTUuMzA2OS0xLjc4NjgtMTAuNzIxLTEuMTAyLTE2LjE1NiAxLjQyMjMtNS40NTUgNS4wNjktNC40MjY1IDcuNzgzNy04LjM1ODggMy41MjY0LTUuNzUwNSAyLjAyOTYtMTEuNjE0IDIuMTI0LTEzLjU3NSAwLjEwNy0xLjc4NjggMS41NDA3LTEuMTg3NiAzLjE4ODQtMS40MzM3IDQuMzg2OC0wLjY0MTk2IDcuMDA4MS0yLjExODUgOC44Mzc3LTYuMjY5OCAwLjc3MDM1LTEuOTI1OSAwLjYyMDU3LTkuNzU3OCAwLjUyNDI2LTExLjc4IDAuMzYzNzgtNC42MzI4IDQuMTgzNSAwIDYuNTQ4IDAuNjQxOTYgMy4yNjMzIDAuODg4MDUgNi44Nzk3IDAuMjEzOTkgOS4wNzMxLTIuNTAzNyAxLjc1NDctMi4zNzUzIDIuMDg2NC0yLjg4ODggNC42MTE0LTAuODAyNDUgMi42ODU2IDIuMjE0OCA0LjA5NzkgMy4xMzQ5IDcuNjkyOSAzLjI3NCA1LjU2MzcgMC4yMDMyOSA4Ljc3MzUtNi4yNjk4IDExLjMyLTUuNjM4NiAzLjUyMDEgMC44NzczNSAzLjYwNTcgNS40NTY3IDEwLjI2MSA0Ljg2ODIgMi4zODYtMC4yMDMyOSAzLjgzMDQtMC44NjY2NSA1LjQwMzItMi42NDI4IDAuODg4MDUtMC45OTUwNSAxLjk1OC0yLjUwMzcgMy40MzQ1LTIuNjIxNCAxLjQ2NTgtMC4xMTc3IDIuMzIxOCAyLjM2NDYgMy4wMDY1IDMuNDQ1MiAxLjE5MjYgMi42NzU1IDQuMDI5NSAzLjY1MTMgNi4yMzc3IDMuMzE2OCAxLjk1OC0wLjE3MTE5IDMuODU0LTEuNDExNSA1LjQyNjgtMi40NzA3IDAuOTk2NzktMC42NjEwMiAxLjgyODQtMC44MTEyOCAxLjkyNTYgMC4yMDcxIDAuMjk1OTIgMi4yMjcxIDAuMDg2MiA3LjcwMjUgMC4xNTk2IDguNDgyMSAwLjEwNTU2IDguNDYwOSA1LjM3IDEwLjU2OSAxMy4yMjMgMTAuMzMzLTAuMzE4NzEgMy43NDY0IDAuMDU4MyAxMS4yOCA1LjQzNTMgMTQuNTYyIDMuOTQ4MSAyLjc2MDQgNi42NjU3IDEuMjczMiA2LjcyOTkgNy44NTM0IDdlLTMgNi4xOTE0LTAuNDM2OTMgMTMuMDYxLTEuMjk0NiAxOC4xODktMC42OTU0NyA0LjA0NDQtMS4yNDEyIDYuNDgzOC0yLjUyNTEgMTAuMzc4LTAuNjQxOTYgMS45MTUyLTAuODEzMTUgMS45Njg3IDEuNDEyMyAxLjA2OTkgNy4xNDcyLTMuMTQ1NiAxMC41MzktMTEuNDggOC4zNTYyLTE4Ljg0Mi0wLjQzODY5LTIuMDQzNiAwLjg0NTI1LTEuNzIyNiAyLjg3ODEtMi42MTA2IDkuNTI0OC00LjIzNjMgOC4xMjY0LTExLjMzNS0wLjc1OTY3LTE0LjI3MyAxMS45ODgtMy4wOTI2IDEzLjg4Ni04LjkwMDIgNi42ODcxLTE1LjM3NSA3LjMwNzctNS45MTY4IDMuNjM3OC0xNi4xNzctMi44MDMyLTE2Ljk5MSAxMi40MjItNy4wOTM3IDUuNzM0OS0yMi4wNjItNS4xMDM2LTE4LjQ5OSA0LjE3MjgtMTIuMDM3LTUuNTYzNy0yNi4yMDMtMjEuMTIxLTE2Ljg5NCA2Ljk2NTMtMTEuMzczIDIuMDY1LTIyLjY2MS0xMi4xMDEtMTAuNzg1LTMuNDU1OS0xOC4zODItMTUuMTQtMTYuNTg0LTIzLjkwMi01LjAxOCAwLjA5NDM1LTIwLjA3NS0xNi4wMDEtMTcuNDItMTguMTQ2LTIuNTg5MnoiIHN0eWxlPSJmaWxsOiNmN2Y3Zjc7Ii8+PHBhdGggZD0ibTUuNDM1MyA4MC41MDJjNy40NDY4IDkuMTM3MyAxNS42MzIgOC44OTEyIDE1LjYzMiA4Ljg5MTJzLTYuMDc3MiAzLjc5ODMtNi44MzY5IDkuODc1NWMtMC43NTk2NiA2LjA4OCA0LjU1NzkgOS42Mjk1IDguMDk5NCAxMC42NDYgMy41NTIyIDEuMDA1OCA3LjA5MzctMi43OTI1IDcuMDkzNy0yLjc5MjVzLTUuODMxMiAxMC42NDYtMS41MTkzIDE1Ljk2NGM0LjMwMTIgNS4zMTc2IDExLjkwOCAzLjAzODYgMTEuOTA4IDMuMDM4NnMtNS4zMjgzIDEwLjEzMiAxLjAwNTcgMTQuMTg3YzUuODMxMiAzLjcyMzQgMTguNTQyIDcuNjcxNSAyMC41MTEgOC4yNzA2LTYuMDY2Ni05Ljc0NzItOS41NzYtMjEuMjQ5LTkuNTc2LTMzLjU3NXYtMC4wNDI4YzAtMzUuMjAxIDI4LjU0Ni02My43NDcgNjMuNzQ3LTYzLjc0NyAzNS4yMTIgMCA2My43NTggMjguNTQ2IDYzLjc1OCA2My43NDcgMCAxMi40NzYtMy41ODQzIDI0LjExNi05Ljc4OTkgMzMuOTQ5aDAuNTM0OTZzMTMuOTMxLTEuMDA1NyAxNi4yMS05LjM3MjdjMi4yNzktOC4zNTYyIDAuNzU5NjctOS44NzU2IDAuNzU5NjctOS44NzU2czEwLjYzNSAyLjAzMjkgMTMuNDE3LTcuNTk2NmwyLjc5MjYtOS42Mjk1czEwLjEzMiAwIDEwLjg5Mi03LjA4M2MwLjc1OTYzLTcuMDkzNy03LjAyOTUtMTIuNDExLTcuMDI5NS0xMi40MTFzMTEuNDU5IDAuODIzODUgMTQuNDk4LTEwLjQ1M2MxLjAxNjQtMy43NTU1IDAuODM0NTYtOC4yMTcxIDAuMTM5MS0xMi40OTctMTcuNjY1LTQxLjE2MS01OC41NjktNjkuOTk1LTEwNi4xOC02OS45OTUtMzAuNjMyIDAtNjAuMDM0IDEyLjE4Ny04MS42NzkgMzMuODMxdjAuMDEwN2MtMTMuMTcxIDEzLjE3MS0yMi44MzMgMjkuMjItMjguMzg2IDQ2LjY2eiIgc3R5bGU9ImZpbGw6bm9uZTsiLz48cGF0aCBkPSJtMTYxLjczIDg2LjAxNmgtOTIuNTFjLTMuMzcgMC02LjAwMDEgMi4zOTk4LTYuMDAwMSA1LjI5OTl2MjguNDVjMCAzLjAwMDIgMi43NCA1LjMwMDEgNi4wMDAxIDUuMzAwMWgzMi4zNmM3LjA5MDEgMCA3LjQ0LTE5LjQzIDEzLjgyLTE5LjQzczYuODgwMSAxOS40NCAxMy44MyAxOS40NGgzMi4zNmMzLjM3IDAgNS45OTk5LTIuNCA1Ljk5OTktNS4zMDAxdi0yOC40NmMwLjE0MDQzLTIuOTAwMS0yLjYtNS4yOTk5LTUuOS01LjI5OTl6IiBzdHlsZT0iZmlsbDojN2ZiNWEyOyIvPjxwYXRoIGQ9Im0xNjEuNzMgODYuMDE2aC05Mi41MWMtMy4zNyAwLTYuMDAwMSAyLjM5OTgtNi4wMDAxIDUuMjk5OXYyOC40NWwxMDQuNTUtMjguNDVjMC0yLjkwMDEtMi43NC01LjI5OTktNS45OTk5LTUuMjk5OXoiIHN0eWxlPSJmaWxsOiNkMWVkZGY7Ii8+PHBhdGggZD0ibTE2MS43MyA4Ni4wMTZoLTkyLjUxYy0zLjM3IDAtNi4wMDAxIDIuMzk5OC02LjAwMDEgNS4yOTk5djI4LjQ1YzAgMy4wMDAyIDIuNzQgNS4zMDAxIDYuMDAwMSA1LjMwMDFoMzIuMzZjNy4wOTAxIDAgNy40NC0xOS40MyAxMy44Mi0xOS40M3M2Ljg4MDEgMTkuNDQgMTMuODMgMTkuNDRoMzIuMzZjMy4zNyAwIDUuOTk5OS0yLjQgNS45OTk5LTUuMzAwMXYtMjguNDZjMC4xNDA0My0yLjkwMDEtMi42LTUuMjk5OS01LjktNS4yOTk5eiIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjQuMDAyNnB4O3N0cm9rZTojMzAxZTE5OyIvPjxwYXRoIGQ9Im05Ny4wNiAxNDQuNTlhMjAuMTUgMjAuMTUgMCAwIDAgMzYuODggNC41M3oiIHN0eWxlPSJmaWxsOiNmZmY7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDoyLjk5OTlweDtzdHJva2U6IzAwMDsiLz48L3N2Zz4=",
        "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMzEgMjMxIj48cGF0aCBkPSJNMzMuODMsMzMuODNhMTE1LjUsMTE1LjUsMCwxLDEsMCwxNjMuMzQsMTE1LjQ5LDExNS40OSwwLDAsMSwwLTE2My4zNFoiIHN0eWxlPSJmaWxsOiM2NDM4Njk7Ii8+PHBhdGggZD0ibTExNS41IDUxLjc1YTYzLjc1IDYzLjc1IDAgMCAwLTEwLjUgMTI2LjYzdjE0LjA5YTExNS41IDExNS41IDAgMCAwLTUzLjcyOSAxOS4wMjcgMTE1LjUgMTE1LjUgMCAwIDAgMTI4LjQ2IDAgMTE1LjUgMTE1LjUgMCAwIDAtNTMuNzI5LTE5LjAyOXYtMTQuMDg0YTYzLjc1IDYzLjc1IDAgMCAwIDUzLjI1LTYyLjg4MSA2My43NSA2My43NSAwIDAgMC02My42NS02My43NSA2My43NSA2My43NSAwIDAgMC0wLjA5OTYxIDB6IiBzdHlsZT0iZmlsbDojQzc4NzNBOyIvPjxwYXRoIGQ9Im0xNDEuNzUgMTk1YTExNC43OSAxMTQuNzkgMCAwIDEgMzggMTYuNSAxMTUuNTMgMTE1LjUzIDAgMCAxLTEyOC40NiAwIDExNC43OSAxMTQuNzkgMCAwIDEgMzgtMTYuNWMwIDEwLjc2IDExLjc1IDE5LjQ4IDI2LjI1IDE5LjQ4czI2LjI1LTguNzIgMjYuMjUtMTkuNDh6IiBzdHlsZT0iZmlsbDojZDEyODIzOyIvPjxwYXRoIGQ9Im0xNTcuNzkgNjcuNWE2MS4zMSA2MS4zMSAwIDAgMS00Mi43OSAxNy40M2gtNTUuN2MxOC4xNi0zNy43NCA2OC4yNy00Ni44NSA5OC40OS0xNy40M3oiIHN0eWxlPSJmaWxsOiNlYzAwMDA7Ii8+PHBhdGggZD0ibTEyMi45MyA3LjAwNzhjLTEwLjUwMy0wLjE1NzI5LTIxLjA5IDEuNjQ0OC0yOS41NDUgNS40MzE2LTE3LjE0MSA3Ljg5OTktMzIuMTY5IDIzLjI5Ny00My45NzMgMzguNzc5LTUuMTcwMyA2Ljg2MzEtOC43Nzc5IDEzLjQ2LTguMTg1NSAxOC4zOTUgMC45MzExNCAxMi4zMTIgMTAuMzcyIDI2LjQ4MyAxMS4wNjggMzYuOSAxNS42NjMtNzIuMDgxIDEwNS45OS03MC40NTIgMTI0LjkxLTcuMDUyNWw0ZS0zIDAuMDE1NmM1LjYxNi0xMC45MjYgOC4wNjgyLTIwLjE4OCA4LjM1Mi0yNy42NTMgMC40MzY1NC0xNS42MDctNy44MDg4LTIxLjE0OS0yMS43MzUtMjguMjQ5IDEuNzkzNC0zLjc3MDQgMS43MjczLTcuNTAyMyAyLjA2MjUtMTAuMTU0LTAuNzk5NjQtNy44NTY4LTMuNjc5Ni0xMy41MS0xMC40My0xNy43NTgtNS45NDM0LTMuNzQwNC0xMy4wNi02LjA4NjctMTguNDYzLTcuMjI2Ni00LjUzMTktMC44Nzg5NS05LjI5MDEtMS4zNTYyLTE0LjA2NC0xLjQyNzd6IiBzdHlsZT0iZmlsbDojZWMwMDAwOyIvPjxwYXRoIGQ9Im00Mi40MjYgNzUuMzM4YzAuNTIxNTggMTguNjg5IDEwLjU1NyA3NC4zMzgtMTguMTE1IDEwMS4yNSAxMi4zOCAxMC42MDMgMjguMzUyIDE5LjA2MSA0Ni4wMjUgMjQuNTk0IDExLjAzMi00LjY4NzQgMjIuODgtNy40MTQ3IDM0LjgxNy04LjUwNDZsMC4wNjMzLTE0LjQ3N2MtMjIuNDktNC4zODEzLTQwLjc2Ni0xOC44OTgtNDguODYyLTM5Ljk2Ny04LjA5Ni0yMS4wNy00Ljc5MzEtNDQuNzIgOS4yNDc4LTYyLjM5M3ptMTI0LjY3IDIuNzIwN2M3Ljg5OTcgMTAuODg2IDExLjc0MyAyNC42NCAxMS43ODcgMzcuNDQxLTAuMzY2MzIgMzAuMTc4LTIyLjM4OSA1Ny41NzYtNTMuMTIgNjIuNzA4bDAuMDIzOCAxNC40NzFjMTIuMjgyIDEuMTIxNiAyNC41MTggMy45ODg4IDM1LjgyNSA4LjkxMjggMTUuNDg4LTUuMTQ0OCAzMC4wMDctMTMuMzI1IDQyLjM5Ni0yNS4wNDMtMTMuMTM2LTIyLjA1MS0yMy4yODItNjMuMDQ1LTE4LjY5NC0xMDEuNTV6IiBzdHlsZT0iZmlsbDpub25lOyIvPjxwYXRoIGQ9Im0xNDMuNjEgNDYuMzgzYy0xMS42MzkgMC4xMjQ4Mi0yMC45OTggMS44OTA2LTIwLjk5OCAxLjg5MDZsLTkgMy41MDU5YzAuNjMwMDMtMC4wMTkxIDEuMjYwMy0wLjAyODkgMS44OTA2LTAuMDI5M2gwLjA5OTZjMzUuMTY5IDAuMDU1IDYwLjk1OSAyNy4yMzUgNjMuMjgzIDYzLjM4MyA3LjRlLTQgMzEuMTU3LTIyLjc0MiA1Ny4yMTMtNTMuMTA2IDYzLjA3OWwtMC4wMjE2IDE0LjQ5OGMxMS41NjcgMS4wNTYzIDIzLjE1NCAzLjYwNjcgMzMuODg3IDguMDQ2MyAzNS45NTItMTUuMzE1IDU1LjA4Mi01Mi4zMDMgMzYuNzA5LTY4LjI3OS01LjAxOC03LjkwMzUtMTAuNDQtMTUuNDA5LTkuNTU0NC0yMy4wMyA1LjA1NDUtNTAuNDUyIDAuMzk2MjYtNjMuNTYxLTQzLjE4OS02My4wNjR6bS02OS45NjYgMjEuMDljLTE1LjI4NiAzLjI0NC0xNy4wOTYgMy43My0zMS43MzQgNi42OTUzIDMuMDMwNCAxMy4wODEgMy4wNTgzIDIyLjI3NCAxLjIwODUgMzAuMDEyLTMuODAwNCAxMS4zNjEtOC45NzEyIDE5Ljc4Ny0xMi4yODYgMjguNzY0LTYuODgyMyAyMi40NTktMi45MTU3IDMxLjk4MiAxMi4wOTMgNDYuMTY1IDguNjU5NSA4LjA2OTMgMTkuODYxIDE2LjIwOSAzMC45MzkgMjAuNjQ3IDIuNjY5LTEuMDMxNiA1LjM3MjktMS45NjI4IDguMTA2LTIuNzkyIDcuNDk3OS0yLjI3NSAxNS4zODgtMy42NTM1IDIzLjIwNi00LjM2NzNsMC4wNDMzLTE0LjM5M2MtMjMuOTMzLTQuNTkzNy00NC4yODMtMjEuOTgtNTAuNzctNDUuODE3LTYuMzMxOS0yMy4yNjUgMC41MTEwNC00OC43NTIgMTkuMTk1LTY0LjkxNHoiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+PHBhdGggZD0ibTgzLjczOSA4My45Mmg2My41MzNhMTkuMTAxIDE5LjEgMCAwIDEgMTkuMDUxIDE5IDE5LjExMSAxOS4xMSAwIDAgMS0xOS4wNTEgMTloLTYzLjUzM2ExOS4wOTEgMTkuMDkgMCAwIDEtMTkuMDAxLTE5IDE5LjA5MSAxOS4wOSAwIDAgMSAxOS4wMDEtMTl6IiBzdHlsZT0iZmlsbDojRkYyRDAwOyIvPjxwYXRoIGQ9Im0xNDAuMjMgOTMuNTRhOS4zODA0IDkuMzggMCAxIDAgOS4zODA0IDkuMzggOS4zODA0IDkuMzggMCAwIDAtOS4zODA0LTkuMzh6bS00OS40MDIgMGE5LjM4MDQgOS4zOCAwIDEgMCA5LjM4MDQgOS4zOCA5LjM5MDQgOS4zOSAwIDAgMC05LjM4MDQtOS4zOHoiIHN0eWxlPSJmaWxsOiNmZmY7Ii8+PHJlY3QgeD0iNzkuNzk1IiB5PSI5OC42MjciIHdpZHRoPSI3MS40NzEiIGhlaWdodD0iOC41ODU5IiByeT0iNC4yOTI5IiBzdHlsZT0iZmlsbDpub25lOyIvPjxwYXRoIGQ9Im0xMzYuMjEgMTQ3LjA5YTIxLjc3IDIxLjc3IDAgMCAxLTQwLjEzIDB6IiBzdHlsZT0iZmlsbDojZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6My40OTk5cHg7c3Ryb2tlOiMwMDA7Ii8+PC9zdmc+",
        "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMzEgMjMxIj48cGF0aCBkPSJNMzMuODMsMzMuODNhMTE1LjUsMTE1LjUsMCwxLDEsMCwxNjMuMzQsMTE1LjQ5LDExNS40OSwwLDAsMSwwLTE2My4zNFoiIHN0eWxlPSJmaWxsOiNmZjJmMmI7Ii8+PHBhdGggZD0ibTExNS41IDUxLjc1YTYzLjc1IDYzLjc1IDAgMCAwLTEwLjUgMTI2LjYzdjE0LjA5YTExNS41IDExNS41IDAgMCAwLTUzLjcyOSAxOS4wMjcgMTE1LjUgMTE1LjUgMCAwIDAgMTI4LjQ2IDAgMTE1LjUgMTE1LjUgMCAwIDAtNTMuNzI5LTE5LjAyOXYtMTQuMDg0YTYzLjc1IDYzLjc1IDAgMCAwIDUzLjI1LTYyLjg4MSA2My43NSA2My43NSAwIDAgMC02My42NS02My43NSA2My43NSA2My43NSAwIDAgMC0wLjA5OTYxIDB6IiBzdHlsZT0iZmlsbDojRTJBRjZCOyIvPjxwYXRoIGQ9Im0xNDEuNzUgMTk0Ljk4YTExNC43OSAxMTQuNzggMCAwIDEgMzggMTYuNDk4IDExNS41MyAxMTUuNTIgMCAwIDEtMTI4LjQ2IDAgMTE0Ljc5IDExNC43OCAwIDAgMSAzOC0xNi40OThsMTUuNzEgMTUuNzQ4aDIxeiIgc3R5bGU9ImZpbGw6I2ZmMDAwMDsiLz48cGF0aCBkPSJtNzAgMjAwLjg4djIwLjc3Yy0yLjIyLTAuOTUzMjUtNC4zOTk5LTEuOTY5OC02LjUzOTktMy4wNDk2aC0wLjEwMDg4di0xNC42MjFjMi4xNy0xLjEgNC4zOS0yLjEzOTkgNi42NC0zLjA5OTZ6IiBzdHlsZT0iZmlsbDojZmZmOyIvPjxwYXRoIGQ9Im0xNjEgMjAwLjg4djIwLjc3YzEuOS0wLjgwOTg2IDMuNzcwMi0xLjY3OTggNS42MjAxLTIuNTg5OGwwLjA5ODktMC4wNDk0IDAuODIwMDUtMC40MDk5N2gwLjEwMDg4di0xNC42MjFjLTIuMTctMS4xLTQuMzktMi4xMzk5LTYuNjQwMi0zLjA5OTZ6IiBzdHlsZT0iZmlsbDojZmZmOyIvPjxwb2x5Z29uIHRyYW5zZm9ybT0ibWF0cml4KDEgMCAwIC45OTk4NyA0ZS01IC0zZS01KSIgcG9pbnRzPSI5Ny4zMiAyMDEuOTMgMTE1LjUgMjIzLjcyIDEzMy42OCAyMDEuOTMiIHN0eWxlPSJmaWxsOiMxNDE3MjA7Ii8+PHBhdGggZD0ibTExMS4yIDIzMC44OCAxLjMxLTE2LjkwOGMwLjMyOTkyIDEuMjc5OCA1LjYzOTkgMS4yNzk4IDUuOTk5OSAwbDEuMzIwMSAxNi45MzhjLTEuNDMwMSAwLjA0OTQtMi44NjAxIDAuMDg5LTQuMyAwLjA4OXMtMi44NyAwLTQuMy0wLjA4OXoiIHN0eWxlPSJmaWxsOiMxNDE3MjA7Ii8+PHBhdGggZD0ibTExNS40OSAyMDEuNzl2MC4wNjkybC03LjU1IDEyLjY3OC03LjAwMDEgMTEuODA5LTE5LjE5LTI2LjQ4N2MwLjYwOTk5LTAuNDI5OTUgMS4yMi0wLjg5OTg1IDEuODAwMS0xLjM4OTlhNTIgNTEuOTkzIDAgMCAwIDEwLjA3LTEwLjYxOWwyMS43OSAxMy44Nzh6IiBzdHlsZT0iZmlsbDojZTdlY2YyOyIvPjxwYXRoIGQ9Im0xNDkuMjQgMTk5Ljg2LTE5LjA4IDI2LjUxNy03LjAwMDEtMTEuODA5LTcuNTctMTIuNjc4LTAuMDU5My0wLjEwMDg2IDIxLjk0LTEzLjk5OGE1Mi4yMSA1Mi4yMDMgMCAwIDAgMTAuMDggMTAuNjk5YzAuNTgwMTMgMC40NzAwOSAxLjE1MDIgMC45MjAwMiAxLjczMDEgMS4zMzk5eiIgc3R5bGU9ImZpbGw6I2U3ZWNmMjsiLz48cGF0aCBkPSJtMTU2LjEgMTUuODc5Yy0wLjM4NTU2IDUuMzAxNS0xLjcwNDkgOS40NzYyLTMuNjYwMiAxMi43Ni0wLjQxMjI2IDIzLjc3My05LjIzNDMgMzUuMjI5LTE1LjE1NCA0Mi43OTdsMTUuMDYyLTQuNjY0MWMtMC42NjI1MyAyLjgxMzUtMi40NjI4IDcuMTU2LTAuMzQ3NjYgMTIuMTM3IDEuNjMzNC0yLjMxNDQgNy45Mzk1LTUuODA3IDEzLTMuMzQ3Ny0wLjQzNDQyIDMuNTUzMi0wLjk1MjcxIDcuMDk0LTEuNDUxMiAxMC42MzlsOC45NjQ4IDAuODU5MzdjMC44MzQ1MyAzLjg3OTIgMC41MTcxOSA5LjM0NDktMC41OTk2MSAxMS43MzZsNS41NTA4IDIuMDA5OGMwLjIwNzY0IDIuNzY0NiAwLjEwMDAxIDUuNDkwNi0wLjc0NjA5IDguODc1IDguNDU0NS0xLjcyMjUgMTQuMjEzLTQuMzg5NiAxOS42NDEtMTMuMTg4IDIuODYzOS00Ljc1MjQgNC45MDE4LTEwLjQ4MyA0LjczMDUtMTcuMjQyLTQuMTYxMiA0LjkxNi05LjY0ODQgNy4yNDg1LTE1LjI2IDEwLjEwOSA2LjUwNy0xMS4wNjUgOC44NjQ4LTIyLjc2OCA4LjEzNjctMzAuNTgtNy4zNDU2IDEwLjI1MS0xMS42NDkgMTMuMDYtMTkuOTE4IDE2LjkgMS4yMzg2LTExLjQgNS41MjQ5LTE4LjU4MiAxMi40NjEtMjcuMjctMTEuMzkyLTEuMzAyNS0xNi4zMDEgMS40NzQ5LTI0Ljg5MSA2LjQzOTUgNC41NDY2LTE0LjAzNiAyLjIyMDgtMjYuNjc5LTUuNTE5NS0zOC45NzF6bS0xMTcuNzYgMjguNjgyYzkuMzM3OCAzLjYzNjYgMTkuNTgxIDkuMDIzNCAyMS4xMjkgMTguNTQ5LTcuNjE4MiAwLjA0MTQtMTQuODk3LTMuNTA3Mi0yMC4yNDItNy4xODk0LTAuMTU5NjcgOC4yMzA5IDIuODQ1MSAxMi4yNTIgNi43NzM0IDE5LjA4LTcuMjEyNyAxLjYxMjktMTIuMDg0IDQuODMxNS0xNy40NzEgOS40ODA1IDcuMjk0OC0wLjE1NzE1IDEyLjI5OS0xLjA1MDIgMTYuODkxIDQuMjc5My02LjA1MTIgNS4wMTY0LTExLjk5IDEwLjc5LTExLjk5IDE5LjI0IDkuMjU3LTYuMTY4OCAxMi40OTUtNS45NDg2IDIxLjEzNy0yLjIwMTIgMS4yOTA2LTguMDk5NiAyLjM5NzgtMTQuODcyIDIuNzg2OS0xNi40MzUgMi40NzE5LTAuNzMyNDcgMy41MjQ3LTAuOTQ4MDcgNS45MjIxLTEuMjkzOC0yLjE1NTYtNy40MjgxIDEuMDk5Ni05LjUxNzYgMi40MTQxLTExLjZsNy41NDMgMS41MDU5Yy0zLjkwOTMtNi4xNjk5IDIuNjU2NS0xMi40ODMgNy4xNDQ1LTE1LjUxLTQuNDQ3NC03LjIwODItNS42NjQ5LTExLjU1OC03LjM3Ny0xNi43OTctMTEuMTk4LTguMjk0Ny0yMy44OTUtNi4yNzQyLTM0LjY2LTEuMTA5NHoiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+PHBhdGggZD0ibTEwMS45IDcuNjQwOGMtMTAuMDQ3IDYuMjQxNi0xMi40NDEgMjguNjQ2LTEyLjEzMSAzMy4yODktNi45MjQ5LTUuODI1OC03Ljg5OTItMTMuNzUtNy43Njk1LTE5LjIwMy05LjYyMzUgNi4wMTU4LTEwLjY2NiAxNC40MjEtOSAyMy45NDMgMS4xMDYxIDUuMTQxMSAyLjM5NzIgMTAuNDYxIDcuMzc3IDE2Ljc5NyAyZS0zIC0xZS0zIDRlLTMgLTNlLTMgNmUtMyAtNGUtMyAyLjc3NDIgMi44NzQyIDUuNDY0NCA1LjU5NDEgOC4zNDc3IDguMzU3NCAwLjQxMTg3LTYuOTcxIDAuNDU0NDktMTMuNjIyIDcuMTg1Ni0xNS44MjQgMy45NTMyIDIuODE2OSA3LjQxMjMgNS45Mzg4IDExLjA4NCA5LjEwMzVsMTAuNTU5LTEwLjI1YzUuNjQ0NyAzLjk2MSA1LjQ1MzEgNi41NjUyIDYuNTIxNSAxNC4xMDQgMi4xNTMtMS43NTQ2IDguNzE5LTkuMDAzNyAxNS44NDQtMTAuMTM5IDAuOTg3MDYgNC4xMjYxLTAuOTkzODggMTAuMzA4LTIuNjM4NyAxMy42MjEgMCAwIDE0LjMyLTExLjg0NiAxNS4xOTUtMjcuOTcxIDAuMzM5NjgtNi4yNTk5IDAuMjIzNy0xMS4xNDYtMC4wNDEtMTQuODI2LTMuMjEyNSA1LjU2NTItOC43MTE4IDguNzc5OS0xMy43ODkgMTAuMTUtNC4yNzE1LTkuMjQ4Ni0yLjQ3ODUtMjEuNDM1LTAuNDgwNDctMjkuMzA5LTEyLjIxIDMuMDE5NS0yMC45MzIgMTguMzM3LTIyLjE3MiAyNS4wNy05LjI2NzgtNy4zOTctMTMuNjA1LTE2LjE0Ni0xNC4wOTgtMjYuOTF6IiBzdHlsZT0iZmlsbDojMDBlZmZmOyIvPjxwYXRoIGQ9Im0xNjEuNzMgODYuMDE2aC05Mi41MWMtMy4zNyAwLTYuMDAwMSAyLjM5OTgtNi4wMDAxIDUuMjk5OXYyOC40NWMwIDMuMDAwMiAyLjc0IDUuMzAwMSA2LjAwMDEgNS4zMDAxaDMyLjM2YzcuMDkwMSAwIDcuNDQtMTkuNDMgMTMuODItMTkuNDNzNi44ODAxIDE5LjQ0IDEzLjgzIDE5LjQ0aDMyLjM2YzMuMzcgMCA1Ljk5OTktMi40IDUuOTk5OS01LjMwMDF2LTI4LjQ2YzAuMTQwNDMtMi45MDAxLTIuNi01LjI5OTktNS45LTUuMjk5OXoiIHN0eWxlPSJmaWxsOiM1ODFiMWI7Ii8+PHBhdGggZD0ibTE2MS43MyA4Ni4wMTZoLTkyLjUxYy0zLjM3IDAtNi4wMDAxIDIuMzk5OC02LjAwMDEgNS4yOTk5djI4LjQ1bDEwNC41NS0yOC40NWMwLTIuOTAwMS0yLjc0LTUuMjk5OS01Ljk5OTktNS4yOTk5eiIgc3R5bGU9ImZpbGw6I0ZGOEI4QjsiLz48cGF0aCBkPSJtMTYxLjczIDg2LjAxNmgtOTIuNTFjLTMuMzcgMC02LjAwMDEgMi4zOTk4LTYuMDAwMSA1LjI5OTl2MjguNDVjMCAzLjAwMDIgMi43NCA1LjMwMDEgNi4wMDAxIDUuMzAwMWgzMi4zNmM3LjA5MDEgMCA3LjQ0LTE5LjQzIDEzLjgyLTE5LjQzczYuODgwMSAxOS40NCAxMy44MyAxOS40NGgzMi4zNmMzLjM3IDAgNS45OTk5LTIuNCA1Ljk5OTktNS4zMDAxdi0yOC40NmMwLjE0MDQzLTIuOTAwMS0yLjYtNS4yOTk5LTUuOS01LjI5OTl6IiBzdHlsZT0iZmlsbDpub25lO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6NC4wMDI2cHg7c3Ryb2tlOiMwMDA7Ii8+PHBhdGggZD0ibTEyNi4yOCAxNDkuODJjLTYuMTYgMi40My0xNS41MiAyLjQyLTIxLjU2IDAiIHN0eWxlPSJmaWxsOm5vbmU7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDo1Ljk5OThweDtzdHJva2U6IzAwMDsiLz48L3N2Zz4=",
        "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMzEgMjMxIj48cGF0aCBkPSJNMzMuODMsMzMuODNhMTE1LjUsMTE1LjUsMCwxLDEsMCwxNjMuMzQsMTE1LjQ5LDExNS40OSwwLDAsMSwwLTE2My4zNFoiIHN0eWxlPSJmaWxsOiNFNkMxMTc7Ii8+PHBhdGggZD0ibTExNS41IDUxLjc1YTYzLjc1IDYzLjc1IDAgMCAwLTEwLjUgMTI2LjYzdjE0LjA5YTExNS41IDExNS41IDAgMCAwLTUzLjcyOSAxOS4wMjcgMTE1LjUgMTE1LjUgMCAwIDAgMTI4LjQ2IDAgMTE1LjUgMTE1LjUgMCAwIDAtNTMuNzI5LTE5LjAyOXYtMTQuMDg0YTYzLjc1IDYzLjc1IDAgMCAwIDUzLjI1LTYyLjg4MSA2My43NSA2My43NSAwIDAgMC02My42NS02My43NSA2My43NSA2My43NSAwIDAgMC0wLjA5OTYxIDB6IiBzdHlsZT0iZmlsbDojZThiYzg2OyIvPjxwYXRoIGQ9Im0xNDEuNzUgMTk1YTExNC43OSAxMTQuNzkgMCAwIDEgMzggMTYuNSAxMTUuNTMgMTE1LjUzIDAgMCAxLTEyOC40NiAwIDExNC43OSAxMTQuNzkgMCAwIDEgMzgtMTYuNWMwIDEwLjc2IDExLjc1IDE5LjQ4IDI2LjI1IDE5LjQ4czI2LjI1LTguNzIgMjYuMjUtMTkuNDh6IiBzdHlsZT0iZmlsbDojZmZmOyIvPjxwYXRoIGQ9Im05Mi41MDIgMTk0LjI3djAuNzAzOTFjMCA0LjMwMzMgMi40MzczIDguMjU4MyA2LjM4MDcgMTEuMTgzIDQuMjE5OSAzLjEyMDQgMTAuMTA2IDUuMDUwOCAxNi42NjEgNS4wNTA4IDYuNTQ4IDAgMTIuNDM0LTEuOTMwMyAxNi42NTQtNS4wNTA4IDMuOTQzNC0yLjkyNDUgNi4zODgtNi44Nzk1IDYuMzg4LTExLjE4M3YtMC42NzQ4OWMxLjA3NjggMC4yMTc3MSAyLjE0NjMgMC40NDk5NCAzLjIxNTggMC42OTY2NmgtN2UtM2MxLjA2OTUgMC4yNDY3MiAyLjEzMTggMC41MDc5OCAzLjE4NjcgMC43OTEtMC4yNzY0OCA2LjEwMy0zLjY1MjQgMTEuNTUzLTguOTcwOCAxNS40OTMtNS4yODIxIDMuOTExNC0xMi41MjEgNi4zMjgtMjAuNDY2IDYuMzI4LTcuOTQ0OSAwLTE1LjE4NC0yLjQxNjUtMjAuNDc0LTYuMzI4LTUuMzMzLTMuOTQ3Ny04LjcwODktOS40MTk0LTguOTcwOC0xNS41NDQgMS4wNTUtMC4yNzU3NyAyLjEwOTktMC41MzcwMiAzLjE3MjItMC43ODM3NiAxLjA2OTUtMC4yMzk0NyAyLjE0NjMtMC40NjQ0MyAzLjIzMDQtMC42ODIxM3oiIHN0eWxlPSJmaWxsOiMwMDA7Ii8+PHBhdGggZD0ibTMyLjkwMiA2Ny42NjJjLTAuMzYyOTUgMS43MjI3LTYuMjM0MiAzMC42OTUgNS42MTMzIDUyLjU5NiA0LjU4NDMgOC40NzQzIDkuMDA4MSAxMy4yMzkgMTIuNzUgMTUuODkzYTY3LjcgNjcuNyAwIDAgMS0zLjQ2ODgtMjEuMzUgNjcuNyA2Ny43IDAgMCAxIDIuMzMyLTE3LjY1OGMtNC40OTE0LTIuNDY0Ni0xMC44NjgtNi45MDEyLTEzLjgzNC0xMy41Mi00LjE2MjYtOS4yODUtMy42MTU1LTE0LjY3My0zLjM5MjYtMTUuOTYxem0xNjUuMTkgMGMwLjIyMjkyIDEuMjg4MiAwLjc3MDA1IDYuNjc1OS0zLjM5MjYgMTUuOTYxLTIuOTY2NCA2LjYxODMtOS4zNDI2IDExLjA1NS0xMy44MzQgMTMuNTJhNjcuNyA2Ny43IDAgMCAxIDIuMzMyIDE3LjY1OCA2Ny43IDY3LjcgMCAwIDEtMy40Njg4IDIxLjM1YzMuNzQxOS0yLjY1MzIgOC4xNjU3LTcuNDE4MyAxMi43NS0xNS44OTMgMTEuODQ3LTIxLjkgNS45NzYyLTUwLjg3MyA1LjYxMzMtNTIuNTk2eiIgc3R5bGU9ImZpbGw6I2EyMWQwMDsiLz48cGF0aCBkPSJtMTE1LjczIDEzLjE5MWMtNy4zNzg3LTAuMTMzNTEtMTMuNTA5IDUuNzg4OC0xMy42MzEgMTMuMTY4LTAuMTAxMjggNS44ODI3IDMuNDUwOCAxMC41MTggOC4wNTY2IDEyLjUyIDEuMDYxIDAuNDYxMTUgMi4xODY5IDAuNzgwMDkgMy4zNDE4IDAuOTU3MDN2OC40MjkxYzAuNjY3NzgtMC4wMjAzNSAxLjMzNTgtMC4wMzA3NyAyLjAwMzktMC4wMzEyNSAwLjY2NTQ3LTllLTUgMS4zMzA5IDAuMDA5NyAxLjk5NjEgMC4wMjkzdi04LjQxMTVjMi42MDAyLTAuMzg0MDYgNS4xNTg2LTEuNTQ4NCA3LjMwODYtMy42MjUgNC4yMzIyLTQuMDg3OCA0Ljk5OTEtOS44NzU1IDMuMTU4Mi0xNC41NDktMS44NDA3LTQuNjcyNi02LjM1MDItOC4zODM0LTEyLjIzMi04LjQ4NjN6IiBzdHlsZT0iZmlsbDojZmZmOyIvPjxwYXRoIGQ9Im0xMjkuMzEgMTE0LjE0IDIwLTUuMzdtLTQ3LjY2IDUuMzctMjAtNS4zNyIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjQuOTk5OHB4O3N0cm9rZTojMDAwOyIvPjxwYXRoIGQ9Im0xMjMuMDcgMTU0LjA1YTEwLjYxIDEwLjYxIDAgMCAxLTE1IDAuMTRsLTAuMTQtMC4xNCIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjYuM3B4O3N0cm9rZTojMDAwOyIvPjxwYXRoIGQ9Im0xMjAuMSAxNDIuMjIgMC4xOS0wLjExYzMtMS44NyA1LjQ1LTIuNCA3LjMtMS40NiAyLjE1IDEuMSAzLjEyIDMuODQgNC44NCA1LjVhNS4xOCA1LjE4IDAgMCAwIDYuNjggMC43M20tMjguMjEtNC42Ni0wLjE5LTAuMTFjLTMtMS44Ny01LjQ1LTIuNC03LjMtMS40Ni0yLjE1IDEuMS0zLjEyIDMuODQtNC44NCA1LjVhNS4xOCA1LjE4IDAgMCAxLTYuNjggMC43MyIgc3R5bGU9ImZpbGw6bm9uZTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLXdpZHRoOjUuOTk5OHB4O3N0cm9rZTojZWNlY2VjOyIvPjwvc3ZnPg==",
      ]

      // api call 4 of avatar image

      // for (let i = 0; i < 4; i++) {
      //   const image = await axios.get(
      //     `${api}/${Math.floor(Math.random() * 10000)}?apikey=XT0rZxthwpOgRN`
      //   )

      //   const buffer = new Buffer(image.data)
      //   data.push(buffer.toString("base64"))
      // }

      setAvatar(data)
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }

    getAvatar()
  }, [])

  return (
    <>
      {loading ? (
        <Container>
          <Lottie options={lottieOption} height={400} width={400} />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick your avatar</h1>
          </div>
          <div className="avatars">
            {avatar.map((img, idx) => (
              <div
                key={img + idx}
                className={`avatar ${
                  selectedAvatar === idx ? "selected" : null
                }`}
              >
                <img
                  src={`data:image/svg+xml;base64,${img}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(idx)}
                />
              </div>
            ))}
          </div>
          <button className="summit-btn" onClick={() => setProfileAvatar()}>
            Set as a Proflie
          </button>
        </Container>
      )}

      <ToastContainer />
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  background-color: #131324;
  width: 100vw;
  height: 100vh;
  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: white;
    }
  }

  .summit-btn {
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

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      border-radius: 5rem;
      transition: 0.5s ease-in-out;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.4rem;
      img {
        height: 6rem;
        cursor: pointer;
      }
    }
    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }
`

export default SetAvatar
