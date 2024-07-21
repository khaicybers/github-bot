const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

const makeCommit = async n => {
    const { default: random } = await import('random');
    if (n === 0) return simpleGit().push();
    const x = random.int(0, 54);
    const y = random.int(0, 6);
    const DATE = moment().subtract(1, 'year').add(1, 'day')
                        .add(x, 'week').add(y, 'day').format();
    const data = {
        date: DATE
    }
    console.log(DATE);
    jsonfile.writeFile(FILE_PATH, data, async () => {
        await simpleGit().add([FILE_PATH]).commit(DATE, { '--date': DATE });
        makeCommit(n - 1);
    });
}

makeCommit(500);
