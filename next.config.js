/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compilerOptions: {
    target: "ES2020",
    module: "ESNext",
    moduleResolution: "NodeNext",
    jsx: "react-jsx",
    baseUrl: "./",
    resolveJsonModule: true,
    esModuleInterop: true,
  },
};

module.exports = nextConfig;
