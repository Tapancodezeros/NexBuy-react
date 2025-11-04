import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProductById } from "@/app/api/apiService";
import Link from "next/link";
import { FaArrowLeft, FaTag, FaBoxes, FaPencilAlt, FaStar, FaWarehouse } from "react-icons/fa";

const SingleProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const id = params ? String(params.id) : null; 
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      try {
        const apiProduct = await fetchProductById(id);
        
        const convertedProduct = {
          ...apiProduct,
          price: apiProduct.price, 
          displayPrice: (apiProduct.price * 83).toFixed(0) 
        };
        setProduct(convertedProduct);
        
      } catch (err) {
        console.error("Product not found or API error:", err);
        setProduct(false); 
      }
    };
    
    loadProduct();
  }, [id]);

  const handleEdit = (productId) => {
    router.push(`/edit-product/${productId}`);
  };

  if (product === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-600 text-xl font-semibold p-8">
        <h2 className="text-3xl text-red-500 mb-4">Product Not Found 😔</h2>
        <Link
          href="/product"
          className="flex items-center text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition mt-4"
        >
          <FaArrowLeft className="mr-2" />
          Go back to Product List
        </Link>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-600 text-xl font-semibold">
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading product details...
      </div>
    );
  }

  const stock = product.stock || 99; 
  const outofstock = stock <= 0;
  const fewstock = stock <= 5 && stock >= 1;
  const discount = product.discount ? product.discount : null;
  
  const finalPrice = product.afterdiscountprice 
    ? Number(product.afterdiscountprice).toFixed(0) 
    : (product.displayPrice || (Number(product.price) * 83).toFixed(0));

  const originalPrice = product.price 
    ? Number(product.price).toFixed(0) 
    : null;
  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-3xl overflow-hidden border border-gray-100">        
        <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center bg-indigo-50">
          <Link
            href="/product"
            className="flex items-center text-sm font-semibold text-indigo-700 hover:text-indigo-900 transition"
          >
            <FaArrowLeft className="mr-2" />
            Back to Product List
          </Link>
          <h1 className="text-3xl font-extrabold text-gray-800 hidden md:block">Product Detail View</h1>
          <button
            onClick={() => handleEdit(id)}
            className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md"
          >
            <FaPencilAlt className="mr-2" /> Edit Product
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 p-8 md:p-12">
          
          <div className="relative bg-gray-100 p-8 rounded-2xl shadow-lg flex items-center justify-center border border-gray-200">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 lg:h-full max-h-[500px] object-contain transition-transform duration-500 hover:scale-[1.05]"
            />
            {outofstock && (
              <span className="absolute top-4 right-4 bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg transform rotate-2">
                OUT OF STOCK
              </span>
            )}
            {fewstock && (
              <span className="absolute bottom-4 left-4 bg-amber-400 text-gray-900 text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                <FaWarehouse className="inline mr-1" /> Only {stock} Left!
              </span>
            )}
          </div>

          <div className="flex flex-col gap-6">

            <div>
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-widest flex items-center">
                <FaTag className="mr-2" /> {product.category}
              </p>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mt-2 leading-tight">
                {product.title}
              </h2>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-xl border border-indigo-100">
              <div className="flex items-end justify-between">
                
                <div className="flex flex-col">
                  {product.afterdiscountprice && originalPrice ? (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ₹{originalPrice}
                      </span>
                      <span className="text-4xl font-extrabold text-green-600">
                        ₹{finalPrice}
                      </span>
                      <span className="text-lg font-bold text-indigo-500 mt-1 flex items-center">
                        <FaTag className="mr-1" /> Save {discount}%
                      </span>
                    </>
                  ) : (
                    <span className="text-4xl font-extrabold text-gray-800">
                      ₹{finalPrice}
                    </span>
                  )}
                </div>

                <div className={`flex items-center text-sm font-bold px-3 py-1 rounded-full ${outofstock ? 'bg-red-100 text-red-700' : (fewstock ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700')}`}>
                  <FaBoxes className="mr-1" />
                  {outofstock ? 'Unavailable' : `${stock} In Stock`}
                </div>
                
              </div>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mt-4">Product Details</h3>
            <p className="text-gray-700 text-base leading-relaxed">
              {product.description || "No detailed description available for this item."}
            </p>

            {product.rating && product.rating.rate ? (
              <div className="flex items-center gap-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex items-center text-2xl font-bold text-yellow-600">
                  <FaStar className="mr-2 text-yellow-400" />
                  {product.rating.rate} / 5
                </div>
                <div className="text-sm text-gray-600">
                  Based on **{product.rating.count}** reviews.
                </div>
              </div>
            ) : (
              <div className="text-sm italic text-gray-400 p-2 border-l-4 border-gray-300">
                No customer ratings available yet.
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;