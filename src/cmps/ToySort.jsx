import { useSelector } from "react-redux"

import { setSortBy } from "../store/actions/toy.actions"


export function ToySort() {
    const sortBy = useSelector(state => state.toyModule.sortBy)

    function onChangeSortBy(ev) {
        const name = ev.target.name
        let value = ev.target.value
        if (name === 'isAscending') value = ev.target.checked
        setSortBy({ [name]: value })
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
                        <option value="price">Price</option>
                        <option value="stock">Stock</option>
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