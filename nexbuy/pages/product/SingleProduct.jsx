import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProductById } from "@/app/api/apiService";
import Link from "next/link";


const SingleProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const id = params ? params.id : null;
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const loadProduct = async () => {
      const local = JSON.parse(localStorage.getItem("products")) || [];
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

  const handleEdit = (id) => {
    router.push(`/edit-product/${id}`);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600 text-lg">
        Loading product...
      </div>
    );
  }

  const isLocal = product.id > 20;
  const outofstock = isLocal && product.stock <= 0;
  const fewstock = isLocal && product.stock <= 5 && product.stock >= 1;
  const discount = product.discount ? product.discount : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-white flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-8 md:p-12 transition-all duration-300 transform hover:scale-[1.01]">
        <h1 className="flex items-center justify-center text-4xl font-extrabold mb-4">
          View Product
        </h1>

        <Link
          href="/product"
          className="inline-flex items-center mb-6 text-sm font-semibold text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          ⬅️ Back to Product List
        </Link>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="relative bg-gray-100 p-6 rounded-xl shadow-inner flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 md:h-96 object-contain"
            />
            {outofstock && (
              <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
                Out of Stock
              </span>
            )}
            {fewstock && (
              <span className="absolute bottom-2 left-2 bg-amber-300 text-black text-xs font-bold px-2 py-1 rounded">
                Last {product.stock} piece left
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500 uppercase tracking-wide mt-1">
                {product.category}
              </p>
            </div>

            <p className="text-gray-700 text-base leading-relaxed">
              {product.description || "No description available."}
            </p>

            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col">
                {product.afterdiscountprice ? (
                  <>
                    <span className="text-sm text-gray-500 line-through">
                      Original Price ₹{product.price.toFixed(0)}
                    </span>
                    <span className="text-blue-400 font-extrabold text-lg">
                      Discount {discount}%
                    </span>
                    <span className="text-green-600 font-bold text-lg">
                      Final Price ₹{product.afterdiscountprice.toFixed(0)}
                    </span>
                  </>
                ) : (
                  <span className="text-green-600 font-bold text-lg">
                    ₹{(product.price * 83).toFixed(0)}
                  </span>
                )}
              </div>

              {product.rating && product.rating.rate ? (
                <div className="flex gap-4">
                  <div className="text-sm font-medium bg-yellow-200 text-yellow-800 px-3 py-1 rounded-md shadow-sm">
                    ⭐ {product.rating.rate}
                  </div>
                  <div className="text-sm font-medium bg-blue-200 text-yellow-800 px-3 py-1 rounded-md shadow-sm">
                    Reviews: {product.rating.count}
                  </div>
                </div>
              ) : (
                <div className="text-sm italic text-gray-400">No Rating</div>
              )}
            </div>

            {isLocal && (
              <div className="flex justify-center mt-8">
                 <button
                          onClick={() => handleEdit(product.id)}
                          className="bg-black hover:bg-yellow-500 text-white px-4 py-1.5 rounded-lg text-sm transition"
                        >
                          ✏️ Edit
                        </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
