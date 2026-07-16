import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Link,
} from "react-router-dom";

import {
  User,
  Mail,
  Lock,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  registerUser,
} from "../../services/authService";

import AuthLayout from "../../layouts/AuthLayout";

const Register = () => {

  const navigate =
  useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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

      if (
        formData.password !==
        formData.confirmPassword
      ) {

        return toast.error(
          "Passwords do not match"
        );
      }

      try {

        setLoading(true);

        await registerUser({
          username:
            formData.username,
          email:
            formData.email,
          password:
            formData.password,
        });

        toast.success(
          "Registration successful"
        );
        navigate("/login");
      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
            "Registration failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start managing your finances smarter"
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
          <User
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
            type="text"
            name="username"
            placeholder="Username"
            value={
              formData.username
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
            name="confirmPassword"
            placeholder="Confirm Password"
            value={
              formData.confirmPassword
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
            ? "Creating..."
            : "Create Account"}
        </button>

        <p
          className="
          text-center
          text-slate-400
        "
        >
          Already have an
          account?{" "}

          <Link
            to="/login"
            className="
            text-green-400
            hover:underline
          "
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;