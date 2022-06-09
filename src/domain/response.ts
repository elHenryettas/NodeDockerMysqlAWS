class Resp {
  timeStamps: string;
  statusCode: number;
  httpStatus: string;
  message: string;
  data?: {};

  constructor(
    statusCode: number,
    httpStatus: string,
    message: string,
    data?: {}
  ) {
    this.timeStamps = new Date().toLocaleDateString();
    this.statusCode = statusCode;
    this.httpStatus = httpStatus;
    this.message = message;
    this.data = data;
  }
}

export default Resp;