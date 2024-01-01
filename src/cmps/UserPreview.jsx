


export function UserPreview({ user }) {
console.log('./src/cmps/UserPreview.jsx')
    console.log('user:', user)
    
    return (
        <article className="user-preview">
            <h3 className="user-username">{user.username}{user.isAdmin ? ' (Admin)' : ''}</h3>
            <p className="user-full-name">Full name: {user.fullName}</p>
            <p className="user-bough-items">Bought items: {user.boughtItems.length === 0 ? 'None' : user.boughtItems.map(item => item.name).join(', ')}</p>
            <p className="user-balance">Balance: <span>{user.balance}</span></p>
        </article>
    )
}