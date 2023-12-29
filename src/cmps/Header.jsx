import { Link } from "@mui/joy"

import { Login } from "./Login.jsx"


export function Header() {

    return (
        <header>
            <Login />
            <nav className="links">
                <Link href="/" variant="outlined">Home</Link>
                <Link href="/toy" variant="outlined">Toys</Link>
            </nav>
        </header>
    )
}