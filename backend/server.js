const os = require('os');
const http = require('http');
const EventEmitter = require('events');
const myEmitter = new EventEmitter();


const welcomeUser = (name, age) => {
    console.log(`Hi There ${name}, you are ${age} years old`);
}

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Hello World</h1>');
        res.end();
    }else if (req.url === '/about'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>About Page</h1>');
        res.end();
    }else if (req.url === '/contact'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Contact Page</h1>');
        res.end();
    }else if (req.url === '/login'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Login Page</h1>');
        res.end();
    }else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>404 Error Page</h1>');
        res.end();
    }
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})
//va comunque avanti, è asynch
myEmitter.on('welcome', welcomeUser);

console.log(os.hostname());

console.log(os.arch());

const allPCInfo = {
    hostname: os.hostname(),
    arch: os.arch(),
    freeMem: os.freemem(),
    totalMem: os.totalmem(),
    platform: os.platform(),
    release: os.release(),
    cpus: os.cpus(),
    EOL: os.EOL
}

//console.log(allPCInfo);

myEmitter.emit('welcome', 'Alex', '24');