export const formatDate = () => {
  const date = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    day: "numeric",
    month: "short",
  };
  return date.toLocaleString("en-US", options).replace(",", "");
};
