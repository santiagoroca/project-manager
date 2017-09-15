import commander from 'commander';

//Entities
import ES6 from 'entity/ES6';
import ES6WebGL from 'entity/ES6WebGL';

class Main {

    constructor () {
        commander.version('')
            .option('-n, --name [name]', 'Project Name');


        //Initialize
        let es6 = new ES6(commander);
        let es6WebGL = new ES6WebGL(commander);

        commander.parse(process.argv);
    }

}

export default new Main()