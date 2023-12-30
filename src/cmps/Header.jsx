import { Button, Link } from "@mui/joy"

import { Login } from "./Login.jsx"
import { useSelector } from 'react-redux'


export function Header() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    return (
        <header>
            <Login />
            <nav className="links">
                <Link href="/" variant="outlined">Home</Link>
                <Link href="/toy" variant="outlined">Toys</Link>
            {
                loggedInUser &&
                <Link href={`/user/${loggedInUser._id}`} variant="outlined">User details</Link>
            }
            {
                loggedInUser?.isAdmin &&
                <Link href={`/admin`} variant="outlined">Admin</Link>
            }
            </nav>
        </header>
    )
}