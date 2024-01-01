import { useSelector } from "react-redux"

import { setSortBy } from "../store/actions/toy.actions"
import { Checkbox, Select, Option } from "@mui/joy"


export function ToySort() {
console.log('./src/cmps/ToySort.jsx')
    const sortBy = useSelector(state => state.toyModule.sortBy)

    function onChangeSortField(syntEv, value) {
        setSortBy({ field: value })
    }

    function onChangeIsAscending(ev) {
        const checked = ev.target.checked
        setSortBy({ isAscending: checked })
    }

    return (
        <section className="toy-sort">
            <h2>Sort</h2>
            <div className="label-container">
                <label>
                    <span>Field: </span>
                    <Select
                        className="sort-field"
                        value={sortBy.field}
                        onChange={onChangeSortField}
                    >
                        <Option value="name">Name</Option>
                        <Option value="description">Description</Option>
                        <Option value="price">Price</Option>
                        <Option value="stock">Stock</Option>
                    </Select>
                </label>
                <label>
                    <span>Ascending: </span>
                    <Checkbox
                        checked={sortBy.isAscending}
                        onChange={onChangeIsAscending}
                    />
                </label>
            </div>
        </section>
    )
}