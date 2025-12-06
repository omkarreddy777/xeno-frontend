import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function RevenueChart({ data }) {
  const formatDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short"
    });
  };

  return (
    <div className="chart-container">
      <h3>Revenue Trend</h3>

      <LineChart width={800} height={300} data={data}>
        <CartesianGrid stroke="#ddd" />
        <XAxis dataKey="date" tickFormatter={formatDate} />
        <YAxis />
        <Tooltip />
        <Line dataKey="revenue" stroke="#4a90e2" />
      </LineChart>
    </div>
  );
}
