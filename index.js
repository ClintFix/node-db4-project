const server = require('./api/server.js');

const PORT = process.env.PORT || 4000;

server.list(PORT, () => {
    console.log(`Listening on port ${port}`);
});