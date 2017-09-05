import commander from 'commander';

//Entities
import ES6 from 'entity/ES6';

class Main {

    constructor () {
        commander.version('')
            .option('-n, --name [name]', 'Project Name');

        commander
            .command('create es6')
            .action(function (language) {
                es6.execute(commander);
            });

        //Initialize
        let es6 = new ES6(commander);

        commander.parse(process.argv);
    }

}

export default new Main()