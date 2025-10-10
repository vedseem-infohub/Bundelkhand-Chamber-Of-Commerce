/** @type {import('next').NextConfig} */
module.exports = {
  output: 'export',  // for Next.js 13+ static export mode
  images: {
    unoptimized: true,  // disables image optimization, uses normal img tags
  },
};
