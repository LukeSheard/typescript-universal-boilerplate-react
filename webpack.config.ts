import * as webpackMultiConfigurator from 'webpack-multi-configurator';

import baseMixin from './webpack/base';
import devMixin from './webpack/dev';
import prodMixin from './webpack/prod';
import serverMixin from './webpack/server';

const config = webpackMultiConfigurator()
.define('base')
  .append(baseMixin)
.define('development')
  .append('base')
  .append(devMixin)
.define('production')
  .append('base')
  .append(prodMixin)
.define('server')
	.append('base')
	.append(serverMixin)
.create(process.env)
.include(process.env.WEBPACK_MODE)
.otherwise('development')
.resolve()[0];

export default config;
