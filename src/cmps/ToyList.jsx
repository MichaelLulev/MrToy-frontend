import { useSelector } from "react-redux"
import { ToyPreview } from "./ToyPreview"
import { Button, Link } from "@mui/joy"


export function ToyList() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const toys = useSelector(state => state.toyModule.toyPage.toys)

    function onAddToCart(toy) {
        if (! toy.stock) return
        const cartItems = [toy, ...loggedInUser.cartItems]
        const cartTotal = Math.round(100 * (loggedInUser.cartTotal + toy.price)) / 100
        const user = { ...loggedInUser, cartItems, cartTotal }
        updateUser(user)
        updateToyStock(toy._id, -1)
    }

    return (
        <section className="toy-list">
        {
            toys.map(toy =>
                <articlt className="toy-preview-container">
                    <ToyPreview
                        key={toy._id}
                        toy={toy}
                    />
                    <section className="links">
                        <Link href={`/toy/${toy._id}`} variant="outlined">Details</Link>
                    {
                        loggedInUser &&
                        <Button size="sm" className="add-to-cart" onClick={() => onAddToCart(toy)}>Add to cart</Button>
                    }
                    {
                        loggedInUser && loggedInUser.isAdmin &&
                        <>
                            <Link href={`/toy/${toy._id}/edit`} variant="outlined">Edit</Link>
                            <Button size="sm" className="remove" onClick={() => removeToy(toy._id)}>Delete</Button>
                        </>
                    }
                    </section>
                </articlt>
                )
        }
        </section>
    )
}