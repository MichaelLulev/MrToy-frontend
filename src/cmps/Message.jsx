import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { setMessage } from "../store/actions/app.actions"



export function Message() {
    const message = useSelector(state => state.appModule.message)
    const timeoutId = useRef()

    useEffect(() => {
        if (message && message.text) {
            clearTimeout(timeoutId.current)
            timeoutId.current = setTimeout(() => setMessage(null), 2000)
        }

        return () => clearTimeout(timeoutId.current)

    }, [message])

    if (! message) return <></>
    return (
        <div className="message">
            <span>{message.text}</span>
        </div>
    )
}