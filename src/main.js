import inquirer from 'inquirer';
import shell from 'shelljs';
import ora from 'ora';
import uuid from 'uuid/v4';

import {parseBranches} from './utils/utils';
import {arrayToQuestions, rename, newName} from './utils/questions';

shell.config.silent = true;

const getBranch = async (branches) => {
  let {nameChange, branch} = await inquirer.prompt([arrayToQuestions(branches), rename]);
  if(nameChange){
    const {newName: newBranch} = await inquirer.prompt(newName);
    branch = newBranch;
  }
  return branch;
};

const getBranches = () => {
  const spinner = ora('Loading your branches').start();
  const branches = parseBranches(shell.exec('git branch -a').stdout);
  spinner.stop();
  return branches;
}

const createOrphan = (branch = '') => {
  shell.exec(`git checkout --orphan ${branch}/${uuid()}`);
}

export const main = async () => {
  const branches = getBranches();
  const branchToPush = await getBranch(branches);
  createOrphan(branchToPush);
};
