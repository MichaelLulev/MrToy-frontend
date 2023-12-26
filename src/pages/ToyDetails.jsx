import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { setErrorMessageText } from "../store/actions/app.actions"


export function ToyDetails() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const params = useParams()
    const [toy, setToy] = useState(null)

    useEffect(() => {
        toyService.get(params.toyId)
            .then(setToy)
            .catch(err => setErrorMessageText(err.response.data))
    }, [])
    
    return (
        <>
            <h2>Toy Details</h2>
        {
            toy &&
            <>
                <h3 className="toy-name">{toy.name}</h3>
                <p className="toy-description">{toy.description}</p>
                <p className="toy-price">{toy.price}</p>
                {
                    loggedInUser && loggedInUser.isAdmin &&
                    <>
                        <button className="edit">Edit</button>
                        <button className="remove">Remove</button>
                    </>
                }
            </>
        }
        <Link to="/toy">Back</Link>
        </>
    )
}