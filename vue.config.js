module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/codica-weather/'
    : '/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Codica weather',
    },
  },
  pwa: {
    name: 'Codica weather',
  }
}
