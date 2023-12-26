import { useSelector } from "react-redux"
import { Link } from "react-router-dom"



export function ToyPreview({ toy }) {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    
    return (
        <article className="toy-preview">
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
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )
}