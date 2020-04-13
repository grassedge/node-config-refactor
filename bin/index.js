#!/usr/bin/env node
'use strict';

const config = require('config');
const fs = require('fs');
const minimist = require('minimist');

const { refactor } = require('../lib/refactor');

(function main(argv) {
    if (!argv.condition) {
        console.log('At least one condition required.');
        process.exit(1);
    }

    const condition = [].concat(argv.condition).map(cond => {
        const [ deployment, instance ] = cond.split(':');
        return { deployment, instance };
    });

    const atomic = [].concat(argv.atomic);

    const targets = condition.map(target => {
        process.env.NODE_CONFIG_ENV = target.deployment;
        process.env.NODE_APP_INSTANCE = target.instance;
        return {
            ...target,
            // Generate actual configurations.
            config: config.util.loadFileConfigs()
        };
    });

    const refactored = refactor(targets, { atomic });

    refactored.map(c => {
        if (argv.out) {
            const name = [
                c.deployment || 'default',
                ...(c.instance ? [c.instance] : [])
            ].join('-');

            fs.writeFileSync(
                `${argv.out}/${name}.json`,
                JSON.stringify(c.config, null, '  ')
            );
        } else {
            console.log(JSON.stringify(c.config, null, '  '));
        }
    })

})(minimist(process.argv.slice(2), {
    "string": [
        "atomic",
        "condition",
        "out",
    ],
    "alias": {
        "a": "atomic",
        "c": "condition",
        "o": "out"
    }
}));
