import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Link } from "@mui/joy"
import { toyService } from "../services/toy.service"
import { setErrorMessageText, setTitle } from "../store/actions/app.actions"
import { removeToy } from "../store/actions/toy.actions"
import { ToyPreview } from "../cmps/ToyPreview"
import { userService } from '../services/user.service'
import { UserPreview } from '../cmps/UserPreview'


export function UserDetails() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const params = useParams()
    console.log('params:', params)
    const navigate = useNavigate()
    const [user, setUser] = useState(undefined)

    useEffect(() => setTitle('User Details'))

    useEffect(() => {
        userService.get(params.userId || loggedInUser?._id)
            .then(setUser)
            .catch(err => {
                setUser(null)
                setErrorMessageText(err.response.data)
            })
    }, [params, loggedInUser])

    // async function onRemoveToy() {
    //     await removeToy(user._id)
    //     navigate(`/toy`)
    // }
    
    return (
        <>
        {
            user === undefined &&
            <h3>Loading...</h3>
        }
        {
            user === null &&
            <h3>No such user</h3>
        }
        {
            user &&
            <>
                <UserPreview user={user}/>
                {/* <section className="links">
                    {
                        loggedInUser && loggedInUser.isAdmin &&
                        <>
                            <Link href={`/toy/${params.toyId}/edit`} variant="outlined">Edit</Link>
                            <Button size="md" className="remove" onClick={onRemoveToy}>Delete</Button>
                        </>
                    }
                </section> */}
            </>
        }
        </>
    )
}