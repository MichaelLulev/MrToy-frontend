import { useState } from "react"
import { useSelector } from "react-redux"

import { userService } from "../services/user.service.js"
import { signup, login, logout } from "../store/actions/user.actions.js"
import { setErrorMessageText, setInfoMessageText } from "../store/actions/app.actions.js"
import { Cart } from "./Cart.jsx"
import { Button, Input } from "@mui/joy"


export function Login() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const [isShowCart, setIsShowCart] = useState(true)
    const [isSignup, setIsSignup] = useState(false)
    const [formUser, setFormUser] = useState(userService.getNewUser())

    function onChangeFormUser(ev) {
        const name = ev.target.name
        const value = ev.target.value
        setFormUser(prev => ({ ...prev, [name]: value }))
    }

    async function onSubmitForm(ev) {
        ev.preventDefault()
        if (isSignup) {
            try {
                const user = await signup(formUser)
                setInfoMessageText(`Signed up as '${user.username}'`)
            } catch (err) {
                setErrorMessageText(err.response.data)
            }
        } else {
            try {
                const user = await login(formUser)
                setInfoMessageText(`Logged in as '${user.username}'`)
            } catch (err) {
                setErrorMessageText(err.response.data)
            }
        }
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
        <>
        {
            loggedInUser &&
            <section className="logged-in-user">
                <Button size="sm" className="logout" onClick={onLogout}>
                    Logout
                </Button>
                <h3>Logged in as <em>{loggedInUser.username}</em> aka <em>{loggedInUser.fullName}</em></h3>
                <Button size="sm" className="cart-button" onClick={() => setIsShowCart(prev => ! prev)}>
                    {isShowCart ? 'Hide cart' : 'Show cart'}
                </Button>
                {
                    isShowCart &&
                    <Cart />
                }
            </section>
        }
        {
            ! loggedInUser &&
            <section className="login">
            {
                isSignup &&
                <Button size="sm" className="login-button" onClick={() => setIsSignup(prev => ! prev)}>
                    Login
                </Button>
            }
            {
                ! isSignup &&
                <Button size="sm" className="signup-button" onClick={() => setIsSignup(prev => ! prev)}>
                    Sign up
                </Button>
            }
                <h3>{isSignup ? 'Sign up' : 'login'}</h3>
                <form className="login-form" onSubmit={onSubmitForm}>
                {
                    isSignup &&
                    <label>
                        <span>Full name: </span>
                        <Input
                            name="fullName"
                            value={formUser.fullName}
                            onChange={onChangeFormUser}
                            required
                        />
                    </label>
                }
                    <label>
                        <span>Username: </span>
                        <Input
                            name="username"
                            value={formUser.username}
                            onChange={onChangeFormUser}
                            required
                        />
                    </label>
                    <label>
                        <span>Password: </span>
                        <Input
                            name="password"
                            value={formUser.password}
                            onChange={onChangeFormUser}
                            required
                        />
                    </label>
                    <Button type="submit" size="sm" className="submit-button">Submit</Button>
                </form>
            </section>
        }
        </>
    )
}