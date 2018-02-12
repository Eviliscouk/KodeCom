var spawn = require('child_process');
//var killPhantom = require('child_process');
  //killPhantom.spawn('sh',['killall', 'phantomjs']);
  
const subprocess = spawn.spawn(
  'node',
  [
    './test.js'
  ], {
    stdio: ['inherit', 'inherit', 'inherit']
  }
);

subprocess.on('close', (code, signal) => {
  console.log(
    `child process terminated due to receipt of signal ${signal}`);
    
        //subprocess.kill('SIGHUP');
        //subprocess.spawn('sh',['killall', 'phantomjs']);
});



