(function(error){
    const EventEmitter =  require('events');
    error.manageError=    function (err) {
  
  
              if (error.syscall !== 'listen') {
                throw error;
              }

            // handle specific listen errors with friendly messages
          switch (err.code) {
            case 'EACCES':
              console.error('error:requires elevated privileges');
              process.exit(1);
              break;
            case 'EADDRINUSE':
              console.error('error: server is already in use');
              process.exit(1);
              break;
              
            default:
              console.log(err);
              throw err;
              
          }
          
error.raise = function(error){
    
    var err;    
    if (typeof(error) == 'string')
    {
        err = new Error(error);
    }
    if (typeof(error) == 'Error')
    {
        err = error
    }
    else
    return ee.emit('error',new Error('invalid use of error.raise in exception-manager'));
                
    const ee = new EventEmitter();
    ee.emit('error', err);
    }

        
        
    }
    
}(module.exports));