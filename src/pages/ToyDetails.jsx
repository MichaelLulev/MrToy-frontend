import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Link } from "@mui/joy"
import { toyService } from "../services/toy.service"
import { setErrorMessageText, setTitle } from "../store/actions/app.actions"
import { removeToy } from "../store/actions/toy.actions"
import { ToyPreview } from "../cmps/ToyPreview"


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