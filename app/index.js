const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
    prompting() {
        this.log(
            yosay(`Welcome to the ${chalk.red('Vue')} generator!`)
        );

        const prompts = [
            {
                type: 'list',
                name: 'template',
                message: 'What base template do you want to use?',
                default: 0,
                choices: [
                    { name: 'SPA - Single Page Application', value: 'spa' },
                    { name: 'Typescript', value: 'typescript' },
                    { name: 'Browser Extension', value: 'browser-extension' },
                ],
            },
            {
                type: 'input',
                name: 'displayName',
                message: 'Application name:',
            },
            {
                type: 'input',
                name: 'shortName',
                message: 'Short name:',
                default(props) {
                    return props.displayName.toLowerCase().replace(/\s/g, '-').replace(/-+/, '-');
                },
            },
        ];

        return this.prompt(prompts).then(props => {
            this.props = props;
        });
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath(this.props.template + '/**/*'),
            this.destinationPath(),
            this.props,
            null,
            {
                globOptions: { dot: true },
            }
        );
    }

    install() {
        this.log('\nScaffolding completed, installing dependencies and building...\n');
        this.installDependencies({
            npm: true,
            bower: false,
            skipMessage: true,
        })
            .then(() => this.spawnCommandSync('npm', ['run', 'dev']))
            .then(() => {
                switch (this.props.template) {
                    case 'spa':
                    case 'typescript':
                        this.log(`\nAll done! Try running ${chalk.yellow.bold('npm run serve')} to start using your app.\n`);
                        break;
                    case 'browser-extension':
                        this.log(
                            `\nAll done! Try installing the extension in ` +
                            `${chalk.yellow.bold('Firefox (about:debugging)')} or ${chalk.yellow.bold('Chrome (chrome://extensions)')}.\n`
                        );
                        break;
                }
            });
    }
};
