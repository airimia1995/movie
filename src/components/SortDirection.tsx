import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const OrderDirection = ({
  sortDirection,
  onChange,
}: {
  sortDirection: "desc" | "asc";
  onChange: (type: "desc" | "asc") => void;
}) => {
  return (
    <div
      onClick={() => {
        onChange(sortDirection === "desc" ? "asc" : "desc");
      }}
      className="cursor-pointer"
    >
      <ChevronUpIcon
        className={`-mr-1 h-5 w-5 ${
          sortDirection === "asc" ? "bg-teal-500" : "text-gray-400"
        }`}
        aria-hidden="true"
      />
      <ChevronDownIcon
        className={`-mr-1 h-5 w-5 ${
          sortDirection === "desc" ? "bg-teal-500" : "text-gray-400"
        }`}
        aria-hidden="true"
      />
    </div>
  );
};

export default OrderDirection;
