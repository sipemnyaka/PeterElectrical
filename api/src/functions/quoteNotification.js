const { app } = require('@azure/functions');
const { Resend } = require('resend');

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

        const resend = new Resend(process.env.RESEND_API_KEY);

        for (const quote of documents) {
            context.log('NEW QUOTE RECEIVED');
            context.log(`Customer: ${quote.name}`);
            context.log(`Phone: ${quote.phone}`);
            context.log(`Service: ${quote.service}`);
            context.log(`Preferred contact: ${quote.preferredContact}`);
            context.log(`Quote ID: ${quote.id}`);

            try {
                const { data, error } = await resend.emails.send({
                    from: process.env.RESEND_FROM,
                    to: [process.env.PETER_EMAIL],
                    subject: `New Peter Electrical Quote - ${quote.service}`,
                    text: `
New quote request received.

Customer: ${quote.name}
Phone: ${quote.phone}
Email: ${quote.email || 'Not provided'}
Service: ${quote.service}
Preferred contact: ${quote.preferredContact}

Message:
${quote.message}

Quote ID: ${quote.id}
                    `.trim()
                });

                if (error) {
                    context.error('Email notification failed:', error);
                    continue;
                }

                context.log(`Email notification sent successfully. Email ID: ${data.id}`);
            } catch (error) {
                context.error('Unexpected email notification error:', error);
            }
        }
    }
});