import { Provider } from "react-redux"
import { BrowserRouter as Router, Router, Routes, Route } from 'react-router-dom'

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <Header />
                <main className="main-screen">
                    <Routes>
                    </Routes>
                </main>
                <Footer />
            </Router>
        </Provider>
    )
}