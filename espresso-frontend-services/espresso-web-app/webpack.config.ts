import Dotenv from 'dotenv-webpack';

module.exports = {
  // your other webpack configurations
  plugins: [
    // your other plugins
    new Dotenv()
  ]
};
