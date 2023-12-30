import { Button, Link } from "@mui/joy"

import { Login } from "./Login.jsx"
import { useSelector } from 'react-redux'
import { setIsShowCart } from '../store/actions/app.actions.js'
import { Cart } from './Cart.jsx'


export function Header() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const title = useSelector(state => state.appModule.title)
    const isShowCart = useSelector(state => state.appModule.isShowCart)

    return (
        <header className="main-header">
            <Login />
            <h2 className="title">{title}</h2>
            <nav className="links">
                <Link href="/" variant="outlined">Home</Link>
                <Link href="/toy" variant="outlined">Toys</Link>
            {
                loggedInUser &&
                <Link href={`/user/${loggedInUser._id}`} variant="outlined">User details</Link>
            }
            {
                loggedInUser?.isAdmin &&
                <Link href={`/admin`} variant="outlined">Admin page</Link>
            }
            {
                loggedInUser &&
                <Button size="md" className="cart-button" onClick={() => setIsShowCart(! isShowCart)}>
                    {isShowCart ? 'Hide cart' : 'Show cart'}
                </Button>
            }
            {
                isShowCart &&
                <Cart />
            }
            </nav>
        </header>
    )
}