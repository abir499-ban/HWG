
export const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Rejected":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    case "Pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case "Under Review":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "Document Required":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

