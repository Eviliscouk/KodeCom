var routes = require('../controllers/contractorController.js')
 , http_mocks = require('node-mocks-http')
  , should = require('should');
  
const express = require('express');
const app = express();

routes.init(app);


 function buildResponse() {
  return http_mocks.createResponse({eventEmitter: require('events').EventEmitter})
}
describe('contractor->controller->tests', function() {

  it('/api/getContractorNames/', function(done) {

    var response = buildResponse();

    var request  = http_mocks.createRequest({
      method: 'GET',
      url: '/api/getContractorNames/',
    });

    response.on('end', function() {
        
      console.log(response._getData());
      
      response._getData().should.equal('NAVEEN');
      
      done();
    })

    routes.handle(request, response)
  });

});