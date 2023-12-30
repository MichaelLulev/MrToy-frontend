import { useSelector } from 'react-redux'
import { userService } from '../services/user.service'
import { useState } from 'react'
import { Button, Input } from '@mui/joy'
import { setErrorMessageText, setInfoMessageText, setIsShowLogin, setIsSignup } from '../store/actions/app.actions'
import { login, signup } from '../store/actions/user.actions'



export function LoginForm() {
    const isShowLogin = useSelector(state => state.appModule.isShowLogin)
    const isSignup = useSelector(state => state.appModule.isSignup)
    const [formUser, setFormUser] = useState(userService.getNewUser())

    function onChangeFormUser(ev) {
        const name = ev.target.name
        const value = ev.target.value
        setFormUser(prev => ({ ...prev, [name]: value }))
    }

    function onClickClose(ev) {
        setIsShowLogin(false)
        setIsSignup(true)
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
                setIsShowLogin(false)
                setInfoMessageText(`Logged in as '${user.username}'`)
            } catch (err) {
                setErrorMessageText(err.response.data)
            }
        }
        setFormUser(userService.getNewUser())
    }

    return(
        <>
        {
            isShowLogin &&
            <section className="login-form-backdrop">
                <form className="login-form" onSubmit={onSubmitForm}>
                    <h3>{isSignup ? 'Sign up' : 'login'}</h3>
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
                    <section className="links">
                        <Button size="md" className="close-button" onClick={onClickClose}>Close</Button>
                        <Button size="md" className="submit-button" type="submit">Submit</Button>
                    </section>
                </form>
            </section>
        }
        </>
    )
}