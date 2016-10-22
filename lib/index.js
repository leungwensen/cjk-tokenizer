'use strict';
/**
 * index module
 * @module index
 * @see module:index
 */
const lang = require('zero-lang');
const tokenizeChinese = require('./tokenizer/chinese');
const tokenizeJapanese = require('./tokenizer/japanese');
const tokenizeEnglish = require('./tokenizer/english');

const cjkTokenizer = {
    tokenizeChinese,
    tokenizeEnglish,
    tokenizeJapanese,
    tokenize(text, options) {
        return lang.extend(
            tokenizeEnglish(text, options),
            tokenizeJapanese(text, options),
            tokenizeChinese(text, options)
        );
    }
};

module.exports = cjkTokenizer;
