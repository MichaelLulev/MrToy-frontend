import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { userService } from '../services/user.service.js'
import { setErrorMessageText, setTitle } from '../store/actions/app.actions.js'



export function AdminPage() {
console.log('./src/pages/AdminPage.jsx')
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const [user, setUser] = useState(undefined)

    useEffect(() => setTitle('Admin Page'))

    useEffect(() => {
        userService.get(loggedInUser?._id)
            .then(user => {
                if (user.isAdmin) setUser(user)
                else setUser(null)
            })
            .catch(err => {
                setUser(null)
                setErrorMessageText(err.response.data)
            })
    }, [loggedInUser])

    return (
        <>
        {
            user === undefined &&
            <h3>Loading...</h3>
        }
        {
            user === null &&
            <h3>Not admin</h3>
        }
        {
            user?.isAdmin &&
            <h3>All the store details</h3>
        }
        </>
    )
}