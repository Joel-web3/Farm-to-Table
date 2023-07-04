import { useState } from 'react';

export default function Home() {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [location, setLocation] = useState('');
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');

  const handleAddProduct = async () => {
    try {
      const response = await fetch('/api/TraceContract', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId,
          name: productName,
          farmer: farmerName,
          location: location,
        }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error(error);
      setMessage('Error adding product');
    }
  };

  const handleGetProduct = async () => {
    try {
      const response = await fetch(`/api/TraceContract?id=${productId}`);
      const data = await response.json();
      setProduct(data);
      setMessage('');
    } catch (error) {
      console.error(error);
      setMessage('Error retrieving product');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Trace Contract Frontend</h1>

      <div className="form-group">
        <label>Product ID:</label>
        <input type="text" value={productId} onChange={(e) => setProductId(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Product Name:</label>
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Farmer Name:</label>
        <input type="text" value={farmerName} onChange={(e) => setFarmerName(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div className="button-group">
        <button className="add-button" onClick={handleAddProduct}>Add Product</button>
        <button className="get-button" onClick={handleGetProduct}>Get Product</button>
      </div>

      {message && <p className="message">{message}</p>}

      {product && (
        <div className="product-details">
          <h2>Product Details</h2>
          <p>Name: {product.name}</p>
          <p>Farmer: {product.farmer}</p>
          <p>Location: {product.location}</p>
          <p>Timestamp: {product.timestamp}</p>
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f7f7f7;
        }

        .title {
          font-size: 24px;
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .form-group {
          margin-bottom: 10px;
        }

        label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }

        input {
          width: 100%;
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        .button-group {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .add-button,
        .get-button {
          padding: 8px 16px;
          font-size: 16px;
          border-radius: 4px;
          color: #fff;
          background-color: #007bff;
          border: none;
          cursor: pointer;
        }

        .add-button:hover,
        .get-button:hover {
          background-color: #0056b3;
        }

        .message {
          font-weight: bold;
          margin-bottom: 10px;
        }

        .product-details {
          margin-top: 20px;
          background-color: #fff;
          border-radius: 4px;
          padding: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .product-details h2 {
          font-size: 20px;
          margin-bottom: 10px;
        }

        .product-details p {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
}
