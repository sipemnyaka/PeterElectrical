const { app } = require("@azure/functions");

app.http("quote", {
    methods: ["POST"],
    authLevel: "anonymous",
    route: "quote",

    extraOutputs: {
        quoteDocument: {
            type: "cosmosDB",
            databaseName: "QuoteDB",
            containerName: "Quotes",
            connectionStringSetting: "CosmosDbConnectionString",
            createIfNotExists: true
        }
    },


    handler: async (request, context) => {
        try {
            const data = await request.json();

            const {
                name,
                phone,
                email,
                service,
                message,
                preferredContact
            } = data;

            // Basic validation
            if (!name || !phone || !service || !message || !preferredContact) {
                return {
                    status: 400,
                    jsonBody: {
                        error: "Please complete all required fields."
                    }
                };
            }

            context.log("Quote request received", {
                name,
                phone,
                email,
                service,
                preferredContact
            });

            const quote = {
                id: Date.now().toString(),
                name,
                phone,
                email: email || "",
                service,
                message,
                preferredContact,
                status: "NEW",
                createdAt: new Date().toISOString()
            };

            context.extraOutputs.set(
                context.extraOutputs.quoteDocument,
                quote
            );

            return {
                status: 200,
                jsonBody: {
                    success: true,
                    message: "Quote request received successfully."
                }
            };

        } catch (error) {
            context.log("Quote function error:", error);

            return {
                status: 500,
                jsonBody: {
                    error: "Unable to process quote request."
                }
            };
        }
    }
});