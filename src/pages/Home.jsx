import { useEffect } from 'react'
import { setTitle } from '../store/actions/app.actions'


export function Home() {
console.log('./src/pages/Home.jsx')
    
    useEffect(() => setTitle('Toys & Drakes'))

    return (
        <section className="home-page">
            <img src="/img/toy/homepage-2.jpg" alt="kids playing with dragons and castles" />
        </section>
    )
}