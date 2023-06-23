import commander from 'commander';
import type {Command} from 'commander';

const cache: Command = new commander.Command('cache');
const cacheCommand: Command = cache
        .description('Controls mechanism for caching jokes.')
        .command('enable', 'Enables caching if disabled.')
        .command('disable', 'Disables caching is enabled.')
        .command('maxAge <age>', 'Set the max age for data to be cached.')

export default cacheCommand;