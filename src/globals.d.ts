interface IChunks {
	javascript: Object;
	styles: Object;
}

interface IParams {
	chunks: () => IChunks;
}
