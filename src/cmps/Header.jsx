import { Login } from "./Login.jsx"
import { Filter } from "./Filter.jsx"
import { Sort } from "./Sort.jsx"


export function Header() {

    return (
        <header>
            <Login />
            <Filter />
            <Sort />
        </header>
    )
}