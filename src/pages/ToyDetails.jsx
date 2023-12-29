import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Link } from "@mui/joy"
import { toyService } from "../services/toy.service"
import { setErrorMessageText } from "../store/actions/app.actions"
import { removeToy } from "../store/actions/toy.actions"


export function ToyDetails() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const params = useParams()
    const navigate = useNavigate()
    const [toy, setToy] = useState(undefined)

    useEffect(() => {
        toyService.get(params.toyId)
            .then(setToy)
            .catch(err => {
                setToy(null)
                setErrorMessageText(err.response.data)
            })
    }, [params])

    function onRemoveToy() {
        removeToy(toy._id)
            .then(navigate(`/toy`))
    }
    
    return (
        <>
            <h2>Toy Details</h2>
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
            <>
                <h3 className="toy-name">{toy.name}</h3>
                <p className="toy-description">{toy.description}</p>
                <p className="toy-price">{toy.price}</p>
                <p className="toy-stock">Stock: {toy.stock}</p>
                <section className="links">
                    <Link href={`/toy`} variant="outlined">Toys</Link>
                    {
                        loggedInUser && loggedInUser.isAdmin &&
                        <>
                            <Link href={`/toy/${params.toyId}/edit`} variant="outlined">Edit</Link>
                            <Button size="sm" className="remove" onClick={onRemoveToy}>Delete</Button>
                        </>
                    }
                </section>
            </>
        }
        </>
    )
}