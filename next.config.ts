import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: 'standalone',
  	images: {
		domains: [
			"img.youtube.com",
			"d3tohjtfj26dsg.cloudfront.net"
		],
	},
};

export default nextConfig;
