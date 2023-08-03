export default {
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY ?? "default_key",
  IMAGEKIT_ENDPOINT: process.env.IMAGEKIT_ENDPOINT ?? "",
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY ?? "",
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY ?? "",
};
