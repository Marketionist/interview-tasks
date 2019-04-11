const { AfterAll, BeforeAll } = require('cucumber');
let { nodeTestingServer } = require('node-testing-server');

// Settings for node testing server
nodeTestingServer.config = {
    hostname: 'localhost',
    port: 3001,
    logsEnabled: 0,
    pages: {
        '/api/1.0/order_summary/10.json': `{
                                        "items": [{
                                            "name": "widget 1",
                                            "price": {
                                                "type": "USD",
                                                "value": 10.1
                                            },
                                            "quantity": 4
                                        },
                                        {
                                            "name": "widget 2",
                                            "price": {
                                                "type": "USD",
                                                "value": 4.2
                                            },
                                            "quantity": 6
                                        }],
                                        "order_total": 65.6,
                                        "discount": 0
                                    }`,
        '/api/1.0/order_summary/11.json': `{
                                        "items": [{
                                            "name": "widget 1",
                                            "price": {
                                                "type": "USD",
                                                "value": 10.1
                                            },
                                            "quantity": 5
                                        },
                                        {
                                            "name": "widget 2",
                                            "price": {
                                                "type": "USD",
                                                "value": 4.2
                                            },
                                            "quantity": 6
                                        }],
                                        "order_total": 75.7,
                                        "discount": 5
                                    }`,
        '/api/1.0/order_summary/20.json': `{
                                        "items": [{
                                            "name": "widget 1",
                                            "price": {
                                                "type": "USD",
                                                "value": 10.1
                                            },
                                            "quantity": 14
                                        },
                                        {
                                            "name": "widget 2",
                                            "price": {
                                                "type": "USD",
                                                "value": 4.2
                                            },
                                            "quantity": 6
                                        }],
                                        "order_total": 166.6,
                                        "discount": 5
                                    }`,
        '/api/1.0/order_summary/21.json': `{
                                        "items": [{
                                            "name": "widget 1",
                                            "price": {
                                                "type": "USD",
                                                "value": 10.1
                                            },
                                            "quantity": 15
                                        },
                                        {
                                            "name": "widget 2",
                                            "price": {
                                                "type": "USD",
                                                "value": 4.2
                                            },
                                            "quantity": 6
                                        }],
                                        "order_total": 176.7,
                                        "discount": 10
                                    }`,
        '/api/1.0/order_summary/30.json': `{
                                        "items": [{
                                            "name": "widget 1",
                                            "price": {
                                                "type": "USD",
                                                "value": 10.1
                                            },
                                            "quantity": 24
                                        },
                                        {
                                            "name": "widget 2",
                                            "price": {
                                                "type": "USD",
                                                "value": 4.2
                                            },
                                            "quantity": 6
                                        }],
                                        "order_total": 267.6,
                                        "discount": 10
                                    }`,
        '/api/1.0/order_summary/31.json': `{
                                        "items": [{
                                            "name": "widget 1",
                                            "price": {
                                                "type": "USD",
                                                "value": 10.1
                                            },
                                            "quantity": 25
                                        },
                                        {
                                            "name": "widget 2",
                                            "price": {
                                                "type": "USD",
                                                "value": 4.2
                                            },
                                            "quantity": 6
                                        }],
                                        "order_total": 277.7,
                                        "discount": 99
                                    }`
    }
}

BeforeAll(function (done) {
    // Start node testing server
    nodeTestingServer.start();

    done();
});

AfterAll(function (done) {
    // Stop node testing server
    nodeTestingServer.stop();

    done();
});
