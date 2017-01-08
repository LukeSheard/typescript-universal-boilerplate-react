import {
  css_loader_parser as cssLoaderParser,
  css_modules_loader_parser as cssModulesLoaderParser,
  style_loader_filter as styleLoaderFilter,
  style_loader_path_extractor as styleLoaderPathExtractor,
} from 'webpack-isomorphic-tools/plugin';

const filter = (module, regex, options, log) => {
  if (options.development) {
    return styleLoaderFilter(module, regex, options, log);
  }
  return regex.test(module.name);
};

const path = (module, options, log) => {
  if (options.development) {
    return styleLoaderPathExtractor(module, options, log);
  }
  return module.name;
};

const parser = (loader) => (module, options, log) => {
  if (options.development) {
    return loader(module, options, log);
  }
  return module.source;
};

const {
  NODE_ENV,
} = process.env;

const _DEV_ = (NODE_ENV || 'development') === 'development';

const config = {
  debug: _DEV_,
  assets: {
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
      parser: parser(cssModulesLoaderParser),
    },
    css: {
      extensions: [
        'css',
      ],
      filter,
      path,
      parser: parser(cssLoaderParser),
    },
  },
};

export default config;
