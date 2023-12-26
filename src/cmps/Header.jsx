import { NavLink } from "react-router-dom"

import { Login } from "./Login.jsx"


export function Header() {

    return (
        <header>
            <Login />
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
            </nav>
        </header>
    )
}