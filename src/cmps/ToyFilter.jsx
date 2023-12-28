import { useSelector } from "react-redux"
import { Box, OutlinedInput, InputLabel, MenuItem, FormControl, Select, Chip } from '@mui/material'

import { setFilterBy } from "../store/actions/toy.actions"


export function ToyFilter() {
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const labels = useSelector(state => state.toyModule.labels)

    function onChangeFilterBy(ev) {
        const name = ev.target.name
        let value = ev.target.value
        setFilterBy({ [name]: value })
    }

    function onClearLabels() {
        setFilterBy({ labels: [] })
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
                    <span>Labels: </span>
                    <FormControl sx={{ width: '16em' }}>
                        <InputLabel >Labels</InputLabel>
                        <Select
                            name="labels"
                            multiple
                            value={filterBy.labels || []}
                            onChange={onChangeFilterBy}
                            input={<OutlinedInput label="Labels" />}
                            renderValue={selectedLabels => 
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selectedLabels.map((label, i) => <Chip key={i} label={label} />)}
                                </Box>
                            }
                            MenuProps={{ style: { maxHeight: '20em',width: '16em' } }}
                        >
                            {labels.map((label, i) => <MenuItem key={i} value={label}>{label}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <button onClick={onClearLabels}>Clear</button>
                </label>
            </section>
        </>
    )
}