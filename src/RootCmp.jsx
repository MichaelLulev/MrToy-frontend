import { Routes, Route } from 'react-router-dom'

import { Header } from "./cmps/Header.jsx"
import { Home } from "./pages/Home.jsx"
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { ToyEdit } from "./pages/ToyEdit.jsx"
import { Message } from "./cmps/Message.jsx"


export function App() {

    return (
        <>
            <Header />
            <main className="main-screen">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/toy" element={<ToyIndex />} />
                    <Route path="/toy/:toyId" element={<ToyDetails />} />
                    <Route path="/toy/:toyId/edit" element={<ToyEdit />} />
                </Routes>
            </main>
            <Message />
        </>
    )
}