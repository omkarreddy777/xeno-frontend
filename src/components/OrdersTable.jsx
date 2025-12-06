export default function OrdersTable({ orders }) {
  if (!orders.length) {
    return (
      <div className="orders-table">
        <h3>Recent Orders</h3>
        <p>No orders available.</p>
      </div>
    );
  }

  return (
    <div className="orders-table">
      <h3>Recent Orders</h3>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Currency</th>
            <th>Placed On</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.shopifyOrderId}</td>
              <td>{o.customerId || "-"}</td>
              <td>{o.totalPrice}</td>
              <td>{o.currency}</td>
              <td>
                {o.createdAt
                  ? new Date(o.createdAt).toLocaleString()
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
