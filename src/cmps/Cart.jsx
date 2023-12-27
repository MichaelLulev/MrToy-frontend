import { useSelector } from "react-redux";



export function Cart() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    return (
        <section className="cart">
            <h2>Cart</h2>
            <p className="user-balance">Balance: <span>{loggedInUser.balance}</span></p>
        </section>
    )
}