import { useSelector } from "react-redux";
import { updateUser } from "../store/actions/user.actions";
import { updateToyStock } from "../store/actions/toy.actions";



export function Cart() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    function onBuy() {
        if (loggedInUser.balance < loggedInUser.cartTotal) return
        const balance = Math.round(100 * (loggedInUser.balance - loggedInUser.cartTotal)) / 100
        const cartTotal = 0
        const boughtItems = [...loggedInUser.cartItems, ...loggedInUser.boughtItems]
        const cartItems = []
        updateUser({ ...loggedInUser, balance, cartTotal, boughtItems, cartItems})
    }

    function onRemoveItem(toy, idx) {
        const cartTotal = Math.round(100 * (loggedInUser.cartTotal - toy.price)) / 100
        const cartItems = loggedInUser.cartItems.toSpliced(idx, 1)
        updateUser({ ...loggedInUser, cartTotal, cartItems})
        updateToyStock(toy._id, +1)
    }

    if (! loggedInUser) return <></>
    return (
        <section className="cart">
            <h2>Cart</h2>
            <p className="user-balance">Balance: <span>{loggedInUser.balance}</span></p>
            <ul className="cart-items">
            {
                loggedInUser.cartItems.map((toy, i) =>
                    <li key={i}>
                        <span>{toy.name} {toy.price} </span>
                        <button className="remove-item" onClick={() => onRemoveItem(toy, i)}>X</button>
                    </li>
                )
            }
            </ul>
            <p className="cart-total">Total: <span>{loggedInUser.cartTotal}</span></p>
            <button className="buy" onClick={onBuy}>Buy</button>
        </section>
    )
}