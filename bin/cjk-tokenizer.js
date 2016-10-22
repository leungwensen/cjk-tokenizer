#!/usr/bin/env node
'use strict';
/**
 * cjk-tokenizer module
 * @module cjk-tokenizer
 * @see module:index
 */
const fs = require('fs');
const commander = require('commander');
const pkg = require('../package.json');
const cjkTokenizer = require('../lib');

function list(val) {
    return val.split(',');
}

commander
    .version(pkg.version)
    .arguments('<filename>')
    .option('-s, --stopWords <stopWords>', 'stop words', list)
    .action((filename) => {
        let content;
        try {
            content = fs.readFileSync(filename, 'utf-8');
        } catch (e) {
            console.error('Error: unable to read ' + filename + '.');
            process.exit(1);
        }
        const tokens = cjkTokenizer.tokenize(content, {
            stopWords: commander.stopWords || [],
        });
        console.log(JSON.stringify(tokens, null, 2));
    });

// execute client
commander.parse(process.argv);

if (process.argv.length === 2) commander.outputHelp();
