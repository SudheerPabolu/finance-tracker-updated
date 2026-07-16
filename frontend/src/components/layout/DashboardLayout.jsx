import { useState } from "react";

import Sidebar from "./Sidebar";

import Navbar from "./Navbar";

const DashboardLayout = ({
  children,
}) => {
  const [
    collapsed,
    setCollapsed,
  ] = useState(false);

  return (
    <div
      className="
      h-screen
      flex
      bg-slate-950
      text-white
      overflow-hidden
    "
    >
      <div
        className="
        fixed
        top-0
        left-0
        h-screen
        z-40
      "
      >
        <Sidebar
          collapsed={
            collapsed
          }
          setCollapsed={
            setCollapsed
          }
        />
      </div>

      <div
        className={`
        flex-1
        flex
        flex-col
        overflow-y-auto
        transition-all
        duration-300
        ${
          collapsed
            ? "ml-20"
            : "ml-64"
        }
      `}
      >
        <Navbar />

        <div className="p-6">
          <main>
            {children}
          </main>
        </div>
      </div>
    </div>
  ); 
};

export default DashboardLayout;