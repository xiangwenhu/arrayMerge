

const reEscapeChar = /\\(\\)?/g;
const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * 来源 lodash
 * Converts `string` to a property path array.
 *
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
const stringToPath = (string: string) => {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
        result.push('');
    }
    // @ts-ignore
    string.replace(rePropName, function replacer(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
};


export {
    stringToPath
}