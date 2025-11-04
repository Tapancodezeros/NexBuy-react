import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createProduct, fetchCategories } from "@/app/api/apiService";
import { FaTag, FaDollarSign, FaPercent, FaInfoCircle, FaImage, FaBoxes, FaPlusCircle, FaArrowLeft, FaCheck } from "react-icons/fa";

const InputField = ({ label, name, value, onChange, icon, ...props }) => (
  <div>
    <label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center mb-1">
      {icon} <span className="ml-2 font-semibold">{label}</span>
    </label>
    <div className="relative">
      <input
        id={name} name={name} value={value} onChange={onChange}
        className="w-full p-3 pl-4 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150"
        {...props}
      />
      {name === 'afterdiscountprice' && (
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
      )}
    </div>
  </div>
);

const TextareaField = ({ label, name, value, onChange, icon, ...props }) => (
  <div>
    <label htmlFor={name} className="text-sm font-medium text-gray-700 flex items-center mb-1">
      {icon} <span className="ml-2 font-semibold">{label}</span>
    </label>
    <textarea
      id={name} name={name} value={value} onChange={onChange} rows="3"
      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150"
      {...props}
    />
  </div>
);

const fetchShopDetails = async (shopIds) => {
    return shopIds.map(id => ({
        id: id,
        name: `Shop Name for ID: ${id}`,
    }));
};

