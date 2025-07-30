import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { fetchProductById } from "../../api/apiService";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const loadProduct = async () => {
      const local = JSON.parse(localStorage.getItem("Products")) || [];
      const localProduct = local.find((p) => String(p.id) === id);

      if (localProduct) {
        setProduct(localProduct);
      } else {
        try {
          const apiProduct = await fetchProductById(id);
          setProduct(apiProduct);
        } catch (err) {
          console.error("Product not found");
        }
      }
    };

    loadProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600 text-lg">
        Loading product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-10">
        <NavLink
          to="/product"
          className="inline-flex items-center mb-6 text-sm font-semibold text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
           Back to Product List
        </NavLink>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Product Image */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{product.title}</h2>
              <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">{product.category}</p>
            </div>

            <p className="text-gray-700 text-base leading-relaxed">{product.description}</p>

            <div className="flex items-center justify-between mt-2">
              <span className="text-3xl font-extrabold text-green-600">
                ₹{(product.price * 83).toFixed(2)}
              </span>
              {product.rating && (
                <div className="text-sm font-medium bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md shadow-sm">
                  ⭐ {product.rating.rate} / {product.rating.count}
                </div>
              )}
            </div>  
          </div>
        </div>
      </div>
      </div>
    
  );
};

export default SingleProduct;
