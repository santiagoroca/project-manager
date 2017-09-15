//Core
import fs from 'fs';
import path from 'path';

import { execSync } from 'child_process';
import {readFileSync} from 'fs';
import {writeFileSync} from 'fs';

import Entity from 'entity/Entity';

class ES6 extends Entity {

    constructor (commander) {
        super(commander);

        commander
            .command('es6')
            .option('-l, --library', 'Compiles the project as a library')
            .action((function (options) {
                this.execute(Object.assign(commander, options));
            }).bind(this));

        this.module = 'es6';
    }

    src (commander) {
        //If library enabled we copy the dist
        if (commander.library) {
            execSync(`mkdir -p ./${this.name}/dist`);

            //Webpack Configuration Copy
            this.template('dist/index.html', {
                project_name: this.name,
                library: commander.library ? this.name.replace(/-/g, '_') : false
            }, `./${this.name}`);
        }

        execSync(`mkdir -p ./${this.name}/src`);

        //Webpack Configuration Copy
        this.template('src/main.js', {
            main_body: commander.library ? 'document.body.innerHTML = "Hello World!";' : 'console.log("Hello World!");'
        }, `./${this.name}`);
    }
}

export default ES6