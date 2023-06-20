#!/usr/bin/env node
import initProgram from "./commands";
import type {Command} from 'commander';

function main(): void {
    const program: Command = initProgram();

    program.parse();
}

main();