const { and, sub } = require('../src/json-logical-ops');

describe('and', () => {
    it('primitive', () => {
        const a = {
            foo: 1,
            bar: 2,
        };
        const b = {
            foo: 1,
            bar: 3,
        };

        expect(and(a, b)).toEqual({ foo: 1 });
        expect(and(b, a)).toEqual({ foo: 1 });
    });

    it('object', () => {
        const a = {
            hoge: {
                fuga: 999,
                piyo: 2,
            },
            a: {},
            b: {},
        };
        const b = {
            hoge: {
                fuga: 1,
                piyo: 2,
            },
            a: {},
            b: 1,
        };

        expect(and(a, b)).toEqual({ hoge: { piyo: 2 } });
        expect(and(b, a)).toEqual({ hoge: { piyo: 2 } });
    });

    it('array', () => {
        const a = {
            arr1: [1],
            arr2: [2],
        };
        const b = {
            arr1: [1],
            arr2: [3],
        };

        expect(and(a, b)).toEqual({ arr1: [1] });
        expect(and(b, a)).toEqual({ arr1: [1] });
    });
});

describe('sub', () => {
    it('primitive', () => {
        const a = {
            foo: 1,
            bar: 2,
        };
        const b = {
            foo: 1,
            bar: 3,
        };

        expect(sub(a, b)).toEqual({ bar: 2 });
        expect(sub(b, a)).toEqual({ bar: 3 });
    });

    it('object', () => {
        const a = {
            hoge: {
                fuga: 999,
                piyo: 2,
            },
            a: {},
            b: {},
        };
        const b = {
            hoge: {
                fuga: 1,
                piyo: 2,
            },
            a: {},
            b: 1,
        };

        expect(sub(a, b)).toEqual({ hoge: { fuga: 999 }, b: {} });
        expect(sub(b, a)).toEqual({ hoge: { fuga:   1 }, b: 1  });
    });

    it('object', () => {
        const a = {
            c: {
                d: 1,
                e: 2,
            },
        };
        const b = {
            c: {
                d: 1,
                e: 2,
            },
        };

        expect(sub(a, b)).toEqual({ });
        expect(sub(b, a)).toEqual({ });
     });

    it('array', () => {
        const a = {
            arr1: [1],
            arr2: [2],
        };
        const b = {
            arr1: [1],
            arr2: [3],
        };

        expect(sub(a, b)).toEqual({ arr2: [2] });
        expect(sub(b, a)).toEqual({ arr2: [3] });
    });
});
