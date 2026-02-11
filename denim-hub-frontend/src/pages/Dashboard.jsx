import Sidebar from "../components/Sidebar";
import {
  FaBox,
  FaRupeeSign,
  FaShoppingBag,
  FaExclamationTriangle,
  FaChartPie,
  FaTshirt,
} from "react-icons/fa";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const categorySales = [
  { name: "Jeans", value: 55 },
  { name: "Denim Shirts", value: 30 },
  { name: "Jackets", value: 15 },
];

const stockDistribution = [
  { name: "In Stock", value: 80 },
  { name: "Low Stock", value: 15 },
  { name: "Out of Stock", value: 5 },
];

const COLORS = ["#13338f", "#4c6fd3", "#d9534f"];

const lowStockProducts = [
  { id: 1, name: "Blue Denim Jeans", category: "Jeans", stock: 8 },
  { id: 2, name: "Slim Fit Shirt", category: "Shirts", stock: 5 },
  { id: 3, name: "Denim Jacket", category: "Jackets", stock: 3 },
];

function Dashboard() {
  return (
    <div className="d-flex vh-100 overflow-hidden">
      <Sidebar />

      <div className="flex-grow-1 p-4 theme-bg-navy-light overflow-auto">
        <h3 className="mb-4 theme-text-navy">Dashboard</h3>

        <div className="row g-3 mb-4">
          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <FaBox size={28} className="theme-text-navy mb-2" />
              <h6>Total Products</h6>
              <h4>120</h4>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <FaShoppingBag size={28} className="theme-text-navy mb-2" />
              <h6>Total Stock</h6>
              <h4>3,450</h4>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <FaRupeeSign size={28} className="theme-text-navy mb-2" />
              <h6>Today’s Sales</h6>
              <h4>₹45,000</h4>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card p-3 shadow-sm">
              <FaExclamationTriangle size={28} className="text-danger mb-2" />
              <h6>Low Stock Items</h6>
              <h4>6</h4>
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <FaRupeeSign size={26} className="theme-text-navy mb-2" />
              <h6>Total Sales (This Month)</h6>
              <h4>₹6,80,000</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <FaTshirt size={26} className="theme-text-navy mb-2" />
              <h6>Top Selling Product</h6>
              <h4>Blue Denim Jeans</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <FaChartPie size={26} className="theme-text-navy mb-2" />
              <h6>Most Selling Category</h6>
              <h4>Jeans</h4>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <div className="card p-4 shadow-sm">
              <h5 className="mb-3">Category-wise Sales</h5>

              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={categorySales}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    {categorySales.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card p-4 shadow-sm">
              <h5 className="mb-3">Stock Status Overview</h5>

              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={stockDistribution}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={90}
                    label
                  >
                    {stockDistribution.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card p-4 shadow-sm">
          <h5 className="mb-3">Low Stock Alert</h5>

          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Stock Left</th>
              </tr>
            </thead>
            <tbody>
              {lowStockProducts.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td className="text-danger fw-bold">{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
