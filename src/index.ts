import { server } from 'universal-webpack';
import config, { settings } from '../webpack/config';

server(config, settings);
