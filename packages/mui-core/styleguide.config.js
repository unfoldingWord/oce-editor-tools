const path = require('path');
const {
  createWebpackDevConfig,
  createWebpackProdConfig,
} = require('@craco/craco');

const cracoConfig = require('./craco.config.js');
const webpackConfig =
  process.env.NODE_ENV === 'production'
    ? createWebpackProdConfig(cracoConfig)
    : createWebpackDevConfig(cracoConfig);

const {
  name: packageName, version, repository,
} = require('./package.json');

module.exports = {
  assetsDir: 'src/data',
  usageMode: 'expand',
  exampleMode: 'expand',
  moduleAliases: {},
  components: [
    'src/components/Editor.jsx',
    // 'src/components/BookPreview.jsx',
    // 'src/components/PrintModal.jsx',
  ],
  getComponentPathLine: (componentPath) => {
    const name = path.basename(componentPath, '.jsx');
    return `import { ${name} } from '${packageName}';`;
  },
  title: `${packageName} v${version}`,
  ribbon: {
    url: repository.url,
    text: 'View on GitHub',
  },
  webpackConfig,
};

module.exports.moduleAliases[packageName] = path.resolve(__dirname, 'src');
