const { refactor } = require('../src/refactor');

describe('refactor', () => {

    it('default', () => {
        const configs = [
            {
                "deployment": "development",
                "instance": "foo",
                "config": {
                    a: "default",
                },
            },
            {
                "deployment": "development",
                "instance": "bar",
                "config": {
                    a: "default",
                },
            },
            {
                "deployment": "production",
                "instance": "foo",
                "config": {
                    a: "default",
                },
            },
            {
                "deployment": "production",
                "instance": "bar",
                "config": {
                    a: "default",
                },
            },
        ]

        const refactored = refactor(configs);

        expect(refactored).toEqual([
            {
                config: { a: 'default' }
            },
            { instance: 'bar', config: {} },
            { instance: 'foo', config: {} },
            { deployment: 'development', config: {} },
            { deployment: 'development', instance: 'bar', config: {} },
            { deployment: 'development', instance: 'foo', config: {} },
            { deployment: 'production', config: {} },
            { deployment: 'production', instance: 'bar', config: {} },
            { deployment: 'production', instance: 'foo', config: {} }
        ]);
    });

    it('deployment default', () => {
        const configs = [
            {
                "deployment": "development",
                "instance": "foo",
                "config": {
                    b: "development",
                },
            },
            {
                "deployment": "development",
                "instance": "bar",
                "config": {
                    b: "development",
                },
            },
            {
                "deployment": "production",
                "instance": "foo",
                "config": {
                    b: "production",
                },
            },
            {
                "deployment": "production",
                "instance": "bar",
                "config": {
                    b: "production",
                },
            },
        ];

        const refactored = refactor(configs);

        expect(refactored).toEqual([
            { config: {} },
            { instance: 'bar', config: {} },
            { instance: 'foo', config: {} },
            { deployment: 'development', config: { b: 'development' } },
            { deployment: 'development', instance: 'bar', config: {} },
            { deployment: 'development', instance: 'foo', config: {} },
            { deployment: 'production', config: { b: 'production' } },
            { deployment: 'production', instance: 'bar', config: {} },
            { deployment: 'production', instance: 'foo', config: {} }
        ]);
    });

    it('instance default', () => {
        const configs = [
            {
                "deployment": "development",
                "instance": "foo",
                "config": {
                    c: "foo",
                },
            },
            {
                "deployment": "development",
                "instance": "bar",
                "config": {
                    c: "bar",
                },
            },
            {
                "deployment": "production",
                "instance": "foo",
                "config": {
                    c: "foo",
                },
            },
            {
                "deployment": "production",
                "instance": "bar",
                "config": {
                    c: "bar",
                },
            },
        ];

        const refactored = refactor(configs);

        expect(refactored).toEqual([
            { config: {} },
            { instance: 'bar', config: { c: 'bar' } },
            { instance: 'foo', config: { c: 'foo' } },
            { deployment: 'development', config: {} },
            { deployment: 'development', instance: 'bar', config: {} },
            { deployment: 'development', instance: 'foo', config: {} },
            { deployment: 'production', config: {} },
            { deployment: 'production', instance: 'bar', config: {} },
            { deployment: 'production', instance: 'foo', config: {} }
        ]);
    });

    it('deployment-instance', () => {
        const configs = [
            {
                "deployment": "development",
                "instance": "foo",
                "config": {
                    d: "development-foo",
                },
            },
            {
                "deployment": "development",
                "instance": "bar",
                "config": {
                    d: "development-bar",
                },
            },
            {
                "deployment": "production",
                "instance": "foo",
                "config": {
                    d: "production-foo",
                },
            },
            {
                "deployment": "production",
                "instance": "bar",
                "config": {
                    d: "production-bar",
                },
            },
        ];

        const refactored = refactor(configs);

        expect(refactored).toEqual([
            { config: {} },
            { instance: 'bar', config: {} },
            { instance: 'foo', config: {} },
            { deployment: 'development', config: {} },
            { deployment: 'development', instance: 'bar', config: { d: 'development-bar' } },
            { deployment: 'development', instance: 'foo', config: { d: 'development-foo' } },
            { deployment: 'production', config: {} },
            { deployment: 'production', instance: 'bar', config: { d: 'production-bar' } },
            { deployment: 'production', instance: 'foo', config: { d: 'production-foo' } }
        ]);
    });

    it('deployment is prior', () => {
        const configs = [
            {
                "deployment": "development",
                "instance": "foo",
                "config": {
                    e: "default",
                },
            },
            {
                "deployment": "development",
                "instance": "bar",
                "config": {
                    e: "default",
                },
            },
            {
                "deployment": "production",
                "instance": "foo",
                "config": {
                    e: "default",
                },
            },
            {
                "deployment": "production",
                "instance": "bar",
                "config": {
                    e: "not default",
                },
            },
        ];

        const refactored = refactor(configs);

        expect(refactored).toEqual([
            { config: {} },
            { instance: 'bar', config: {} },
            { instance: 'foo', config: {} },
            { deployment: 'development', config: { e: 'default' } },
            { deployment: 'development', instance: 'bar', config: {} },
            { deployment: 'development', instance: 'foo', config: {} },
            { deployment: 'production', config: {} },
            { deployment: 'production', instance: 'bar', config: { e: 'not default' } },
            { deployment: 'production', instance: 'foo', config: { e: 'default' } }
        ]);
    });

    it('multiple', () => {
        const configs = [
            {
                "deployment": "development",
                "instance": "foo",
                "config": {
                    a: "default",
                    b: "development",
                    c: "foo",
                    d: "development-foo",
                },
            },
            {
                "deployment": "development",
                "instance": "bar",
                "config": {
                    a: "default",
                    b: "development",
                    c: "bar",
                    d: "development-bar",
                },
            },
            {
                "deployment": "production",
                "instance": "foo",
                "config": {
                    a: "default",
                    b: "production",
                    c: "foo",
                    d: "production-foo",
                },
            },
            {
                "deployment": "production",
                "instance": "bar",
                "config": {
                    a: "default",
                    b: "production",
                    c: "bar",
                    d: "production-bar",
                },
            },
        ];

        const refactored = refactor(configs);

        expect(refactored).toEqual([
            { config: { a: "default" } },
            { instance: 'bar', config: { c: 'bar' } },
            { instance: 'foo', config: { c: 'foo' } },
            { deployment: 'development', config: { b: 'development' } },
            { deployment: 'development', instance: 'bar', config: { d: 'development-bar' } },
            { deployment: 'development', instance: 'foo', config: { d: 'development-foo' } },
            { deployment: 'production', config: { b: 'production' } },
            { deployment: 'production', instance: 'bar', config: { d: 'production-bar' } },
            { deployment: 'production', instance: 'foo', config: { d: 'production-foo' } }
        ]);
    });

    it('nested', () => {
        const configs = [
            {
                "deployment": "development",
                "instance": "foo",
                "config": { obj: {
                    a: "default",
                    b: "development",
                    c: "foo",
                    d: "development-foo",
                } },
            },
            {
                "deployment": "development",
                "instance": "bar",
                "config": { obj: {
                    a: "default",
                    b: "development",
                    c: "bar",
                    d: "development-bar",
                } },
            },
            {
                "deployment": "production",
                "instance": "foo",
                "config": { obj: {
                    a: "default",
                    b: "production",
                    c: "foo",
                    d: "production-foo",
                } },
            },
            {
                "deployment": "production",
                "instance": "bar",
                "config": { obj: {
                    a: "default",
                    b: "production",
                    c: "bar",
                    d: "production-bar",
                } },
            },
        ];

        const refactored = refactor(configs);

        expect(refactored).toEqual([
            { config: { obj: { a: "default" } } },
            { instance: 'bar', config: { obj: { c: 'bar' } } },
            { instance: 'foo', config: { obj: { c: 'foo' } } },
            { deployment: 'development', config: { obj: { b: 'development' } } },
            { deployment: 'development', instance: 'bar', config: { obj: { d: 'development-bar' } } },
            { deployment: 'development', instance: 'foo', config: { obj: { d: 'development-foo' } } },
            { deployment: 'production', config: { obj: { b: 'production' } } },
            { deployment: 'production', instance: 'bar', config: { obj: { d: 'production-bar' } } },
            { deployment: 'production', instance: 'foo', config: { obj: { d: 'production-foo' } } }
        ]);
    });

    it('atomic', () => {
        const configs = [
            {
                "deployment": "development",
                "instance": "foo",
                "config": { obj: {
                    a: "default",
                    b: "development",
                    c: "foo",
                    d: "development-foo",
                } },
            },
            {
                "deployment": "development",
                "instance": "bar",
                "config": { obj: {
                    a: "default",
                    b: "development",
                    c: "bar",
                    d: "development-bar",
                } },
            },
            {
                "deployment": "production",
                "instance": "foo",
                "config": { obj: {
                    a: "default",
                    b: "production",
                    c: "foo",
                    d: "production-foo",
                } },
            },
            {
                "deployment": "production",
                "instance": "bar",
                "config": { obj: {
                    a: "default",
                    b: "production",
                    c: "bar",
                    d: "production-bar",
                } },
            },
        ];

        const refactored = refactor(configs, { atomic: ['obj'] });

        expect(refactored).toEqual([
            { config: {} },
            { instance: 'bar', config: {} },
            { instance: 'foo', config: {} },
            { deployment: 'development', config: {} },
            { deployment: 'development', instance: 'bar', config: { obj: {
                a: "default",
                b: 'development',
                c: 'bar',
                d: 'development-bar'
            } } },
            { deployment: 'development', instance: 'foo', config: { obj: {
                a: "default",
                b: 'development',
                c: 'foo',
                d: 'development-foo'
            } } },
            { deployment: 'production', config: {} },
            { deployment: 'production', instance: 'bar', config: { obj: {
                a: "default",
                b: 'production',
                c: 'bar',
                d: 'production-bar'
            } } },
            { deployment: 'production', instance: 'foo', config: { obj: {
                a: "default",
                b: 'production',
                c: 'foo',
                d: 'production-foo'
            } } }
        ]);
    });

});
