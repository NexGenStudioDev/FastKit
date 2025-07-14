import { Response } from 'express';

class SendResponse {
  success(res: Response, statusCode: number, message: string, data: any = null): Response {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  /**
   * Send an error response
   * @param res - Express response object
   * @param statusCode - HTTP status code
   * @param message - Error message
   */
  error(res: Response, statusCode: number, message: string): Response {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }
}

export default new SendResponse();
