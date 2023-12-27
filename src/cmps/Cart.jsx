import { useSelector } from "react-redux";



export function Cart() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    if (! loggedInUser) return <></>
    return (
        <section className="cart">
            <h2>Cart</h2>
            <p className="user-balance">Balance: <span>{loggedInUser.balance}</span></p>
            <ul className="cart-items">
            {
                loggedInUser.cartItems.map((item, i) => {
                    return <li key={i}>{item}</li>
                })
            }
            </ul>
        </section>
    )
}