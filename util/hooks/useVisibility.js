import { useEffect } from "react"

export const useVisibility = () => {
    let fireEvent
    let callback
    document.addEventListener("visibilitychange", fireEvent)
    useEffect(() => {
        callback()
    }, [callback])

    return { callback }
}