import * as webpackMultiConfigurator from 'webpack-multi-configurator';

import baseMixin from './webpack/base';
import developmentMixin from './webpack/dev';

const config = webpackMultiConfigurator()
.define('base')
  .append(baseMixin)
.define('development')
  .append('base')
  .append(developmentMixin)
.create(process.env)
.include(process.env.NODE_ENV)
.otherwise('development')
.resolve()[0];

export default config;
