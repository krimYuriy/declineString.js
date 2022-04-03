/**
 * helper-function to decline form of a word to a selected number
 * @param {number} number
 * @param {string} nominative
 * @param {string} genetive
 * @param {string} plural
 * @returns {string}
 */

function decline(number, nominative, genetive, plural) {
    const ii = number % 100;
    if (ii >= 11 && ii <= 19) {
        return plural;
    }

    const i = number % 10;
    switch (i) {
        case 1:
            return nominative;
        case 2:
        case 3:
        case 4:
            return genetive;
        default:
            return plural;
    }
}

/**
 * accept string with index, nominative, genetive, plural form of a word
 * like (У вас есть {0} {0: комментарий|комментария|комментариев})
 * and returns a decline form a word
 * @param {string} stringDecl
 * @param {Array.<string>} args
 * @returns {string}
 */
const replaceLocalizationVar = (stringDecl, ...args) => {
    return args.reduce((total, count, index) => {
        const regexp = new RegExp(`\\{${index}\\}`);
        const declStringRegexp = new RegExp(
            `\\{${index}:[A-zА-я]*\\|[A-zА-я]*\\|[A-zА-я]*\\}`,
            'i'
        );

        const declineStrings = total
            .match(declStringRegexp)[0]
            .replace(/\d:|{|}/gi, '')
            .split('|');

        return total
            .replace(regexp, count)
            .replace(declStringRegexp, decline(count, ...declineStrings));
    }, stringDecl);
};
