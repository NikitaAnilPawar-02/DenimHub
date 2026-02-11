import { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  FaFileInvoice,
  FaRupeeSign,
  FaEye,
  FaPrint,
  FaCalendarAlt,
} from "react-icons/fa";

function BillsReport() {
  const [bills] = useState([
    {
      id: 1,
      billNo: "DH-1001",
      date: "2026-02-08",
      customer: "Walk-in",
      items: 3,
      subTotal: 4800,
      discount: 200,
      tax: 0,
      grandTotal: 4600,
      paymentMode: "Cash",
    },
    {
      id: 2,
      billNo: "DH-1002",
      date: "2026-02-09",
      customer: "Rahul Sharma",
      items: 2,
      subTotal: 3600,
      discount: 100,
      tax: 0,
      grandTotal: 3500,
      paymentMode: "UPI",
    },
    {
      id: 3,
      billNo: "DH-1003",
      date: "2026-02-10",
      customer: "Sneha Patil",
      items: 1,
      subTotal: 2000,
      discount: 0,
      tax: 0,
      grandTotal: 2000,
      paymentMode: "Card",
    },
  ]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredBills = bills.filter((bill) => {
    if (!fromDate && !toDate) return true;

    const billDate = new Date(bill.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    if (from && billDate < from) return false;
    if (to && billDate > to) return false;

    return true;
  });

  const totalAmount = filteredBills.reduce(
    (sum, bill) => sum + bill.grandTotal,
    0,
  );

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <Sidebar />

      <div className="flex-grow-1 p-4 overflow-auto">
        <h3 className="mb-4">Bills Report</h3>

        {/* FILTER */}
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

        {/* SUMMARY */}
        <div className="row g-3 mb-4">
          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <FaFileInvoice size={28} className="text-primary mb-2" />
              <h6>Total Bills</h6>
              <h4>{filteredBills.length}</h4>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <FaRupeeSign size={28} className="text-success mb-2" />
              <h6>Total Billed Amount</h6>
              <h4>₹ {totalAmount}</h4>
            </div>
          </div>
        </div>

        <div className="card p-4 shadow-sm">
          <h5 className="mb-3">Bill Details</h5>

          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Bill No</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Discount</th>
                <th>Grand Total (₹)</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredBills.map((bill, index) => (
                <tr key={bill.id}>
                  <td>{index + 1}</td>
                  <td>{bill.billNo}</td>
                  <td>{bill.date}</td>
                  <td>{bill.customer}</td>
                  <td>{bill.items}</td>
                  <td>₹ {bill.discount}</td>
                  <td className="fw-bold">{bill.grandTotal}</td>
                  <td>{bill.paymentMode}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">
                      <FaEye /> View
                    </button>
                    <button className="btn btn-sm btn-outline-secondary">
                      <FaPrint /> Print
                    </button>
                  </td>
                </tr>
              ))}

              {filteredBills.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center py-4">
                    No bills found
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

export default BillsReport;
