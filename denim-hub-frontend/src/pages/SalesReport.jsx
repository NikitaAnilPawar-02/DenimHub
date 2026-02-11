import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FaRupeeSign, FaShoppingCart, FaCalendarAlt } from "react-icons/fa";

function SalesReport() {
  const [sales] = useState([
    {
      id: 1,
      billNo: "BILL001",
      date: "2026-02-08",
      customer: "Walk-in",
      items: 3,
      totalAmount: 4597,
      paymentMode: "Cash",
    },
    {
      id: 2,
      billNo: "BILL002",
      date: "2026-02-09",
      customer: "Rahul Sharma",
      items: 2,
      totalAmount: 3498,
      paymentMode: "UPI",
    },
    {
      id: 3,
      billNo: "BILL003",
      date: "2026-02-10",
      customer: "Sneha Patil",
      items: 1,
      totalAmount: 1999,
      paymentMode: "Card",
    },
  ]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredSales = sales.filter((sale) => {
    if (!fromDate && !toDate) return true;

    const saleDate = new Date(sale.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    if (from && saleDate < from) return false;
    if (to && saleDate > to) return false;

    return true;
  });

  const totalRevenue = filteredSales.reduce(
    (sum, sale) => sum + sale.totalAmount,
    0,
  );

  const totalBills = filteredSales.length;

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <Sidebar />

      <div className="flex-grow-1 p-4 overflow-auto">
        <h3 className="mb-4">Sales Report</h3>

        <div className="card p-3 mb-4 shadow-sm">
          <div className="row align-items-end">
            <div className="col-md-3">
              <label className="form-label">
                <FaCalendarAlt className="me-2" />
                From Date
              </label>
              <input
                type="date"
                className="form-control"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">
                <FaCalendarAlt className="me-2" />
                To Date
              </label>
              <input
                type="date"
                className="form-control"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <FaRupeeSign size={28} className="text-success mb-2" />
              <h6>Total Revenue</h6>
              <h4>₹ {totalRevenue}</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <FaShoppingCart size={28} className="text-primary mb-2" />
              <h6>Total Bills</h6>
              <h4>{totalBills}</h4>
            </div>
          </div>
        </div>

        <div className="card p-4 shadow-sm">
          <h5 className="mb-3">Sales Details</h5>

          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Bill No</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total Amount (₹)</th>
                <th>Payment Mode</th>
              </tr>
            </thead>

            <tbody>
              {filteredSales.map((sale, index) => (
                <tr key={sale.id}>
                  <td>{index + 1}</td>
                  <td>{sale.billNo}</td>
                  <td>{sale.date}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.items}</td>
                  <td className="fw-bold">{sale.totalAmount}</td>
                  <td>{sale.paymentMode}</td>
                </tr>
              ))}

              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No sales data available
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

export default SalesReport;
