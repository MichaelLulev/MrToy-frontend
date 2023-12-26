import { useSelector } from "react-redux"

import { setToySortBy } from "../store/actions/toy.actions"


export function Sort() {
    const sortBy = useSelector(state => state.toyModule.toySortBy)

    function onChangeSortBy(ev) {
        const name = ev.target.name
        let value = ev.target.value
        if (name === 'isAscending') value = ev.target.checked
        setToySortBy({ [name]: value })
    }

    return (
        <>
            <h2>Sort</h2>
            <section className="sort">
                <label>
                    <span>Field: </span>
                    <select
                        name="field"
                        className="sort-field"
                        value={sortBy.field}
                        onChange={onChangeSortBy}
                    >
                        <option value="name">Name</option>
                        <option value="description">Description</option>
                    </select>
                </label>
                <label>
                    <span>Ascending: </span>
                    <input
                        type="checkbox"
                        name="isAscending"
                        checked={sortBy.isAscending}
                        onChange={onChangeSortBy}
                    />
                </label>
            </section>
        </>
    )
}