export default function TopCustomers({ customers }) {
  return (
    <div className="top-customers">
      <h3>Top Customers</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Total Spend</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((c, i) => (
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>₹{c.totalSpend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
