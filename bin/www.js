const app = require('../app');
const APP_PORT = process.env.APP_PORT || 3000;

app.listen(APP_PORT, () => {
  console.log(`Server running on port ${APP_PORT}`);
});
