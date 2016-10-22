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
        const languages = options.languages || [
                'chinese',
                'english',
                'japanese',
            ];
        const languageSpecified = {};
        lang.each(languages, (language) => {
            languageSpecified[language] = true;
        });
        return lang.extend(
            languageSpecified.english ? tokenizeEnglish(text, options) : {},
            languageSpecified.japanese ? tokenizeJapanese(text, options) : {},
            languageSpecified.chinese ? tokenizeChinese(text, options) : {}
        );
    }
};

module.exports = cjkTokenizer;
