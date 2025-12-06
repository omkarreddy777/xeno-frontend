import { useState, useEffect } from "react";
import API from "../api";
import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import RevenueChart from "../components/RevenueChart";
import TopCustomers from "../components/TopCustomers";
import ProductList from "../components/ProductList";
import OrdersTable from "../components/OrdersTable";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [lastSync, setLastSync] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState("");

  const tenant = JSON.parse(localStorage.getItem("tenant")) || {};
  const storeName = tenant?.name || "Your Store";
  const storeDomain = tenant?.shopDomain || "";

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [s, c, t, p, o, ls] = await Promise.all([
        API.get("/api/metrics/summary"),
        API.get("/api/metrics/orders"),
        API.get("/api/metrics/top-customers"),
        API.get("/api/metrics/products"),
        API.get("/api/metrics/orders-list"),
        API.get("/api/tenant/last-sync")
      ]);

      setSummary(s.data);
      setChartData(c.data);
      setCustomers(t.data);
      setProducts(p.data);
      setOrders(o.data);
      setLastSync(ls.data.lastSyncedAt || null);
    } catch (err) {
      setError("Failed to load dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  const syncNow = async () => {
    try {
      setSyncing(true);
      await API.post("/api/tenant/sync");
      await loadData();
      alert("Sync completed!");
    } catch (err) {
      alert("Sync failed. Please check your Shopify credentials.");
    } finally {
      setSyncing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading || !summary) {
    return (
      <>
        <Navbar />
        <div className="dashboard-container">
          <p className="loading-text">Loading dashboard...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        {error && <div className="error-banner">{error}</div>}

        <div className="store-header">
          <div>
            <h2 className="store-title">{storeName}</h2>
            {storeDomain && <p className="store-domain">{storeDomain}</p>}
          </div>

          <div className="header-actions">
            <button className="sync-btn" onClick={syncNow} disabled={syncing}>
              {syncing ? "Syncing..." : "Sync Shopify Data"}
            </button>

            <div className="last-sync">
              Last sync: {lastSync ? new Date(lastSync).toLocaleString() : "Never"}
            </div>
          </div>
        </div>

        <SummaryCards summary={summary} />
        <RevenueChart data={chartData} />
        <TopCustomers customers={customers} />
        <ProductList products={products} />
        <OrdersTable orders={orders} />
      </div>
    </>
  );
}
