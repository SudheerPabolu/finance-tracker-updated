import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Wallet,
  User,
  Menu,
} from "lucide-react";

const Sidebar = ({
  collapsed,
  setCollapsed,
}) => {
  const location =
    useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon:
        LayoutDashboard,
    },

    {
      name: "Transactions",
      path:
        "/transactions",
      icon: Receipt,
    },

    {
      name: "Analytics",
      path:
        "/analytics",
      icon: PieChart,
    },

    {
      name: "Budgets",
      path:
        "/budgets",
      icon: Wallet,
    },

    {
      name: "Profile",
      path:
        "/profile",
      icon: User,
    },
  ];

  return (
    <aside
      className={`
      ${
        collapsed
          ? "w-20"
          : "w-64"
      }
      min-h-screen
      bg-slate-900
      text-white
      border-r
      border-slate-800
      py-6
      px-3
      transition-all
      duration-300
      overflow-hidden
    `}
    >
      <div
        className="
        flex
        items-center
        justify-between
        mb-10
      "
      >
        {!collapsed && (
          <h1
            className="
            text-3xl
            font-bold
          "
          >
            Finance
          </h1>
        )}

        <button
          onClick={() =>
            setCollapsed(
              !collapsed
            )
          }
          className="
          bg-slate-800
          hover:bg-slate-700
          transition
          p-2
          rounded-xl
        "
        >
          <Menu size={22} />
        </button>
      </div>

      <nav className="space-y-3">
        {navItems.map(
          (item) => {
            const Icon =
              item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                flex
                items-center
                ${
                  collapsed
                    ? "justify-center"
                    : "gap-3"
                }
                px-4
                py-3
                rounded-xl
                transition
                font-semibold
                ${
                  location.pathname ===
                  item.path
                    ? "bg-green-500 text-black"
                    : "hover:bg-slate-800"
                }
              `}
              >
                <Icon size={22} />

                {!collapsed && (
                  <span>
                    {item.name}
                  </span>
                )}
              </Link>
            );
          }
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;