import chalk from 'chalk';
import boxen from 'boxen';
import figlet from 'figlet';

import tasks from './constant/FastKit_Script.constant';

// Welcome message
// 1. Welcome Banner
console.log(
  chalk.greenBright(
    figlet.textSync('FastKit CLI', {
      font: 'Standard',
      horizontalLayout: 'default',
      verticalLayout: 'default',
    }),
  ),
);

// 2. Boxed Welcome Message
console.log(
  boxen(
    chalk.cyan(`Welcome to FastKit
Created by Abhishek
We provide built-in APIs that you can select
and use easily using this CLI.`),
    {
      padding: 1,
      borderColor: 'magenta',
      align: 'left',
      borderStyle: 'round',
    },
  ),
);

// 3. Task Logging (with spinners and status)

async function main() {
  tasks.run();
}

main();

export default main;
