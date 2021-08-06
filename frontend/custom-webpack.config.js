const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
     'process.env':{
         apiKey:JSON.stringify(process.env.FIREBASE_KEY),
     }
    })
  ]
};