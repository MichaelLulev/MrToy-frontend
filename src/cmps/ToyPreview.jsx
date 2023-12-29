import { useSelector } from "react-redux"
import { removeToy, updateToyStock } from "../store/actions/toy.actions"
import { updateUser } from "../store/actions/user.actions"
import { Button, Link } from "@mui/joy"


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
            <section className="links">
                <Link href={`/toy/${toy._id}`} variant="outlined">Details</Link>
            {
                loggedInUser &&
                <Button size="sm" className="add-to-cart" onClick={onAddToCart}>Add to cart</Button>
            }
            {
                loggedInUser && loggedInUser.isAdmin &&
                <>
                    <Link href={`/toy/${toy._id}/edit`} variant="outlined">Edit</Link>
                    <Button size="sm" className="remove" onClick={() => removeToy(toy._id)}>Delete</Button>
                </>
            }
            </section>
        </article>
    )
}