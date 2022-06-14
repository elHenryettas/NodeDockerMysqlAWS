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

export const getPatinets = (req, res) => {
  log.info(`${req.method} ${req.originalurl}, fetching patients`);
  database.query(QUERY.SELECT_PATIENTS, (error, results) => {
    if (!results) {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Resp(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `No patients found`
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Resp(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Patients retrieved`,
            { patients: results }
          )
        );
    }
  });
};

export const createPatinet = (req, res) => {
  log.info(`${req.method} ${req.originalurl}, creating patient`);
  database.query(
    QUERY.CREATE_PATIENT,
    Object.values(req.body),
    (error, results) => {
      if (!results) {
        log.error(error?.message);
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(
            new Resp(
              HttpStatus.INTERNAL_SERVER_ERROR.code,
              HttpStatus.INTERNAL_SERVER_ERROR.status,
              `Error ocurred`
            )
          );
      } else {
        const patient = {
          id: results.insertedId,
          ...req.body,
          created_at: new Date(),
        };
        res
          .status(HttpStatus.CREATED.code)
          .send(
            new Resp(
              HttpStatus.CREATED.code,
              HttpStatus.CREATED.status,
              `Patient created`,
              { patient }
            )
          );
      }
    }
  );
};

export const getPatinet = (req, res) => {
  log.info(`${req.method} ${req.originalurl}, fetching patient`);
  database.query(QUERY.SELECT_PATIENTS,[req.params.id],(error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Resp(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `patient by id ${req.params.id} was not found`
          )
        );
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(
          new Resp(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Patient retrieved`,
             results[0] 
          )
        );
    }
  });
};
export const updatePatinet = (req, res) => {
  log.info(`${req.method} ${req.originalurl}, fetching patient`);
  database.query(QUERY.SELECT_PATIENTS,[req.params.id],(error, results) => {
    if (!results[0]) {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Resp(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `patient by id ${req.params.id} was not found`
          )
        );
    } else {
      log.info(`${req.method} ${req.originalurl}, updating patient`);
      database.query(QUERY.UPDATE_PATIENT, [...Object.values(req.body), req.params.id])
      res
        .status(HttpStatus.OK.code)
        .send(
          new Resp(
            HttpStatus.OK.code,
            HttpStatus.OK.status,
            `Updating patient`,
             results[0] 
          )
        );
    }
  });
};

export default HttpStatus;
