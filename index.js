/*jslint node:true*/
/*global Promise*/

"use strict";

var fs = require("fs");

/*
This file should act as a wrapper for the native node fs module.
It helps by wrapping certain fs operations in Promises so that 
fs usage doesn't have to be so verbose.
*/

// Function to wrap loading a file in a Promise
function readFile(file, options) {
    var args = Array.prototype.slice.call(arguments);
    return new Promise(function (resolve, reject) {
        args.push(function (err, data) {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
        fs.readFile.apply(this, args);
    });
}

// Function to wrap writing a file in a Promise
function writeFile(file, data, options) {
    var args = Array.prototype.slice.call(arguments);
    return new Promise(function (resolve, reject) {
        args.push(function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
        fs.writeFile.apply(this, args);
    });
}

module.exports = {
    readFile: readFile,
    writeFile: writeFile
};