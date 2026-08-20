const { app, output } = require("@azure/functions");

const quoteDocument = output.cosmosDB({
    databaseName: "QuoteDB",
    containerName: "Quote",
    connection: "COSMOS_CONNECTION",
    createIfNotExists: false
});

app.http("quote", {
    methods: ["POST"],
    authLevel: "anonymous",
    route: "quote",

    extraOutputs: [quoteDocument],

    handler: async (request, context) => {
        try {
            const data = await request.json();

            const {
                name,
                phone,
                email,
                service,
                location,
                message,
                preferredContact
            } = data;

            // Basic validation
            if (!name || !phone || !service || !location || !message || !preferredContact) {
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
                location,
                preferredContact
            });

            const quote = {
                id: Date.now().toString(),
                name,
                phone,
                email: email || "",
                service,
                location,
                message,
                preferredContact,
                status: "NEW",
                notificationStatus: "PENDING",
                notificationAttempts: 0,
                createdAt: new Date().toISOString()
            };

            context.extraOutputs.set(
                quoteDocument,
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