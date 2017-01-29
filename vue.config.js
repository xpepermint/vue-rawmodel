module.exports = {

  webpack (defaults) {
    defaults.context = './src';
    defaults.output.filename = './index.js';
    defaults.resolve.extensions.push('.ts');
    defaults.module.rules.push({ test: /\.ts?$/, loader: 'ts-loader' });
    return defaults;
  }

};
