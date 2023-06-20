import commander from 'commander';
import type {Command} from 'commander';

const joke: Command = new commander.Command('joke');
const jokeCommand: Command = joke
    .option('-c, --category [cat]', 'Select preferred category for the joke you are being told...', 'Any')
    .action((): void => {
        console.log('joke command activated!');
    });

export default jokeCommand;