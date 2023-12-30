import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Link } from "@mui/joy"
import { toyService } from "../services/toy.service"
import { setErrorMessageText, setTitle } from "../store/actions/app.actions"
import { removeToy, updateToyStock } from "../store/actions/toy.actions"
import { ToyPreview } from "../cmps/ToyPreview"
import { updateUser } from '../store/actions/user.actions'


export function ToyDetails() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const params = useParams()
    const navigate = useNavigate()
    const [toy, setToy] = useState(undefined)

    useEffect(() => setTitle('Toy Details'))

    useEffect(() => {
        toyService.get(params.toyId)
            .then(setToy)
            .catch(err => {
                setToy(null)
                setErrorMessageText(err.response.data)
            })
    }, [params])

    async function onAddToCart(toy) {
        if (! toy.stock) return
        const cartItems = [toy, ...loggedInUser.cartItems]
        const cartTotal = Math.round(100 * (loggedInUser.cartTotal + toy.price)) / 100
        const user = { ...loggedInUser, cartItems, cartTotal }
        await Promise.all([updateToyStock(toy._id, -1), updateUser(user)])
        setToy(prev => ({ ...prev, stock: prev.stock - 1}))
    }

    async function onRemoveToy() {
        await removeToy(toy._id)
        navigate(`/toy`)
    }
    
    return (
        <>
        {
            toy === undefined &&
            <h3>Loading...</h3>
        }
        {
            toy === null &&
            <h3>No such toy</h3>
        }
        {
            toy &&
            <section className="toy-details">
                <ToyPreview toy={toy}/>
                <section className="links">
                    <Link href={`/toy`} variant="outlined">Toys</Link>
                    <Button size="md" className="add-to-cart" disabled={! loggedInUser || ! toy.stock} onClick={() => onAddToCart(toy)}>Add to cart</Button>
                    {
                        loggedInUser && loggedInUser.isAdmin &&
                        <>
                            <Link href={`/toy/${params.toyId}/edit`} variant="outlined">Edit</Link>
                            <Button size="md" className="remove" onClick={onRemoveToy}>Delete</Button>
                        </>
                    }
                </section>
            </section>
        }
        </>
    )
}