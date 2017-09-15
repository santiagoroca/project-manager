//Core
import fs from 'fs';
import path from 'path';

import { execSync } from 'child_process';
import {readFileSync} from 'fs';
import {writeFileSync} from 'fs';

//Vendor
import Mustache from 'mustache';

class Entity {

    constructor (commander) {
        this.module = '';
    }

    execute (commander) {
        this.name = typeof commander.name != 'function' ? commander.name : `${this.module}-project`;

        if (fs.existsSync(this.name)){
            console.warn(`Folder ${this.name} already exists. Specify a different this.name.`)
            process.exit();
        }

        //Create project folder
        fs.mkdirSync(`./${this.name}`);

        execSync(`cp -r ${path.resolve(__dirname)}/projects/${this.module}/* ./${this.name}/`);
        execSync(`npm install --prefix ./${this.name}/`);

        //Create all configuration files
        this.configuration (commander);

        //Execute src creation function
        this.src(commander);

        //Print all finish output
        this.onfinish();
    }

    template (_in, _opt, _out) {
        let template = readFileSync(`${path.resolve(__dirname)}/templates/${_in}.mustache`, 'utf8');
        let file = Mustache.render(template, _opt);
        writeFileSync(`${_out}/${_in}`, file)
    }

    configuration (commander) {
        //Webpack Configuration Copy
        this.template('webpack.config.js', {
            project_name: this.name,
            library: commander.library ? this.name.replace(/-/g, '_') : false
        }, `./${this.name}`);
    }

    src (commander) {}

    onfinish () {
        console.log ("");
        console.log ('\x1b[32m%s\x1b[0m', `    Project ${this.name} already configured`);
        console.log ("");
        console.log ('\x1b[34m%s\x1b[0m', '        Get started with: npm start');
        console.log ("");
    }

}

export default Entity