/** @type {import('next').NextConfig} */
require('dotenv').config()
const nextConfig = {
  reactStrictMode: true,
  env: {
    BUCKETNAME:"urlmaster",
    ACCESSKEYID:"AKIA6MTNSIVLUX73IHFT",
    SECRETACCESSKEY:"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"
  },
};

module.exports = nextConfig;
