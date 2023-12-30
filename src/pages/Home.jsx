import { useEffect } from 'react'
import { setTitle } from '../store/actions/app.actions'


export function Home() {
    
    useEffect(() => setTitle('Toy Home'))

    return (
        <section className="home-page">
        </section>
    )
}