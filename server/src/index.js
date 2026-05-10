const createApp = require('./app');
const config = require('./config');

const app = createApp(config);

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
