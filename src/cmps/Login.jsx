import { useState } from "react"
import { useSelector } from "react-redux"

import { userService } from "../services/user.service.js"
import { signup, login, logout } from "../store/actions/user.actions.js"
import { setErrorMessageText, setInfoMessageText, setIsShowCart, setIsShowLogin, setIsSignup } from "../store/actions/app.actions.js"
import { Cart } from "./Cart.jsx"
import { Button, Input } from "@mui/joy"


export function Login() {
console.log('./src/cmps/Login.jsx')
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const isShowLogin = useSelector(state => state.appModule.isShowLogin)
    const isSignup = useSelector(state => state.appModule.isSignup)

    function onClickSignup() {
        if (! isShowLogin) setIsShowLogin(true)
        setIsSignup(! isSignup)
    }

    async function onLogout() {
        try {
            const user = await logout()
            setInfoMessageText(`Logged out as '${user.username}'`)
        } catch (err) {
            setErrorMessageText(err.response.data)
        }
    }
    
    return (
        <section className="login-container">
            {
                loggedInUser &&
                <section className="logged-in-user">
                    <Button size="md" className="logout" onClick={onLogout}>
                        Logout
                    </Button>
                    <h3>Logged in as <em>{loggedInUser.username}</em></h3>
                </section>
            }
            {
                ! loggedInUser &&
                <section className="login">
                {
                    isSignup &&
                    <Button size="md" className="login-button" onClick={onClickSignup}>
                        Login
                    </Button>
                }
                {
                    ! isSignup &&
                    <Button size="md" className="signup-button" onClick={onClickSignup}>
                        Sign up
                    </Button>
                }
                </section>
            }
        </section>
    )
}