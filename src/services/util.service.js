


export const SECOND = 1000
export const MINUTE = 60 * SECOND
export const HOUR = 60 * MINUTE
export const DAY = 24 * HOUR
export const WEEK = 7 * DAY


export function debounce(func, delay=500) {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(func, delay, ...args)
    }
}

export function getShortestPath(...args) {
    const paths = getPaths(...args)
    return paths.reduce((shortestPath, path) => path.length < shortestPath.length ? path : shortestPath, paths[0])
}

export function getPaths(object, value, type='value', maxDepth=3, checkEqual=((a, b) => a === b), path='', paths=[], origObj=null) {
    if (maxDepth < 0 || object === origObj) return
    for (const key in object) {
        const _path = path + `.${key}`
        if (type === 'value' && checkEqual(object[key], value)) paths.push(_path)
        else if (type === 'key' && checkEqual(key, value)) paths.push(_path)
        if (typeof object[key] !== 'object') continue
        getPaths(object[key], value, type, maxDepth-1, checkEqual, _path, paths, object)
    }
    return paths
}