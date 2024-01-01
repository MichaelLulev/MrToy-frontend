import { useSelector } from "react-redux"
import { setPageInfo } from "../store/actions/toy.actions"
import { Button, Option, Select } from "@mui/joy"


export function ToyPage() {
console.log('./src/cmps/ToyPage.jsx')
    const toyPage = useSelector(state => state.toyModule.toyPage)
    const pageInfo = useSelector(state => state.toyModule.pageInfo)
    const pageNum = toyPage.pageNum

    function onClickPrev() {
        setPageInfo({ pageNum: pageNum - 1})
    }

    function onClickNext() {
        setPageInfo({ pageNum: pageNum + 1})
    }

    function onChangeToysPerPage(syntEv, value) {
        setPageInfo({ pageNum: 1, toysPerPage: value })
    }

    return (
        <section className="toy-page">
            <h2 className="page">Page</h2>
            <Button
                className="prev"
                disabled={pageNum <= 1}
                onClick={onClickPrev}
            >
                Previous
            </Button>
            <span className="page-num">{pageNum}/{toyPage.lastPageNum}</span>
            <Button
                className="next"
                disabled={pageNum >= toyPage.lastPageNum}
                onClick={onClickNext}
            >
                Next
            </Button>
            <label>
                <span>Toys per page: </span>
                <Select name="toysPerPage" value={pageInfo.toysPerPage} onChange={onChangeToysPerPage}>
                    <Option value={4}>4</Option>
                    <Option value={6}>6</Option>
                    <Option value={8}>8</Option>
                    <Option value={10}>10</Option>
                </Select>
            </label>
            <span className="total-results">Total results: <span>{toyPage.resultsNum}</span></span>
        </section>
    )
}