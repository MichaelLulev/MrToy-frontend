import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { removeToy } from "../store/actions/toy.actions"


export function ToyPreview({ toy }) {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    
    return (
        <article className="toy-preview">
            <h3 className="toy-name">{toy.name}</h3>
            <p className="toy-description">{toy.description}</p>
            <p className="toy-labels">{toy.labels.join(', ')}</p>
            <p className="toy-price">{toy.price}</p>
            <Link to={`/toy/${toy._id}`}>Details</Link>
            {
                loggedInUser && loggedInUser.isAdmin &&
                <>
                    <Link to={`/toy/${toy._id}/edit`}>Edit</Link>
                    <button className="remove" onClick={() => removeToy(toy._id)}>Remove</button>
                </>
            }
        </article>
    )
}