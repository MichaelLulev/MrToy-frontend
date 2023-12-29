


export function ToyPreview({ toy }) {
    
    return (
        <article className="toy-preview">
            <h3 className="toy-name">{toy.name}</h3>
            <p className="toy-description">{toy.description}</p>
            <p className="toy-labels">{toy.labels.join(', ')}</p>
            <p className="toy-price">{toy.price}</p>
            <p className="toy-stock">Stock: <span>{toy.stock}</span></p>
        </article>
    )
}