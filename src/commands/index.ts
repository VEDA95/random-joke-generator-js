import commander from 'commander';
import jokeCommand from './joke';
import type {Command} from 'commander';


export default function initProgram(): Command {
    const program: Command = new commander.Command();

    program.addCommand(jokeCommand);

    return program;
}