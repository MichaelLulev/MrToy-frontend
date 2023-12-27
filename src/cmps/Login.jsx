import { useState } from "react"
import { useSelector } from "react-redux"

import { userService } from "../services/user.service.js"
import { signup, login, logout } from "../store/actions/user.actions.js"
import { setErrorMessageText, setInfoMessageText } from "../store/actions/app.actions.js"
import { Cart } from "./Cart.jsx"


export function Login() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const [isShowCart, setIsShowCart] = useState(false)
    const [isSignup, setIsSignup] = useState(false)
    const [formUser, setFormUser] = useState(userService.getNewUser())

    function onChangeFormUser(ev) {
        const name = ev.target.name
        const value = ev.target.value
        setFormUser(prev => ({ ...prev, [name]: value }))
    }

    function onSubmitForm(ev) {
        ev.preventDefault()
        if (isSignup) {
            signup(formUser)
                .then(user => setInfoMessageText(`Signed up as '${user.username}'`))
                .catch(err => setErrorMessageText(err.response.data))
        }
        else {
            login(formUser)
                .then(user => setInfoMessageText(`Logged in as '${user.username}'`))
                .catch(err => setErrorMessageText(err.response.data))
        }
    }

    function onLogout() {
        logout()
            .then(user => setInfoMessageText(`Logged out as '${user.username}'`))
            .catch(err => setErrorMessageText(err.response.data))
    }
    
    return (
        <>
        {
            loggedInUser &&
            <section className="logged-in-user">
                <button className="logout" onClick={onLogout}>
                    Logout
                </button>
                <h3>Logged in as <em>{loggedInUser.username}</em> aka <em>{loggedInUser.fullName}</em></h3>
                <button className="cart-button" onClick={() => setIsShowCart(prev => ! prev)}>
                    {isShowCart ? 'Hide cart' : 'Show cart'}
                </button>
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
                <button className="login-button" onClick={() => setIsSignup(prev => ! prev)}>
                    Login
                </button>
            }
            {
                ! isSignup &&
                <button className="signup-button" onClick={() => setIsSignup(prev => ! prev)}>
                    Sign up
                </button>
            }
                <h3>{isSignup ? 'Sign up' : 'login'}</h3>
                <form className="login-form" onSubmit={onSubmitForm}>
                {
                    isSignup &&
                    <label>
                        <span>Full name: </span>
                        <input
                            type="text"
                            name="fullName"
                            value={formUser.fullName}
                            onChange={onChangeFormUser}
                        />
                    </label>
                }
                    <label>
                        <span>Username: </span>
                        <input
                            type="text"
                            name="username"
                            value={formUser.username}
                            onChange={onChangeFormUser}
                        />
                    </label>
                    <label>
                        <span>Password: </span>
                        <input
                            type="password"
                            name="password"
                            value={formUser.password}
                            onChange={onChangeFormUser}
                        />
                    </label>
                    <button className="submit-button">Submit</button>
                </form>
            </section>
        }
        </>
    )
}