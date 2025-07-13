
import fastKitConfig from "src/config/fastKit.config";
import { Listr } from "listr2";

const tasks = new Listr([
    {
      title: 'Create FastKit directory',
      task: () => {
        return new Promise((resolve, reject) => {
          try {
            fastKitConfig.createFastKitDirectory();
            resolve('FastKit directory created successfully');
          
          } catch (error) {
            reject(new Error('Failed to create FastKit directory'));
          }
        });
      },
    },
    {
      title: 'Create FastKit environment file',
      task: () => {
        return new Promise((resolve, reject) => {
          try {
            fastKitConfig.createEnvironmentFile();
            resolve('FastKit directory created successfully');
          
          } catch (error) {
            reject(new Error('Failed to create FastKit directory'));
          }
        });
      },
    },


    {
        title: 'Create FastKit Script Directory with Script files',
        task: () => {
          return new Promise((resolve, reject) => {
            try {
              fastKitConfig.createScriptDirectory();
              resolve('FastKit script directory created successfully');
            
            } catch (error) {
              reject(new Error('Failed to create FastKit script directory'));
            }
          });
        },
      },
      {
        title: 'Create Api Directory',
        task: () => {
          return new Promise((resolve, reject) => {
            try {
              fastKitConfig.createApiDirectory()
              resolve('Created Api directory successfully');
            
            } catch (error) {
              reject(new Error('Failed to create Api directory'));
            }
          });
        },
      },
    {
      title: 'Finalizing',
      task: (_, task) => {
        task.title = 'Finalizing complete';
      },
    },
]);

export default tasks;