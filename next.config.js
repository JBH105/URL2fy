/** @type {import('next').NextConfig} */
require('dotenv').config()
const nextConfig = {
  reactStrictMode: true,
  env: {
    BUCKETNAME:"",
    ACCESSKEYID:"",
    SECRETACCESSKEY:""
  },
};

module.exports = nextConfig;
