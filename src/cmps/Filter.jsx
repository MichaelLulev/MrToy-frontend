import { useSelector } from "react-redux"
import { setFilterBy } from "../store/actions/toy.actions"


export function Filter() {
    const filterBy = useSelector(state => state.toyModule.filterBy)

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
                        <option value={null}>Any</option>
                        <option value={true}>In stock</option>
                        <option value={false}>Out of stock</option>
                    </select>
                </label>
            </section>
        </>
    )
}