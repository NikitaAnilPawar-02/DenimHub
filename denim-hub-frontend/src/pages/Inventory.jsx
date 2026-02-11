import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaBoxes, FaExclamationTriangle } from "react-icons/fa";

function Inventory() {
  const [products] = useState([
    {
      id: 1,
      name: "Blue Denim Jeans",
      category: "Jeans",
      stock: 50,
      minStock: 10,
    },
    {
      id: 2,
      name: "Slim Fit Denim Shirt",
      category: "Shirts",
      stock: 8,
      minStock: 10,
    },
    {
      id: 3,
      name: "Denim Jacket",
      category: "Jackets",
      stock: 3,
      minStock: 5,
    },
  ]);

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = products.filter((p) => p.stock <= p.minStock).length;

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <Sidebar />

      <div className="flex-grow-1 p-4 overflow-auto">
        <h3 className="mb-4">Inventory Management</h3>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <FaBoxes size={28} className="mb-2 text-primary" />
              <h6>Total Stock Units</h6>
              <h4>{totalStock}</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <FaExclamationTriangle size={28} className="mb-2 text-danger" />
              <h6>Low Stock Items</h6>
              <h4>{lowStockCount}</h4>
            </div>
          </div>
        </div>

        <div className="card p-4 shadow-sm">
          <h5 className="mb-3">Stock Details</h5>

          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Min Stock</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => {
                const isLow = product.stock <= product.minStock;

                return (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td className="fw-bold">{product.stock}</td>
                    <td>{product.minStock}</td>
                    <td>
                      {isLow ? (
                        <span className="badge bg-danger">Low Stock</span>
                      ) : (
                        <span className="badge bg-success">In Stock</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {products.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No inventory data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
