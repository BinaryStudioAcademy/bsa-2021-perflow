const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
     'process.env': {
       FIREBASE_KEY: JSON.stringify(process.env.FIREBASE_KEY),
     }
    })
  ]
};
