interface IAppState {
	routing: Object;
}

interface IStyleChunk {
	application: string;
}

interface IJavascriptChunk {
	application: string;
	common: string;
}

interface IChunks {
	styles: IStyleChunk;
	javascript: IJavascriptChunk;
}

interface IParams {
	chunks: () => IChunks;
}

interface NodeRequire { // tslint:disable-line 
	ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name?: string ) => void;
}
