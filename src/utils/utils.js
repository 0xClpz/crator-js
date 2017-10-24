import _ from 'lodash';

const compose = (f, g) =>
  x =>
    f(g(x));

const composeFilters = (f, g) =>
  x =>
    f(x) && g(x)

const filterRemotes = branch => !(_.includes(branch, 'remote'));
const filterEmpty = branch => branch !== '';

const filterBranches = composeFilters(filterRemotes, filterEmpty);

const trim = x => x.trim();
const removeStar = x => x.replace('*', '');

const clean = compose(trim, removeStar);

export const parseBranches = branches =>
  branches.split('\n')
    .filter(filterBranches)
    .map(clean);
