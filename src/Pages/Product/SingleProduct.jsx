import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { fetchProductById, fetchProducts } from "../../api/productService";


const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      // Check in localStorage first
      const local = JSON.parse(localStorage.getItem("localProducts")) || [];
      const localProduct = local.find((p) => String(p.id) === id);

      if (localProduct) {
        setProduct(localProduct);
      } else {
        try {
          const apiProduct = await fetchProductById(id);
          console.log("🚀 ~ loadProduct ~ apiProduct:", apiProduct)
          setProduct(apiProduct);
        } catch (err) {
          console.error("Product not found");
        }
      }
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center mt-10">Loading product...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-4xl mx-auto p-6 bg-white mt-10 rounded shadow">
        <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-48 w-full object-contain p-4 bg-gray-50"
                />
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-bold">{product.title}</h2>
            <p className="text-gray-600 capitalize">{product.category}</p>
            <p className="text-lg font-medium">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-600">₹{product.price*60}</span>
              {product.rating && (
                <span className="text-sm bg-yellow-100 px-2 py-1 rounded text-yellow-800">
                  ⭐ {product.rating.rate}
                </span>
              )}
            </div>
            <NavLink
              to="/product"
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-fit mx-80"
            >
              Back to Product List
            </NavLink>
          </div>
        </div>
      </div>
 
    </div>
  );
};

export default SingleProduct;