const AddProduct = () => {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [userShops, setUserShops] = useState([]);

  const [product, setProduct] = useState({
    title: "",
    price: "",
    discount: "5",
    afterdiscountprice: "",
    description: "",
    image: "",
    category: "",
    stock: "10",
    shopId: "",
  });

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const fetchedCategories = await fetchCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        toast.error("Failed to load categories.");
      }
    };
    loadCategories();

    const loadUserShops = async () => {
      const shopIdsString = localStorage.getItem("userShopIds");
      if (shopIdsString) {
        try {
          const shopIds = JSON.parse(shopIdsString);
          
          if (Array.isArray(shopIds) && shopIds.length > 0) {
              const fullShops = await fetchShopDetails(shopIds); 
              setUserShops(fullShops);
          } else {
              setUserShops([]);
          }
        } catch (error) {
          console.error("Failed to parse user shop IDs from localStorage:", error);
          toast.error("Failed to load your shops.");
        }
      }
    };
    loadUserShops();
  }, []);

  useEffect(() => {
    if (userShops.length > 0) {
      const defaultShopId = localStorage.getItem("defaultShopId");
      
      if (defaultShopId) {
        const isValidShopId = userShops.some(shop => shop.id === defaultShopId);

        if (isValidShopId) {
          setProduct((prev) => ({ 
            ...prev, 
            shopId: defaultShopId 
          }));
        } else {
          console.warn("Shop ID from localStorage is stale/invalid. Clearing default.");
          localStorage.removeItem("defaultShopId"); 
        }
      }
    }
  }, [userShops]);

  useEffect(() => {
    const price = parseFloat(product.price);
    const discount = parseFloat(product.discount);

    if (!isNaN(price) && !isNaN(discount)) {
      if (discount > 100 || discount < 0) {
        toast.warn("Discount must be between 0% and 100%");
        setProduct((prev) => ({ ...prev, discount: "5" }));
      } else {
        const discountedPrice = price - (price * discount) / 100;
        setProduct((prev) => ({
          ...prev,
          afterdiscountprice: discountedPrice.toFixed(2),
        }));
      }
    } else {
      setProduct((prev) => ({ ...prev, afterdiscountprice: "" }));
    }
  }, [product.price, product.discount]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "discount") {
      const discountValue = parseFloat(value);
      if (!isNaN(discountValue) && (discountValue > 100 || discountValue < 0)) {
        toast.warn("Discount must be between 0 and 100.");
        return;
      }
    }
    
    setProduct((prev) => ({ ...prev, [name]: value }));
    
    if (name === "shopId" && value) {
      localStorage.setItem("defaultShopId", value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newProduct = {
        ...product,
        price: parseFloat(product.price),
        discount: parseFloat(product.discount),
        afterdiscountprice: parseFloat(product.afterdiscountprice),
        stock: parseInt(product.stock),
        shopId: product.shopId,
        rating: {
          rate: (Math.random() * 5).toFixed(1),
          count: Math.floor(Math.random() * 500) + 1,
        },
      };

      if (newCategory) {
        newProduct.category = newCategory;
      }


      await createProduct(newProduct);

      toast.success("Product added successfully!");
      setProduct({
        title: "", price: "", discount: "5", afterdiscountprice: "",
        description: "", image: "", category: "", stock: "10", shopId: ""
      });
      setNewCategory("");
      setTimeout(() => router.push("/product"), 1000);

    } catch (err) {
      console.error("Add product failed:", err);
      toast.error(err.response?.data?.message || "Failed to add product.");
    }
  };

  const handleNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-3xl p-8 transform transition-all hover:shadow-4xl border border-gray-100">
        
        <div className="mb-8 text-center border-b pb-4">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center justify-center">
            <FaPlusCircle className="mr-3 text-indigo-600" />
            Add New Product
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Enter the details for your new local product listing.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <InputField
            type="text" name="title" label="Product Title" icon={<FaInfoCircle />}
            value={product.title} onChange={handleChange} required
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <InputField
              type="number" name="price" label="Original Price (₹)" icon={<FaDollarSign />}
              value={product.price} onChange={handleChange} required min="0.01" step="0.01"
            />
            
            <InputField
              type="number" name="discount" label="Discount (%)" icon={<FaPercent />}
              value={product.discount} onChange={handleChange}  min="0" max="100"
            />
            
            <div>
              <label className=" text-sm font-medium text-gray-700 flex items-center mb-1">
                <FaCheck className="mr-2 text-green-600" /> Final Price
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="afterdiscountprice"
                  value={product.afterdiscountprice ? `₹${product.afterdiscountprice}` : ''}
                  readOnly
                  placeholder="Calculated Price"
                  className="w-full p-3 border border-gray-300 rounded-lg bg-green-50 text-green-800 font-bold focus:outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          <TextareaField
            name="description" label="Product Description" icon={<FaInfoCircle />}
            value={product.description} onChange={handleChange} required
          />
          
          <InputField
            type="text" name="image" label="Image URL" icon={<FaImage />}
            value={product.image} onChange={handleChange} required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
                <FaTag className="mr-2" /> Category
              </label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity50 appearance-none bg-white"
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
                  </option>
                ))}
                <option value="new">Add New Category</option>
              </select>
            </div>

            {product.category === "new" && (
              <InputField
                type="text"
                name="newCategory"
                label="New Category Name"
                icon={<FaTag />}
                value={newCategory}
                onChange={handleNewCategoryChange}
                required
              />
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center mb-1">
              </label>
              <select
                name="shopId"
                value={product.shopId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 appearance-none bg-white"
                required
                disabled={userShops.length === 0}
              >
                <option value="" disabled>{userShops.length > 0 ? "Select Shop" : "No shops found"}</option>
                {userShops.map((shop) => (
                <option key={shop.id} value={shop.id}>
                  {shop.name}
                </option>
                ))}
              </select>
            </div>

            <InputField
              type="number" name="stock" label="Stock Quantity" icon={<FaBoxes />}
              value={product.stock} onChange={handleChange} required min="0"
            />
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-[1.01] mt-8"
          >
            <FaPlusCircle className="mr-2 mt-0.5" /> Create Product Listing
          </button>
        </form>

        <div className="mt-6 flex justify-center">
          <Link href="/product" passHref>
            <button className="flex items-center text-sm font-medium text-gray-600 hover:text-red-600 transition">
              <FaArrowLeft className="mr-2" />
              Go back without saving
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AddProduct;