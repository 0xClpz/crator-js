export const arrayToQuestions = arr => 
  ({
    type: 'rawlist',
    message: 'Which branch should I push?',
    name: 'branch',
    choices: arr
  })

export const rename =
  {
    type: 'confirm',
    name: 'nameChange',
    message:'Should I change the name of the branch?',
    default: true
  }

export const newName =
  {
    type: 'input',
    name: 'newName',
    message: 'What name do you want for your branch',
    default: ''
  }