const { isEqual, isPlainObject, isArray } = require('lodash');

const and = (objA, objB, { atomic = [] } = {}) => {
    return Object.entries(objA).reduce((accum, [ key, a ]) => {
        const b = objB[key];
        if (atomic.indexOf(key) === -1 && isPlainObject(a) && isPlainObject(b)) {
            const aAndB = and(a, b, { atomic });
            if (Object.keys(aAndB).length > 0) {
                accum[key] = aAndB;
            }
        } else if (isEqual(a, b)) {
            accum[key] = isArray(a) ? Object.assign([], a) : a;
        }
        return accum;
    }, {});
};

const sub = (objA, objB, { atomic = [] } = {}) => {
    return Object.entries(objA).reduce((accum, [ key, a ]) => {
        const b = objB[key];
        if (atomic.indexOf(key) === -1 && isPlainObject(a) && isPlainObject(b)) {
            const aSubB = sub(a, b, { atomic });
            if (Object.keys(aSubB).length > 0) {
                accum[key] = aSubB;
            }
        } else if (!isEqual(a, b)) {
            accum[key] = isArray(a) ? Object.assign([], a) : a;
        }
        return accum;
    }, {});
};

module.exports = { and, sub };
