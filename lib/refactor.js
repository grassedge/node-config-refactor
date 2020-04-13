const { groupBy, merge } = require('lodash');
const { and, sub } = require('./json-logical-ops');

function _default(configs, { atomic = [] } = []) {
    return configs.reduce(
        (accum, config) => and(accum, config, { atomic }),
        configs[0]
    );
}

function _refactor(configs, def, { atomic = [] } = []) {
    const refactored = configs.map(conf => ({
        ...conf,
        config: sub(conf.config, def, { atomic })
    }));
    return refactored;
}

const refactor = (configs, { atomic = [] } = []) => {
    const res = [];
    // Process by Deployments.
    const groupByDep = groupBy(configs, c => c.deployment);
    const refactoredByDep = Object.entries(groupByDep)
          .reduce((accum, [deployment, configs]) => {
              const def = _default(configs.map(c => c.config), { atomic });
              return accum.concat(
                  {
                      deployment,
                      config: def
                  },
                  _refactor(configs, def, { atomic })
              );
          }, []);

    const { dep, ins } = groupBy(refactoredByDep, c => c.instance ? 'ins' : 'dep');
    const defaultByDep = _default(dep.map(c => c.config), { atomic });
    const deps = _refactor(dep, defaultByDep, { atomic });

    // Process by Instances.
    const groupByIns = groupBy(ins, c => c.instance);

    const refactoredByIns = Object.entries(groupByIns)
          .reduce((accum, [instance, configs]) => {
              const def = _default(configs.map(c => c.config), { atomic });
              return accum.concat(
                  {
                      instance,
                      config: def
                  },
                  _refactor(configs, def, { atomic })
              );
          }, []);

    const defaultByIns = _default(
        refactoredByIns.filter(c => !c.deployment).map(c => c.config),
        { atomic }
    );

    const def = merge(defaultByDep, defaultByIns);
    const result = [{ config: def }, ...deps, ...refactoredByIns];

    return result.sort((a, b) => {
        if (b.deployment !== a.deployment) {
            return !a.deployment               ? -1
                 : a.deployment < b.deployment ? -1
                                               :  1;
        } else {
            return !a.instance             ? -1
                 : a.instance < b.instance ? -1
                                           :  1;
        }
    });
};

module.exports = { refactor };
