import { useState } from "react";

import {
  Link,
} from "react-router-dom";

import {
  Mail,
  Lock,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  loginUser,
} from "../../services/authService";

import {
  useAuth,
} from "../../context/AuthContext";

import AuthLayout from "../../layouts/AuthLayout";

import {
  useNavigate,
} from "react-router-dom";

const Login = () => {
  const navigate =
  useNavigate();
  const { fetchCurrentUser } =
    useAuth();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        await loginUser(
          formData
        );

        await fetchCurrentUser();

        toast.success(
          "Login successful"
        );
        navigate("/");

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Login failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue managing your finances"
    >
      <form
        onSubmit={
          handleSubmit
        }
        className="
        space-y-6
      "
      >
        <div
          className="
          relative
        "
        >
          <Mail
            size={20}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-2xl
            py-4
            pl-12
            pr-4
            outline-none
            focus:border-green-500
            transition
          "
          />
        </div>

        <div
          className="
          relative
        "
        >
          <Lock
            size={20}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            className="
            w-full
            bg-slate-800
            border
            border-slate-700
            rounded-2xl
            py-4
            pl-12
            pr-4
            outline-none
            focus:border-green-500
            transition
          "
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="
          w-full
          bg-green-500
          hover:bg-green-600
          transition
          py-4
          rounded-2xl
          font-bold
          text-black
          text-lg
        "
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p
          className="
          text-center
          text-slate-400
        "
        >
          Don't have an
          account?{" "}

          <Link
            to="/register"
            className="
            text-green-400
            hover:underline
          "
          >
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;