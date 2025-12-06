export default function ProductList({ products }) {
  if (!products.length) {
    return (
      <div className="product-list">
        <h3>Products</h3>
        <p>No products available.</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h3>Products</h3>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
            <th>Price (₹)</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>{p.status}</td>
              <td>{p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
