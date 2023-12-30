import './assets/style/main.css'

import { Routes, Route } from 'react-router-dom'

import { Header } from "./cmps/Header.jsx"
import { Home } from "./pages/Home.jsx"
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { Message } from "./cmps/Message.jsx"
import { UserDetails } from './pages/UserDetails.jsx'
import { Cheat } from './cmps/Cheat.jsx'
import { useState } from 'react'
import { AdminPage } from './pages/AdminPage.jsx'


export function App() {
    const [isCheat, setIsCheat] = useState(false)

    return (
        <>
            {/* <button onClick={() => setIsCheat(prev => ! prev)}>Cheat</button>
        {
            isCheat &&
            <Cheat />
        }
            <hr /> */}
            <Header />
            <main className="main-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/toy" element={<ToyIndex />} />
                    <Route path="/toy/:toyId" element={<ToyDetails />} />
                    <Route path="/toy/:toyId/edit" element={<ToyEdit />} />
                    <Route path="/user" element={<UserDetails />} />
                    <Route path="/user/:userId" element={<UserDetails />} />
                    <Route path="/admin" element={<AdminPage />} />
                </Routes>
            </main>
            <Message />
        </>
    )
}