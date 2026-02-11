import { useState } from "react";
import Sidebar from "../components/Sidebar";

const initialProducts = [
  { id: 101, name: "Blue Denim Jeans", price: 1999, stock: 12 },
  { id: 102, name: "Slim Fit Shirt", price: 1499, stock: 6 },
];

function Billing() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [billItems, setBillItems] = useState([]);
  const [showBill, setShowBill] = useState(false);

  const [customer, setCustomer] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const addToBill = () => {
    const product = products.find((p) => p.id === Number(selectedProductId));

    if (!product) return alert("Select a product");
    if (quantity <= 0) return alert("Quantity must be at least 1");
    if (quantity > product.stock) return alert("Not enough stock");

    const itemTotal = product.price * quantity;

    setBillItems([
      ...billItems,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        total: itemTotal,
      },
    ]);

    setProducts(
      products.map((p) =>
        p.id === product.id ? { ...p, stock: p.stock - quantity } : p,
      ),
    );

    setSelectedProductId("");
    setQuantity(1);
  };

  const subTotal = billItems.reduce((sum, item) => sum + item.total, 0);
  const discountAmount = (subTotal * discount) / 100;
  const finalAmount = subTotal - discountAmount;

  const generateBill = () => {
    if (!customer.name.trim()) return alert("Enter customer name");
    if (!customer.mobile.match(/^[0-9]{10}$/))
      return alert("Enter valid 10-digit mobile number");
    if (!customer.email.includes("@")) return alert("Enter valid email");

    if (billItems.length === 0) return alert("Add items to bill");

    setShowBill(true);
  };

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <Sidebar />

      <div className="flex-grow-1 p-4 overflow-auto">
        <h3 className="mb-4">Billing</h3>

        {/* CUSTOMER DETAILS */}
        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <h5 className="mb-3">Customer Details</h5>

            <div className="row g-3">
              <div className="col-md-4">
                <label>Name</label>
                <input
                  className="form-control"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                />
              </div>

              <div className="col-md-4">
                <label>Mobile</label>
                <input
                  className="form-control"
                  value={customer.mobile}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      mobile: e.target.value,
                    })
                  }
                />
              </div>

              <div className="col-md-4">
                <label>Email</label>
                <input
                  className="form-control"
                  value={customer.email}
                  onChange={(e) =>
                    setCustomer({
                      ...customer,
                      email: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card mb-4 shadow-sm">
          <div className="card-body">
            <div className="row g-3 align-items-end">
              <div className="col-md-4">
                <label>Product</label>
                <select
                  className="form-select"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                >
                  <option value="">Select Product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Stock: {p.stock})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-2">
                <label>Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              <div className="col-md-3">
                <button className="btn btn-primary w-100" onClick={addToBill}>
                  Add to Bill
                </button>
              </div>
            </div>
          </div>
        </div>

        {billItems.length > 0 && (
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {billItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>₹{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>₹{item.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="row mt-3">
                <div className="col-md-4">
                  <label>Discount (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={discount}
                    onChange={(e) => setDiscount(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="mt-4">
                <p>
                  <strong>Subtotal:</strong> ₹{subTotal}
                </p>
                <p>
                  <strong>Discount:</strong> ₹{discountAmount}
                </p>
                <h5>
                  <strong>Total:</strong> ₹{finalAmount}
                </h5>

                <button className="btn btn-success" onClick={generateBill}>
                  Generate Bill
                </button>
              </div>
            </div>
          </div>
        )}

        {showBill && (
          <div className="card shadow-sm">
            <div className="card-body">
              <h4>Digital Bill</h4>
              <p>
                <strong>Name:</strong> {customer.name}
              </p>
              <p>
                <strong>Mobile:</strong> {customer.mobile}
              </p>
              <p>
                <strong>Email:</strong> {customer.email}
              </p>

              <hr />

              {billItems.map((item, index) => (
                <p key={index}>
                  {item.name} × {item.quantity} = ₹{item.total}
                </p>
              ))}

              <hr />
              <h5>Total Payable: ₹{finalAmount}</h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Billing;
