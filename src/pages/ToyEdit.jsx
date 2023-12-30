import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Button, Chip, Input, Link, Option, Select, Textarea } from "@mui/joy"

import { toyService } from "../services/toy.service"
import { setErrorMessageText } from "../store/actions/app.actions"
import { setLabels, updateToy } from "../store/actions/toy.actions"


export function ToyEdit() {
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)
    const labels = useSelector(state => state.toyModule.labels)
    const params = useParams()
    const navigate = useNavigate()
    const [toy, setToy] = useState(undefined)

    useEffect(() => {
        onResetToy()
        setLabels()
            .catch(err => setErrorMessageText(err))
    }, [params])

    async function onResetToy() {
        try {
            const toy = await toyService.get(params.toyId)
            setToy(toy)
        } catch (err) {
                setToy(null)
                setErrorMessageText(err.response.data)
        }
    }
    
    function onClearToy() {
        setToy(prev => ({
            ...prev,
            name: '',
            description: '',
            price: 0,
            stock: 0,
            labels: []
        }))
    }
    
    function onChangeToy(ev) {
        const name = ev.target.name
        let value = ev.target.value
        if (['price', 'stock'].includes(name)) value = Math.max(+value, 0)
        setToy(prev => ({ ...prev, [name]: value }))
    }

    async function onSubmitToy(ev) {
        ev.preventDefault()
        const _toy = await updateToy(toy)
        navigate(`/toy/${_toy._id}`)
    }

    if (! loggedInUser) return <h3>Not logged in</h3>
    if (! loggedInUser.isAdmin) return <h3>Not admin</h3>
    return (
        <>
            <h2>Toy Edit</h2>
        {
            toy === undefined &&
            <h3>Loading...</h3>
        }
        {
            toy === null &&
            <h3>No such toy</h3>
        }
        {
            toy &&
            <>
                <form className="toy-edit-form" onSubmit={onSubmitToy}>
                    <label>
                        <span>Name: </span>
                        <Input
                            className="input-toy-name"
                            type="text"
                            name="name"
                            value={toy.name}
                            onChange={onChangeToy}
                        />
                    </label>
                    <label>
                        <span>Description: </span>
                        <Textarea
                            className="input-toy-description"
                            name="description"
                            value={toy.description}
                            rows="5"
                            onChange={onChangeToy}
                        ></Textarea>
                    </label>
                    <label>
                        <span>Price: </span>
                        <Input
                            className="input-toy-price"
                            type="number"
                            name="price"
                            value={toy.price}
                            onChange={onChangeToy}
                        />
                    </label>
                    <label>
                        <span>Stock: </span>
                        <Input
                            className="input-toy-stock"
                            type="number"
                            name="stock"
                            value={toy.stock}
                            onChange={onChangeToy}
                        />
                    </label>
                    <label>
                        <span>Labels: </span>
                        <Select
                            className="input-toy-labels"
                            multiple
                            defaultValue={toy.labels}
                            value={toy.labels}
                            onChange={(syntEv, value) => onChangeToy({ target: { name: 'labels', value }})}
                            renderValue={(selected) =>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', width: '100%' }}>
                                {
                                    selected.map((selectedOption, i) =>
                                        <Chip
                                            key={i}
                                            variant="soft"
                                            color="primary"
                                            onClick={syntEv => {
                                                syntEv.stopPropagation()
                                                const labels = toy.labels.filter(label => label !== selectedOption.value)
                                                onChangeToy({ target: { name: 'labels', value: labels }})
                                        }}
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
                    <section className="links">
                        <Link href={`/toy/${toy._id}`} variant="outlined">Details</Link>
                        <Button size="sm" className="clear" onClick={onClearToy}>Clear</Button>
                        <Button size="sm" className="reset" onClick={onResetToy}>Reset</Button>
                        <Button type="submit" size="sm" className="submit">Submit</Button>
                    </section>
                </form>
            </>
        }
        </>
    )
}