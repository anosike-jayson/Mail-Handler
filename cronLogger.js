const cron = require('node-cron');

function logMessage() {
  console.log('Cron job executed at:', new Date().toLocaleString());
}

cron.schedule('* * * * *', () => {
  logMessage();
});
