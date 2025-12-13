import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const Product = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const context = useOutletContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Submitted:", { productName, price, description });
    console.log("Context Data:", context);
  };

  return (
    <div>
      <h1>Product Page</h1>
      <p>This is the Product Page.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="productName">Product Name: </label>
          <input
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="price">Price: </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit">Submit Product</button>
      </form>
    </div>
  );
};

export default Product;
