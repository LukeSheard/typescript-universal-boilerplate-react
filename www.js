const Server = require('../dist/server').default;

const server = Server();
try {
	server.start(() => {
		console.log("Server Started");
	});
} catch (e) {
	console.error(e);
	process.exit(1);
}
