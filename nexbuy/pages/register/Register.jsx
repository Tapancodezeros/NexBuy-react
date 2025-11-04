import React, { useEffect } from "react";
import { useFormik } from "formik";
import { signUpSchema } from "@/schemas/Signup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createNewUser } from "@/app/api/apiService";
import Link from "next/link";
import Image from "next/image";

const initialValues = {
  name: "",
  username: "",
  email: "",
  image: "",
  password: "",
  confirm_password: "",
};
const Register = () => {
  const router = useRouter();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
 initialValues,
 validationSchema: signUpSchema,
 onSubmit: async (values, action) => {
 try {
 const { name, username, email, image, password } = values;
 const [firstName, ...lastNameParts] = name.split(" ");
 const lastName = lastNameParts.join(" ");

        const userData = {
          firstName,
          lastName,
          username,
          email,
          image,
          password,
        };

        const res = await createNewUser(userData);
        toast.success("Registration successful!", { autoClose: 1000 });
        action.resetForm();
        router.push("/login");
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error(error.response?.data?.message || "Registration failed. Please try again.");
      }
    },

  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      toast.error("User already logged in");
      router.push("/");
    }
  }, [router]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center px-4 m">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">UserName</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                id="image"
                value={values.image}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-2 border ${
                  errors.image && touched.image ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && touched.image && (
                <p className="text-sm text-red-600 mt-1">{errors.image}</p>
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
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition duration-200"
            >
              Register
            </button>
            <p className="text-sm text-center text-gray-600 mt-3">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:block">
          <Image
            src="/image/Free.png"
            alt="Registration illustration"
            width={500}
            height={900}
            className="h-full w-full rounded-r-2xl "
          />
        </div>
      </div>
    </div>
  );
};

export default Register;