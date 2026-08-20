const { app } = require('@azure/functions');

app.setup({
    enableHttpStream: true,
});

require('./health');
require('./quote');
require('./quoteNotification');