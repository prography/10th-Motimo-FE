import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Webpack configuration for SVG handling (production builds)
  webpack: (config) => {
    // Find the existing rule that handles SVG
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // Modify the file loader rule to ignore *.svg
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
  rewrites:
    process.env.NODE_ENV === "development"
      ? async () => {
          // Check if we should use local API server
          const useLocalApi = process.env.USE_LOCAL_API === "true";
          const apiDestination = useLocalApi
            ? "http://localhost:8080/v1/:path*"
            : "http://motimo.kro.kr:8080/v1/:path*";

          return [
            {
              source: "/v1/:path*",
              destination: apiDestination,
            },
          ];
        }
      : undefined,
};

export default nextConfig;
