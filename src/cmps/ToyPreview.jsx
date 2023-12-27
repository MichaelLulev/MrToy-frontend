import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { removeToy, updateToy } from "../store/actions/toy.actions"
import { updateUser } from "../store/actions/user.actions"


export function ToyPreview({ toy }) {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    function onAddToCart() {
        const cartItems = [toy.name, ...loggedInUser.cartItems]
        const balance = loggedInUser.balance - toy.price
        const user = { ...loggedInUser, balance, cartItems }
        updateUser(user)
        const stock = toy.stock - 1
        updateToy({ ...toy, stock })
    }
    
    return (
        <article className="toy-preview">
            <h3 className="toy-name">{toy.name}</h3>
            <p className="toy-description">{toy.description}</p>
            <p className="toy-labels">{toy.labels.join(', ')}</p>
            <p className="toy-price">{toy.price}</p>
            <p className="toy-stock">Left in stock: <span>{toy.stock}</span></p>
            <Link to={`/toy/${toy._id}`}>Details</Link>
            <button className="add-to-cart" onClick={onAddToCart}>Add to cart</button>
            {
                loggedInUser && loggedInUser.isAdmin &&
                <>
                    <Link to={`/toy/${toy._id}/edit`}>Edit</Link>
                    <button className="remove" onClick={() => removeToy(toy._id)}>Delete</button>
                </>
            }
        </article>
    )
}