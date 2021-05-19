// // jest.setup.js
import Promise from 'promise-polyfill';
global.Promise = Promise;
global.console.warn = jest.fn();
global.__reanimatedWorkletInit = jest.fn();
global.self = global;
global.window = {};
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
