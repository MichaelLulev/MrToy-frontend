import ReactDOM from "react-dom/client"
import { BrowserRouter as Router } from 'react-router-dom'

import { App } from "./RootCmp.jsx"
import { Provider } from "react-redux"
import { store } from "./store/store.js"


ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)
