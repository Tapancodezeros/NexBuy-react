import React, { useEffect } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas/index";
import { useNavigate, Link } from "react-router-dom";
import userimg from "../../assets/images/Free.png";
import { toast } from "react-toastify";

const initialValues = {
  name: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      const { name, username, email, phone, password } = values;
      const newUser = { name, username, email, phone, password };

      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem("dummyUsers")) || [];

      // Check for duplicate username or email
      const isExistingUser = existingUsers.some(
        (user) => user.username === username || user.email === email
      );

      if (isExistingUser) {
        toast.error("Username or Email already exists", { autoClose: 1500 });
        return;
      }

      // Add new user to the list
      existingUsers.push(newUser);

      // Save back to localStorage
      localStorage.setItem("dummyUsers", JSON.stringify(existingUsers));

      toast.success("Registered successfully!", { autoClose: 1000 });
      action.resetForm();
      setTimeout(() => navigate("/login"), 1200);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      toast.error("User already logged in");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Register for <span className="text-blue-600">NexBuy</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border ${
                  errors.name && touched.name ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Your Name"
              />
              {errors.name && touched.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border ${
                  errors.username && touched.username ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="Your Username"
              />
              {errors.username && touched.username && (
                <p className="text-sm text-red-600 mt-1">{errors.username}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border ${
                  errors.email && touched.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="example@mail.com"
              />
              {errors.email && touched.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                onWheel={(e) => e.target.blur()}
                className={`w-full px-4 py-2 border ${
                  errors.phone && touched.phone ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="1234567890"
              />
              {errors.phone && touched.phone && (
                <p className="text-sm text-red-600 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="new-password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border ${
                  errors.password && touched.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="********"
              />
              {errors.password && touched.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                autoComplete="new-password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border ${
                  errors.confirm_password && touched.confirm_password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="********"
              />
              {errors.confirm_password && touched.confirm_password && (
                <p className="text-sm text-red-600 mt-1">{errors.confirm_password}</p>
              )}
            </div>

            <button
              type="submit"
              className="flex items-center justify-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 
            hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg 
            shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm p-4 py-2.5 text-center me-2 mb-2"
            >
              Register
            </button>

            <p className="text-sm text-center text-gray-600 mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:block">
          <img
            src={userimg}
            alt="Registration illustration"
            className="h-full w-full object-fill rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
