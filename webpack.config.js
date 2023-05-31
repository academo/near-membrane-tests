const path = require('path');
const fs = require('fs');

//list all *.ts files inside ./src/examples
function getEntries(dir) {
  const entries = fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.ts'))
    .map((file) => path.resolve(dir, file));
  // turn entries into a map
  return entries.reduce((map, entry) => {
    const key = path.basename(entry, '.ts');
    map[key] = entry;
    return map;
  }, {});
}

const entries = getEntries('./src/examples');
const entry = {
  start: './src/index.ts',
  ...entries,
};

module.exports = {
  entry,
  // resolve: {
  //   extensions: ['.ts', '.js'],
  // },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: ['ts-loader'],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 8080,
    liveReload: false,
    hot: false,
  },
};
