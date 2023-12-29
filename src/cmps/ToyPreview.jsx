import { useSelector } from "react-redux"

import { updateUser } from "../store/actions/user.actions"


export function ToyPreview({ toy }) {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    function onAddToCart() {
        if (! toy.stock) return
        const cartItems = [toy, ...loggedInUser.cartItems]
        const cartTotal = Math.round(100 * (loggedInUser.cartTotal + toy.price)) / 100
        const user = { ...loggedInUser, cartItems, cartTotal }
        updateUser(user)
        updateToyStock(toy._id, -1)
    }
    
    return (
        <article className="toy-preview">
            <h3 className="toy-name">{toy.name}</h3>
            <p className="toy-description">{toy.description}</p>
            <p className="toy-labels">{toy.labels.join(', ')}</p>
            <p className="toy-price">{toy.price}</p>
            <p className="toy-stock">Stock: <span>{toy.stock}</span></p>
        </article>
    )
}