const { app } = require("@azure/functions");

app.http("quote", {
    methods: ["POST"],
    authLevel: "anonymous",
    route: "quote",

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