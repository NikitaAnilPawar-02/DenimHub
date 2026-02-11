import { useParams, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const productsData = [
  {
    id: 101,
    name: "Blue Denim Jeans",
    category: "Jeans",
    size: "32",
    price: 1999,
    stock: 12,
    description: "Premium quality denim jeans",
    image: "/products/jeans1.jpg",
  },
];

function ProductView() {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === Number(id));

  if (!product) return <div>Product not found</div>;

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <Sidebar />

      <div className="flex-grow-1 p-4 overflow-auto">
        <h3 className="mb-4">Product Details</h3>

        <div className="card p-4 shadow-sm" style={{ maxWidth: "600px" }}>
          <img
            src={product.image}
            alt={product.name}
            width="200"
            className="mb-3"
          />

          <p>
            <strong>ID:</strong> {product.id}
          </p>
          <p>
            <strong>Name:</strong> {product.name}
          </p>
          <p>
            <strong>Category:</strong> {product.category}
          </p>
          <p>
            <strong>Size:</strong> {product.size}
          </p>
          <p>
            <strong>Price:</strong> ₹{product.price}
          </p>
          <p>
            <strong>Stock:</strong> {product.stock}
          </p>
          <p>
            <strong>Description:</strong> {product.description}
          </p>

          <Link to="/products" className="btn btn-secondary mt-3">
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
