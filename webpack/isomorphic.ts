import * as ToolsPlugin from 'webpack-isomorphic-tools/plugin';

const {
	NODE_ENV,
} = process.env;

const _ENV_ = NODE_ENV || 'development';
const _DEV_ = _ENV_ !== 'production';

const filter = (module, regex, options, log) => {
	if (options.development) {
		return ToolsPlugin.styleLoaderFilter(module, regex, options, log);
	}
	return regex.test(module.name);
};

const path = (module, options, log) => {
	if (options.development) {
		return ToolsPlugin.styleLoaderPathExtractor(module, options, log);
	}
	return module.name;
};

const parser = (loader) => (module, options, log) => {
	if (options.development) {
		return loader(module, options, log);
	}
	return module.source;
};

export const config = {
	assets: {
		css: {
			extensions: [
				'css',
			],
			filter,
			path,
			parser: parser(ToolsPlugin.cssLoaderParser),
		},
		images: {
			extensions: [
				'png',
				'jpg',
				'gif',
				'ico',
				'svg',
			],
		},
		sass: {
			extensions: [
				'sass',
				'scss',
			],
			filter,
			path,
			parser: parser(ToolsPlugin.cssModulesLoaderParser),
		},
	},
	debug: _DEV_,
};

export const plugin = new ToolsPlugin(config).development(_DEV_);
