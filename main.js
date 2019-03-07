const testModule = require('./testModule');

testModule.doSomethingWithLock(1);
testModule.doSomethingWithLock(2);
testModule.doSomethingWithLock(3);
testModule.doSomethingWithLock(4);
testModule.doSomethingWithLock(5);

setTimeout(() => {
    testModule.doSomethingWithLock(6);
    testModule.doSomethingWithLock(7);
    testModule.doSomethingWithLock(8);
    testModule.doSomethingWithLock(9);
    testModule.doSomethingWithLock(10);
}, 8000)

setTimeout(() => {
    testModule.doSomethingWithLock(11);
    testModule.doSomethingWithLock(12);
    testModule.doSomethingWithLock(13);
    testModule.doSomethingWithLock(14);
    testModule.doSomethingWithLock(15);
}, 9000)
