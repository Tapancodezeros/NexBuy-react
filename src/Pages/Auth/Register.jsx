import React from "react";
import { useFormik } from "formik";
import { signUpSchema } from "../../schemas/index";
import { useNavigate, Link } from "react-router-dom";
import userimg from "../../assets/images/Free.png";


const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Register = () => {
  const navigate = useNavigate();
  const {values, errors,touched,handleBlur,handleChange,handleSubmit,} = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      const { name, email, password } = values;
      const newUser = { username: name, email, password };
      localStorage.setItem("dummyUser", JSON.stringify(newUser));
      alert("Registered locally. Please login.");
      action.resetForm();
      navigate("/login");
    },
  });

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-200 to-white">
 
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full grid md:grid-cols-2">
        {/* Left Form */}
        <div className="p-8 md:p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Register for NexBuy
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your Name"
              />
              {errors.name && touched.name && (
                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="example@mail.com"
              />
              {errors.email && touched.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
              />
              {errors.password && touched.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
                onBlur={handleBlur}
                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="********"
              />
              {errors.confirm_password && touched.confirm_password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.confirm_password}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              Register
            </button>

            <p className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side Image */}
        <div className="hidden md:block">
          <img
            src={userimg}
            alt="Registration illustration"
            className="object-cover h-full w-full rounded-r-xl"
          />
        </div>
      </div>
    </div>

</div>

  );
};

export default Register;
