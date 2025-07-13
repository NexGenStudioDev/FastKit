import fs from 'fs';
import path from 'path';

class FastKit_Config {
  createFastKitDirectory() {
    let FilePath = path.join(path.resolve(), 'src', 'FastKit');
    console.log(`File path: ${FilePath}`);

    if (!fs.existsSync(FilePath)) {
      fs.mkdirSync(FilePath, { recursive: true });
      console.log('FastKit directory created successfully.');
      return;
    }

    // Logic to create FastKit directory
  }

  createEnvironmentFile() {
    const exampleFilePath = path.join(path.resolve(), '.env.FastKit.example');
    const envFilePath = path.join('.env.FastKit');

    if (!fs.existsSync(exampleFilePath)) {
      console.error(`Error: ${exampleFilePath} does not exist.`);
      return;
    }

    if (fs.existsSync(envFilePath)) {
      console.log('.env.FastKit file already exists.');
      return;
    }

    const exampleContent = fs.readFileSync(exampleFilePath, 'utf-8');
    fs.writeFileSync(envFilePath, exampleContent);

    console.log('.env.FastKit file created successfully with data from .env.FastKit.example.');
  }

  createScriptDirectory() {
    const scriptDirPath = path.join(path.resolve(), 'src', 'FastKit', 'script');
    const myScriptPath = path.join(path.resolve(), 'src', 'script');

    let Scripts = ['keyGen.ts'];

    if (!fs.existsSync(myScriptPath)) {
      throw new Error('Script directory does not exist. Please create it first.');
    }

    if (!fs.existsSync(scriptDirPath)) {
      fs.mkdirSync(scriptDirPath, { recursive: true });
      console.log('FastKit script directory created successfully.');
    }

    for (const script of Scripts) {
      const sourceScriptPath = path.join(myScriptPath, script);
      const targetScriptPath = path.join(scriptDirPath, script);

      if (!fs.existsSync(sourceScriptPath)) {
        console.error(`Error: Source script file ${sourceScriptPath} does not exist.`);
        continue;
      }

      const scriptContent = fs.readFileSync(sourceScriptPath, 'utf-8');
      fs.writeFileSync(targetScriptPath, scriptContent);
      console.log(`${script} copied successfully to FastKit script directory.`);
    }
  }

  createApiDirectory() {
    const apiDirPath = path.join(path.resolve(), 'src', 'FastKit', 'api');
    if (!fs.existsSync(apiDirPath)) {
      fs.mkdirSync(apiDirPath, { recursive: true });
      console.log('API directory created successfully.');
    } else {
      console.log('API directory already exists.');
    }
  }
}

export default new FastKit_Config();
