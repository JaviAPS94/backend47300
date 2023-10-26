import { Command } from 'commander';

const program = new Command();

program.option('-d', 'variable para debug', false)
        .option('-p <port>', 'puerto del servidor', 8080)
        .requiredOption('-u <user>', 'usuario del sistema')
        .option('--mode <mode>', 'mode de trabajo', 'production');

program.parse();

console.log('Options: ', program.opts());