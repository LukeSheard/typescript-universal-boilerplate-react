interface IChunks {
	javascript: Object;
	styles: Object;
}

interface IParams {
	chunks: () => IChunks;
}

interface NodeRequire {
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name?:string ) => void;
}
