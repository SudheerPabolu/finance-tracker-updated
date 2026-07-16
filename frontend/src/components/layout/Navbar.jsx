import { useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  logoutUser,
} from "../../services/authService";

import toast from "react-hot-toast";

const Navbar = () => {
  const { user } =
    useAuth();

  const navigate =
    useNavigate();

  const [open, setOpen] =
    useState(false);

  const handleLogout =
    async () => {
      try {
        await logoutUser();

        toast.success(
          "Logged out successfully"
        );

        navigate(
          "/login"
        );

        window.location.reload();
      } catch (error) {
        toast.error(
          "Logout failed"
        );
      }
    };

  return (
    <div
      className="
      flex
      items-center
      justify-between
      px-6
      py-5
      bg-slate-900
      border-b
      border-slate-800
      sticky
      top-0
      z-30
    "
    >
      <h1
        className="
        text-3xl
        font-bold
      "
      >
        Finance Tracker
      </h1>

      <div className="relative">
        <button
          onClick={() =>
            setOpen(!open)
          }
          className="
          focus:outline-none
        "
        >
          {user?.profileImage ? (
            <img
              src={`${import.meta.env.VITE_API_URL.replace("/api/v1", "")}${user.profileImage}`}
              alt="Profile"
              className="
              w-12
              h-12
              rounded-full
              object-cover
              border-2
              border-green-400
            "
            />
          ) : (
            <div
              className="
              w-12
              h-12
              rounded-full
              bg-green-500
              flex
              items-center
              justify-center
              text-lg
              font-bold
              text-black
            "
            >
              {user?.username
                ?.charAt(0)
                ?.toUpperCase()}
            </div>
          )}
        </button>

        {open && (
          <div
            className="
            absolute
            right-0
            mt-4
            w-72
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            shadow-2xl
            p-5
          "
          >
            <div
              className="
              flex
              items-center
              gap-4
              mb-5
            "
            >
              {user?.profileImage ? (
                <img
                  src={`${import.meta.env.VITE_API_URL.replace("/api/v1", "")}${user.profileImage}`}
                  alt="Profile"
                  className="
                  w-16
                  h-16
                  rounded-full
                  object-cover
                  border-2
                  border-green-400
                "
                />
              ) : (
                <div
                  className="
                  w-16
                  h-16
                  rounded-full
                  bg-green-500
                  flex
                  items-center
                  justify-center
                  text-2xl
                  font-bold
                  text-black
                "
                >
                  {user?.username
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>
              )}

              <div>
                <h2
                  className="
                  text-lg
                  font-bold
                "
                >
                  {user?.username}
                </h2>

                <p
                  className="
                  text-slate-400
                  text-sm
                  break-all
                "
                >
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                navigate(
                  "/profile"
                );

                setOpen(false);
              }}
              className="
              w-full
              bg-slate-800
              hover:bg-slate-700
              transition
              py-3
              rounded-xl
              font-semibold
              mb-3
            "
            >
              View Profile
            </button>

            <button
              onClick={
                handleLogout
              }
              className="
              w-full
              bg-red-500
              hover:bg-red-600
              transition
              py-3
              rounded-xl
              font-semibold
            "
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;