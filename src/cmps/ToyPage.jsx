import { useSelector } from "react-redux"
import { setPageInfo } from "../store/actions/toy.actions"


export function ToyPage() {
    const toyPage = useSelector(state => state.toyModule.toyPage)
    const pageNum = toyPage.pageNum

    function onClickPrev() {
        setPageInfo({ pageNum: pageNum - 1})
    }

    function onClickNext() {
        setPageInfo({ pageNum: pageNum + 1})
    }

    function onChangeToysPerPage(ev) {
        setPageInfo({ pageNum: 1, toysPerPage: +ev.target.value })
    }

    return (
        <>
            <h2 className="page">Page</h2>
            <button
                className="prev"
                disabled={pageNum <= 1}
                onClick={onClickPrev}
            >
                Previous
            </button>
            <span className="page-num">{pageNum}/{toyPage.lastPageNum}</span>
            <button
                className="next"
                disabled={pageNum >= toyPage.lastPageNum}
                onClick={onClickNext}
            >
                Next
            </button>
            <label>
                <span>Toys per page: </span>
                <select name="toysPerPage" onChange={onChangeToysPerPage}>
                    <option>4</option>
                    <option>6</option>
                    <option>8</option>
                    <option>10</option>
                </select>
            </label>
            <span className="total-results">Total results: <span>{toyPage.resultsNum}</span></span>
        </>
    )
}