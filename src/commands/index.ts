import commander from 'commander';
import jokeCommand from './joke';
import type {Command} from 'commander';


export default function initProgram(): Command {
    const program: Command = new commander.Command();

    program
        .version('1.0.0')
        .description('A CLI app for telling jokes. (Built with love and typescript.)')
        .addCommand(jokeCommand);

    return program;
}