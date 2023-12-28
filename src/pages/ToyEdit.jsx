import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { setErrorMessageText } from "../store/actions/app.actions"
import { updateToy } from "../store/actions/toy.actions"


export function ToyEdit() {
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
    
    function onChangeToy(ev) {
        const name = ev.target.name
        let value = ev.target.value
        if (['price', 'stock'].includes(name)) value = +value
        setToy(prev => ({ ...prev, [name]: value }))
    }

    function onSubmitToy(ev) {
        ev.preventDefault()
        updateToy(toy)
            .then(toy => navigate(`/toy/${toy._id}`))
    }

    if (! loggedInUser) return <h3>Not logged in</h3>
    if (! loggedInUser.isAdmin) return <h3>Not admin</h3>
    return (
        <>
            <h2>Toy Edit</h2>
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
                <form onSubmit={onSubmitToy}>
                    <label>
                        <span>Name: </span>
                        <input
                            className="input-toy-name"
                            type="text"
                            name="name"
                            value={toy.name}
                            onChange={onChangeToy}
                        />
                    </label>
                    <label>
                        <span>Description: </span>
                        <textarea
                            className="input-toy-description"
                            name="description"
                            value={toy.description}
                            rows="5"
                            onChange={onChangeToy}
                        ></textarea>
                    </label>
                    <label>
                        <span>Price: </span>
                        <input
                            className="input-toy-price"
                            type="number"
                            name="price"
                            value={toy.price}
                            step="0.01"
                            min="0"
                            onChange={onChangeToy}
                        />
                    </label>
                    <label>
                        <span>Stock: </span>
                        <input
                            className="input-toy-stock"
                            type="number"
                            name="stock"
                            value={toy.stock}
                            min="0"
                            onChange={onChangeToy}
                        />
                    </label>
                    <button className="submit">Submit</button>
                </form>
                <Link to={`/toy/${toy._id}`}>Details</Link>
            </>
        }
        </>
    )
}