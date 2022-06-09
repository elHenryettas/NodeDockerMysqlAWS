import database from "../config/mysql.config";
import Resp from "../domain/response";
import log from "../util/logger";
import QUERY from "../query/patient.query";

type code_status = {
  code: number;
  status: string;
};
interface IHttpStatus {
  OK: code_status;
  CREATED: code_status;
  NO_CONTENT: code_status;
  BAD_REQUEST: code_status;
  NOT_FOUND: code_status;
  INTERNAL_SERVER_ERROR: code_status;
}

const HttpStatus: IHttpStatus = {
  OK: { code: 200, status: "OK" },
  CREATED: { code: 201, status: "CREATED" },
  NO_CONTENT: { code: 204, status: "NO_CONTENT" },
  BAD_REQUEST: { code: 400, status: "BAD_REQUEST" },
  NOT_FOUND: { code: 404, status: "NOT_FOUND" },
  INTERNAL_SERVER_ERROR: { code: 500, status: "INTERNAL_SERVER_ERROR" },
};

export default HttpStatus;
