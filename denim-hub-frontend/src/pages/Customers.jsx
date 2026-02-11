import Sidebar from "../components/Sidebar";
import { FaSearch, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const customersData = [
  {
    id: 201,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    mobile: "9876543210",
  },
  {
    id: 202,
    name: "Sneha Patil",
    email: "sneha@gmail.com",
    mobile: "9123456780",
  },
];

function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [searchTerm, setSearchTerm] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);

  const navigate = useNavigate();

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setCustomers(customers.filter((c) => c.id !== deleteId));
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleEditClick = (customer) => {
    setEditCustomer({ ...customer });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCustomer({ ...editCustomer, [name]: value });
  };

  const saveEdit = () => {
    setCustomers(
      customers.map((c) => (c.id === editCustomer.id ? editCustomer : c)),
    );
    setShowEditModal(false);
    setEditCustomer(null);
  };

  const cancelEdit = () => {
    setShowEditModal(false);
    setEditCustomer(null);
  };

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <Sidebar />

      <div className="flex-grow-1 p-4 overflow-auto">
        <h3 className="mb-4">Customers</h3>

        <div className="input-group mb-3" style={{ maxWidth: "400px" }}>
          <span className="input-group-text">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="card shadow-sm">
          <div className="card-body p-0">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.mobile}</td>
                    <td className="text-center">
                      <FaEye
                        className="text-primary me-3 cursor-pointer"
                        onClick={() =>
                          navigate(`/customers/view/${customer.id}`)
                        }
                      />
                      <FaEdit
                        className="text-warning me-3 cursor-pointer"
                        onClick={() => handleEditClick(customer)}
                      />
                      <FaTrash
                        className="text-danger cursor-pointer"
                        onClick={() => handleDeleteClick(customer.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showEditModal && editCustomer && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Edit Customer</h5>
                  <button className="btn-close" onClick={cancelEdit}></button>
                </div>

                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label>Name</label>
                      <input
                        className="form-control"
                        name="name"
                        value={editCustomer.name}
                        onChange={handleEditChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label>Email</label>
                      <input
                        className="form-control"
                        name="email"
                        value={editCustomer.email}
                        onChange={handleEditChange}
                      />
                    </div>

                    <div className="col-md-6">
                      <label>Mobile</label>
                      <input
                        className="form-control"
                        name="mobile"
                        value={editCustomer.mobile}
                        onChange={handleEditChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={cancelEdit}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={saveEdit}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {showDeleteModal && (
        <>
          <div className="modal fade show d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5>Confirm Delete</h5>
                  <button className="btn-close" onClick={cancelDelete}></button>
                </div>
                <div className="modal-body">
                  Are you sure you want to delete this customer?
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={cancelDelete}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={confirmDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
}

export default Customers;
