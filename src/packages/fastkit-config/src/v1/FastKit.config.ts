import express, { Express, RequestHandler } from 'express';
import * as path from 'path';


export class FastKit {
  public expressApp: Express;

  constructor(expressApp?: Express) {
    this.expressApp = expressApp || express();
  }

  // Express route methods
  public get(path: string, handler: RequestHandler): void {
    this.expressApp.get(path, handler);
  }

  public post(path: string, handler: RequestHandler): void {
    this.expressApp.post(path, handler);
  }

  public put(path: string, handler: RequestHandler): void {
    this.expressApp.put(path, handler);
  }

  public delete(path: string, handler: RequestHandler): void {
    this.expressApp.delete(path, handler);
  }

  public use(...args: Parameters<Express['use']>): void {
    this.expressApp.use(...args);
  }

  public listen(port: number, callback?: () => void): void {
    this.expressApp.listen(port, callback);
  }
}

