import { useSelector } from "react-redux"
import { setFilterBy } from "../store/actions/toy.actions"


export function ToyFilter() {
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const labels = useSelector(state => state.toyModule.labels)

    function onChangeFilterBy(ev) {
        const name = ev.target.name
        const value = ev.target.value
        setFilterBy({ [name]: value })
    }

    return (
        <>
            <h2>Filter</h2>
            <section className="filter">
                <label>
                    <span>Search: </span>
                    <input type="text" name="text" className="filter-search" value={filterBy.text} onChange={onChangeFilterBy}/>
                </label>
                <label>
                    <span>Stock: </span>
                    <select name="stock" className="filter-stock" value={filterBy.stock} onChange={onChangeFilterBy}>
                        <option value="any">Any</option>
                        <option value="yes">In stock</option>
                        <option value="no">Out of stock</option>
                    </select>
                </label>
                <label>
                    <span>Label: </span>
                    <select name="label" className="filter-label" value={filterBy.label} onChange={onChangeFilterBy}>
                        <option value="any">Any</option>
                    {
                        labels.map((label, i) => {
                            return <option key={i}>{label}</option>
                        })
                    }
                    </select>
                </label>
            </section>
        </>
    )
}