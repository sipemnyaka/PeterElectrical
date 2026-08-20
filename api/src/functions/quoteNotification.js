const { app } = require('@azure/functions');

app.cosmosDB('quoteNotification', {
    connection: 'COSMOS_CONNECTION',
    databaseName: 'QuoteDB',
    containerName: 'Quote',
    leaseContainerName: 'leases',
    createLeaseContainerIfNotExists: false,

    handler: async (documents, context) => {
        if (!documents || documents.length === 0) {
            return;
        }

        for (const quote of documents) {
            context.log('NEW QUOTE RECEIVED');
            context.log(`Customer: ${quote.name}`);
            context.log(`Phone: ${quote.phone}`);
            context.log(`Service: ${quote.service}`);
            context.log(`Preferred contact: ${quote.preferredContact}`);
            context.log(`Quote ID: ${quote.id}`);
        }
    }
});