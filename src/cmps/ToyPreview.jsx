


export function ToyPreview({ toy }) {
console.log('./src/cmps/ToyPreview.jsx')
    
    return (
        <article className="toy-preview">
            <h3 className="toy-name">{toy.name}</h3>
            <img src={`/img/toy/${toy.name}.jpg`} />
            <p className="toy-description">{toy.description}</p>
            <p className="toy-labels">{toy.labels.join(', ')}</p>
            <p className="toy-price">{toy.price}</p>
            <p className="toy-stock">Stock: <span>{toy.stock}</span></p>
        </article>
    )
}