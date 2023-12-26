import { Provider } from "react-redux"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { store } from "./store/store.js"
import { Header } from "./cmps/Header.jsx"
import { Home } from "./pages/Home.jsx"
import { ToyIndex } from "./pages/ToyIndex.jsx"
import { ToyDetails } from "./pages/ToyDetails.jsx"
import { Message } from "./cmps/Message.jsx"


export function App() {

    return (
        <Provider store={store}>
            <Router>
                <Header />
                <main className="main-screen">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/toy" element={<ToyIndex />} />
                        <Route path="/toy/:toyId" element={<ToyDetails />} />
                    </Routes>
                </main>
                <Message />
            </Router>
        </Provider>
    )
}