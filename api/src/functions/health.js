const { app } = require('@azure/functions');

app.http('health', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log('Peter Electrical health check requested');
        //jusut return a simple JSON response indicating the service is healthy
        return {
            status: 200,
            jsonBody: {
                status: 'healthy',
                service: 'Peter Electrical',
                timestamp: new Date().toISOString()
            }
        };
    }
});