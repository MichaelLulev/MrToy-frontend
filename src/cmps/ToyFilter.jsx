import { useState, useRef } from "react"
import { useSelector } from "react-redux"
import { Input, Select, Box, Chip, Option, Button } from '@mui/joy'

import { debounce } from "../services/util.service"
import { setFilterBy } from "../store/actions/toy.actions"


export function ToyFilter() {
    const filterBy = useSelector(state => state.toyModule.filterBy)
    const labels = useSelector(state => state.toyModule.labels)
    const [_filterBy, _setFilterBy] = useState(filterBy)
    const debounceOnChangeFilterBy = useRef(debounce(onChangeFilterBy, 400))
    
    
    function onChangeSearchText(syntEv) {
        const text = syntEv.target.value
        _setFilterBy(prev => ({ ...prev, text }))
        debounceOnChangeFilterBy.current('text', text)
    }

    function onChangeFilterBy(name, value) {
        setFilterBy({ [name]: value })
    }

    function onClickChip(syntEv, clickedLabel) {
        syntEv.stopPropagation()
        const labels = filterBy.labels.filter(label => label !== clickedLabel.value)
        setFilterBy({ labels })
    }

    function onClearLabels() {
        setFilterBy({ labels: [] })
    }

    return (
        <>
            <h2>Filter</h2>
            <section className="toy-filter">
                <label>
                    <span>Search: </span>
                    <Input
                        className="filter-search"
                        type="text"
                        // value={_filterBy.text}
                        onChange={onChangeSearchText}
                    />
                </label>
                <label>
                    <span>Stock: </span>
                    <Select
                        className="filter-stock"
                        value={filterBy.stock}
                        onChange={(syntEv, value) => onChangeFilterBy('stock', value)}
                    >
                        <Option value="any">Any</Option>
                        <Option value="yes">In stock</Option>
                        <Option value="no">Out of stock</Option>
                    </Select>
                </label>
                <label>
                    <span>Labels: </span>
                    <Select
                        className="filter-labels"
                        multiple
                        defaultValue={filterBy.labels}
                        value={filterBy.labels}
                        onChange={(syntEv, value) => onChangeFilterBy('labels', value)}
                        renderValue={(selected) =>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', width: '100%' }}>
                            {
                                selected.map((selectedOption, i) =>
                                    <Chip
                                        key={i}
                                        variant="soft"
                                        color="primary"
                                        onClick={syntEv => onClickChip(syntEv, selectedOption)}
                                    >
                                        {selectedOption.label}
                                    </Chip>
                            )}
                            </Box>
                        }
                        sx={{ width: '15rem' }}
                        // slotProps={{ listbox: { sx: { width: '100%' } } }}
                    >
                    {
                        labels.map((label, i) =>
                            <Option key={i} value={label}>{label}</Option>
                        )
                    }
                    </Select>
                </label>
                <Button size="sm" onClick={onClearLabels}>Clear</Button>
            </section>
        </>
    )
}