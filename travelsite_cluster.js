
const cluster = require('cluster');

const startWorker = () => {
    const worker = cluster.fork();
    console.log('CLUSTER: Worker %d started,' , worker.id);
}

if (cluster.isMaster) {
    require('os').cpus().forEach(() => {
        startWorker();
    });

    // logging workers that disconnects;
    cluster.on('disconnect', () => {
        console.log('CLUSTER: %d disconnected from the cluster.', worker.id);
    });
    // when a worker dies or exits, creates other to replace it
    cluster.on('exit', () => {
        console.log('CLUSTER: %d died with exit code %d (%s).', 
            worker.id, code, signal);
        startWorker();
    });
} else {
    // start app on worker; 
    require('./travelsite.js')();
}