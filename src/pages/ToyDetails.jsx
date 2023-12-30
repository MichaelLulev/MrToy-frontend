import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Link } from "@mui/joy"
import { toyService } from "../services/toy.service"
import { setErrorMessageText } from "../store/actions/app.actions"
import { removeToy } from "../store/actions/toy.actions"
import { ToyPreview } from "../cmps/ToyPreview"


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

    async function onRemoveToy() {
        await removeToy(toy._id)
        navigate(`/toy`)
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
                <ToyPreview toy={toy}/>
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