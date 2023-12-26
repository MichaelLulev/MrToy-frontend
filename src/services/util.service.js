

export const SECOND = 1000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const WEEK = 7 * DAY


export function debounce(func, timeout=500) {
    let timeoutId
    const debounceFunc = (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
    return debounceFunc
}