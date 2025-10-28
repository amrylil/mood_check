interface IApiError {
  code: number | string;
  message: string;
  stack?: string;
  details?: any;
}

interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class ApiResponse {
  public static success<T>(
    data: T,
    message: string = "Success",
    meta?: IPaginationMeta
  ) {
    return {
      success: true,
      message,
      data,
      meta,
      error: null,
    };
  }

  public static error(error: any, statusCode: number = 500) {
    const apiError: IApiError = {
      code: error.code || statusCode,
      message: error.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
      details: error.details || null,
    };

    return {
      success: false,
      message: apiError.message,
      data: null,
      error: apiError,
    };
  }
}
