import {
  Wallet,
  BarChart3,
} from "lucide-react";

const AuthLayout = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div
      className="
      h-screen
      overflow-hidden
      bg-gradient-to-br
      from-slate-950
      via-slate-900
      to-slate-950
      text-white
      flex
      items-center
      justify-center
      px-4
      py-4
    "
    >
      <div
        className="
        w-full
        max-w-7xl
        h-full
        max-h-[95vh]
        grid
        grid-cols-1
        lg:grid-cols-2
        bg-slate-900/80
        border
        border-slate-800
        rounded-3xl
        overflow-hidden
        shadow-2xl
        backdrop-blur-lg
      "
      >
        <div
          className="
          hidden
          lg:flex
          flex-col
          justify-center
          p-12
          bg-gradient-to-br
          from-green-500/20
          to-blue-500/10
          border-r
          border-slate-800
        "
        >
          <div
            className="
            flex
            items-center
            gap-4
            mb-8
          "
          >
            <div
              className="
              bg-green-500
              p-4
              rounded-2xl
            "
            >
              <Wallet
                size={38}
                className="
                text-black
              "
              />
            </div>

            <h1
              className="
              text-5xl
              font-bold
              leading-tight
            "
            >
              Finance
              Tracker
            </h1>
          </div>

          <p
            className="
            text-slate-300
            text-lg
            leading-relaxed
            mb-8
          "
          >
            Track your income,
            expenses, budgets,
            and financial insights
            in one modern finance
            dashboard.
          </p>

          <div
            className="
            flex
            items-center
            gap-4
            bg-slate-800/70
            p-5
            rounded-2xl
          "
          >
            <BarChart3
              className="
              text-green-400
            "
              size={34}
            />

            <div>
              <h3
                className="
                font-bold
                text-lg
              "
              >
                Smart Analytics
              </h3>

              <p
                className="
                text-slate-400
              "
              >
                Visualize spending
                trends and financial
                insights easily
              </p>
            </div>
          </div>
        </div>

        <div
          className="
          flex
          items-center
          justify-center
          p-6
          md:p-10
          overflow-y-auto
        "
        >
          <div
            className="
            w-full
            max-w-md
          "
          >
            <h2
              className="
              text-4xl
              font-bold
              mb-3
            "
            >
              {title}
            </h2>

            <p
              className="
              text-slate-400
              mb-6
            "
            >
              {subtitle}
            </p>

            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;