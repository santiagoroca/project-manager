//Core
import fs from 'fs';
import path from 'path';

import { execSync } from 'child_process';
import {readFileSync} from 'fs';
import {writeFileSync} from 'fs';

//Base Class
import Entity from 'entity/Entity';

class ES6WebGL extends Entity {

    constructor (commander) {
        super(commander);

        commander
            .command('es6-webgl')
            .action((function (language) {
                this.execute(commander);
            }).bind(this));

        this.module = 'es6-webgl';
    }

    src (commander) {
        execSync(`mkdir -p ./${this.name}/dist`);

        console.log (this.name.replace(/-/g, '_'));

        //Webpack Configuration Copy
        this.template('dist/index.html', {
            project_name: this.name,
            library: this.name.replace(/-/g, '_'),
            library_arguments: 'document.getElementById("viewer-container")',
            body: '<div id="viewer-container"></div>',
            head: '<style>html, body, div {width: 100%; height: 100%; margin: 0;}</style>'
        }, `./${this.name}`);
    }

    configuration (commander) {
        //Webpack Configuration Copy
        this.template('webpack.config.js', {
            project_name: this.name,
            library: this.name.replace(/-/g, '_')
        }, `./${this.name}`);
    }

}

export default ES6WebGL