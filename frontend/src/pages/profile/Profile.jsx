import DashboardLayout from "../../components/layout/DashboardLayout";

import {
  useAuth,
} from "../../context/AuthContext";

import api from "../../services/api";

import toast from "react-hot-toast";

import { useState } from "react";

const Profile = () => {

  const { user } =
    useAuth();

  const [loading, setLoading] =
    useState(false);

  const handleImageChange =
    async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      try {

        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "profileImage",
          file
        );

        const response =
          await api.post(
            "/auth/upload-profile",
            formData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        user.profileImage =
          response.data.data;

        toast.success(
          "Profile updated"
        );

        window.location.reload();

      } catch (error) {

        toast.error(
          "Upload failed"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <DashboardLayout>
      <div
        className="
        h-[calc(100vh-110px)]
        flex
        items-center
        justify-center
      "
      >
        <div
          className="
          w-full
          h-full
          bg-slate-900
          border
          border-slate-800
          rounded-3xl
          p-6
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-10
          overflow-hidden
        "
        >
          <div
            className="
            flex
            flex-col
            items-center
            justify-center
          "
          >
            <label
              className="
              relative
              cursor-pointer
              group
            "
            >
              {user?.profileImage ? (

                <img
                  src={`http://localhost:5000${user.profileImage}`}
                  alt="Profile"
                  className="
                  w-52
                  h-52
                  rounded-full
                  object-cover
                  border-4
                  border-green-400
                "
                />

              ) : (

                <div
                  className="
                  w-52
                  h-52
                  rounded-full
                  bg-green-500
                  flex
                  items-center
                  justify-center
                  text-7xl
                  font-bold
                  text-black
                "
                >
                  {user?.username
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>
              )}

              <div
                className="
                absolute
                inset-0
                bg-black/50
                rounded-full
                opacity-0
                group-hover:opacity-100
                transition
                flex
                items-center
                justify-center
                text-white
                font-semibold
                text-lg
              "
              >
                {loading
                  ? "Uploading..."
                  : "Change Photo"}
              </div>

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={
                  handleImageChange
                }
              />
            </label>
          </div>

          <div
            className="
            flex
            flex-col
            justify-center
            gap-5
          "
          >
            <div
              className="
              bg-slate-800
              rounded-2xl
              p-5
            "
            >
              <p
                className="
                text-slate-400
                mb-2
              "
              >
                Username
              </p>

              <h2
                className="
                text-3xl
                font-bold
              "
              >
                {user?.username}
              </h2>
            </div>

            <div
              className="
              bg-slate-800
              rounded-2xl
              p-5
            "
            >
              <p
                className="
                text-slate-400
                mb-2
              "
              >
                Email
              </p>

              <h2
                className="
                text-xl
                font-semibold
                break-all
              "
              >
                {user?.email}
              </h2>
            </div>

            <div
              className="
              bg-slate-800
              rounded-2xl
              p-5
            "
            >
              <p
                className="
                text-slate-400
                mb-2
              "
              >
                Joined
              </p>

              <h2
                className="
                text-xl
                font-semibold
              "
              >
                {new Date(
                  user?.createdAt
                ).toLocaleDateString()}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;