/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  images: {
    remotePatterns:[
      {
        hostname:'**' // TODO: restrict in production.
      }
    ]
  },
}
