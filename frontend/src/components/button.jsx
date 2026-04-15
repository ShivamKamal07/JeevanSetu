function Button({
  text,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
  loading = false,
  customColor
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${!customColor ? `btn-${variant}` : ""} ${fullWidth ? "w-100" : ""}`}
      style={customColor ? { backgroundColor: customColor, color: "white", border: "none" } : {}}
      disabled={loading}
    >
      {loading ? "Loading..." : text}
    </button>
  );
}

export default Button;