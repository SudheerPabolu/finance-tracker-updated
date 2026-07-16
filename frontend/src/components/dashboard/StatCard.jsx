const StatCard = ({
  title,
  value,
  color,
  trend,
}) => {
  return (
    <div
      className="
      bg-white
      text-black
      dark:bg-slate-900
      dark:text-white
      p-6
      rounded-2xl
      border
      border-gray-300
      dark:border-slate-800
      transition-colors
      duration-300
      shadow-sm
    "
    >
      <p
        className="
        text-gray-500
        dark:text-slate-400
      "
      >
        {title}
      </p>

      <h2
        className={`
        text-3xl
        font-bold
        mt-3
        ${color}
      `}
      >
        {value}
      </h2>

      <p
        className="
        text-sm
        mt-3
        text-gray-500
        dark:text-slate-400
      "
      >
        {trend}
      </p>
    </div>
  );
};

export default StatCard;