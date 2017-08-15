var assert = require('assert');
describe('password', function() {

  describe('encrypt', function() {
    it('should encrypt password', function() {
        
      var base64Str = Buffer.from("password").toString('base64');
      console.log(base64Str);
      assert.equal("cGFzc3dvcmQ=", base64Str);
    });
  });
 
 describe('decrypt', function() {
    it('should decrypt password ', function() {
      
      
      var base10 = Buffer.from("cGFzc3dvcmQ=", 'base64').toString('ascii');
      console.log(base10);
      assert.equal("password", base10);
    });
  });
  

});
