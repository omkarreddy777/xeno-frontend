export default function SummaryCards({ summary }) {
  const { totalCustomers, totalOrders, totalRevenue } = summary;
  const avgOrderValue =
    totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

  const cards = [
    { label: "Customers", value: totalCustomers },
    { label: "Orders", value: totalOrders },
    { label: "Revenue", value: `₹${totalRevenue}` },
    { label: "Avg order value", value: `₹${avgOrderValue}` },
  ];

  return (
    <div className="summary-cards">
      {cards.map((c) => (
        <div key={c.label} className="card">
          <div className="card-label">{c.label}</div>
          <div className="card-value">{c.value}</div>
        </div>
      ))}
    </div>
  );
}
