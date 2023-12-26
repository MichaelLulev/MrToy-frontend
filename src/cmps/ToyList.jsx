import { useSelector } from "react-redux"
import { ToyPreview } from "./ToyPreview"


export function ToyList() {
    const toys = useSelector(state => state.toyModule.toyPage.toys)

    return (
        <section className="toy-list">
        {
            toys.map(toy =>
                <ToyPreview
                    key={toy._id}
                    toy={toy}
                />
            )
        }
        </section>
    )
}