

function debounce(func, timeout=500) {
    let timeoutId
    const debounceFunc = (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func.apply(this, args)
        }, timeout)
    }
    return debounceFunc
}