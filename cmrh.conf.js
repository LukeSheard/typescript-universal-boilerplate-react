module.exports = {
  generateScopedName:
    process.env.NODE_ENV === "production"
      ? "[hash:base64:5]"
      : "[name]__[local]___[hash:base64:5]"
};
