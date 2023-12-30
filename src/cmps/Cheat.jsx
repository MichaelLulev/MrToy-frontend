import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { queryUsers } from '../store/actions/user.actions'



export function Cheat() {
    const users = useSelector(state => state.userModule.users)
    console.log('users:', users)

    useEffect(() => {
            queryUsers()
    }, [])

    return (
        <table className="cheat">
            <thead>
                <tr>
                    <th style={{ textAlign: 'start'}}>username</th>
                    <th style={{ textAlign: 'start'}}>password</th>
                    <th style={{ textAlign: 'start'}}>isAdmin</th>
                </tr>
            </thead>
            <tbody>
            {
                users.map((user, i) => 
                    <tr key={i}>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                    {
                        user.isAdmin &&
                        <td>true</td>
                    }
                    </tr>
                )
            }
            </tbody>
        </table>
    )
}