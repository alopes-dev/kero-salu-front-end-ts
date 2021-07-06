const Errors = {
  BadRequest: {
    status: 400,
    message: "Request has wrong format."
  },
  Unauthorized: {
    status: 401,
    message: "Authentication credentials not valid."
  },
  Forbidden: {
    status: 403,
    message: "You're missing permission to execute this request."
  }
}

export class ErrorREST extends Error {
   public response: { status: number; message: string; detail: string };

    constructor(error: { status: number, message: string }, detail: string = undefined, ...args) {
       super(...args);
       this.response = {status: error.status, message: error.message, detail: detail};
   }
}
