import { Login } from "./Login.jsx"
import { ToyFilter } from "./ToyFilter.jsx"
import { ToySort } from "./ToySort.jsx"


export function Header() {

    return (
        <header>
            <Login />
            <ToyFilter />
            <ToySort />
        </header>
    )
}