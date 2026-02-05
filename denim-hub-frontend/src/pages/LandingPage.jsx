import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="container-fluid theme-bg-primary min-vh-100 d-flex align-items-center justify-content-center">
      <div className="text-center theme-text-white">
        <h1 className="mb-4 brand-font">Denim Hub</h1>

        <img
          src="/Logo1.jpg"
          alt="Denim Hub Logo"
          width="120"
          className="mb-4"
        />

        <p
          className="theme-text-white-soft mb-5 px-3 mx-auto brand-font text-justify"
          style={{ maxWidth: "550px" }}
        >
          Denim Hub is a modern retail store specializing in high-quality denim
          wear, including jeans, shirts and T-shirts. The store focuses on
          maintaining accurate stock, smooth sales operations and reliable
          product availability for customers.
        </p>

        <Link to="/login" className="btn theme-btn-white px-4 py-2 fw-bold">
          Login
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
