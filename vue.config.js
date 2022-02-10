module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/calendar/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/assets/index.scss";',
      },
    },
  },
};
