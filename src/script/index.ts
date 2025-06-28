import prompts from 'prompts';
import { build } from './build';
import { startProd } from './production';
import { publish } from './publish';

async function main() {
  const response = await prompts({
    type: 'select',
    name: 'command',
    message: 'Which script do you want to run?',
    choices: [
      { title: 'Build', value: 'build' },
      { title: 'Start Production', value: 'prod' },
      { title: 'Publish', value: 'publish' },
      { title: 'Exit', value: 'exit' },
    ],
  });

  switch (response.command) {
    case 'build':
      build();
      break;
    case 'prod':
      startProd();
      break;
    case 'publish':
      publish();
      break;
    default:
      console.log('Exiting...');
      process.exit(0);
  }
}

main();
