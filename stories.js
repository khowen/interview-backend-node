'use strict';
var http = require('http'),
    print = require('./print');

function get() {
    //Use Node.js to connect to API URL(http://www.cnn.com/data/ocs/section/index.html:homepage1-zone-1.json)
    var request = http.get('http://www.cnn.com/data/ocs/section/index.html:homepage1-zone-1.json', function (response) {
        //console.log(response.statusCode);
        var body = '';
        //Read data
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            // console.log(body);
            if (response.statusCode === 200) {
                try {
                    //Parse data
                    var profile = JSON.parse(body);
                    //Print data
                    print.printStories(profile);
                } catch (error) {
                    //Parse Error
                    print.printError(error);
                }
            } else {
                print.printError({message: http.STATUS_CODES[response.statusCode]});
            }
        });
    });

    //Connection Error
    request.on('error', print.printError);
}

module.exports.get = get;
