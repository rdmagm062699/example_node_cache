const AsyncLock = require('async-lock');
const NodeCache = require( "node-cache" ); 

const lock = new AsyncLock();
const myCache = new NodeCache();

module.exports = {
    doSomethingWithLock(inputValue) {
        console.log(`${new Date().toISOString()} - Start process ${inputValue}`);
        const cacheValue = myCache.get('blah');
        if (cacheValue) {
            console.log(`${new Date().toISOString()} - I already have a cache value: ${cacheValue}`);
        }
        else {
            setCacheWithLock(inputValue);
        }
    },
    
    doSomethingNoLock(inputValue) {
        console.log(`Processing for ${inputValue}`);
        const cacheValue = myCache.get('blah');
        if (cacheValue) {
            console.log(`I already have a cache value: ${cacheValue}`);
        }
        else {
            setTimeout(() => {
                myCache.set('blah', inputValue);
                console.log(`Set cache to ${inputValue}`);
            }, 1000);
        }
    },
}

function setCacheWithLock(value) {
    lock.acquire('blah', () => {
        return new Promise((resolve) => {
            console.log(`${new Date().toISOString()} - Processing for ${value}`);
            const cacheValue = myCache.get('blah');
            if (cacheValue) {
                console.log(`${new Date().toISOString()} - Something else set the cache to ${cacheValue}`);
                resolve();
            }
            else {
                setTimeout(() => {
                    myCache.set('blah', value, 7);
                    console.log(`${new Date().toISOString()} - Set cache to ${value}`);
                    resolve();
                }, 1000);
            }
        });
    })
    .then(() => {
        console.log(`${new Date().toISOString()} - Lock released for ${value}`);
    });
}
