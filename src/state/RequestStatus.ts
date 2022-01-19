/**
 * Available request statuses.
 * Depending on the status, the UI may give visual feedback to the user.
 */
const enum RequestStatus {
  /** Not doing anything */
  IDLE = "IDLE",
  /** Sent request, waiting for response */
  WAITING = "WAITING",
  /** Successful completion of the request */
  SUCCESS = "SUCCESS",
  /** Failure */
  ERROR = "ERROR",
  /** Clientside Failure */
  CLIENT_ERROR = "CLIENT_ERROR",
  /** ServerSide Failure */
  SERVER_ERROR = "SERVER_ERROR",
  /** Invalid request */
  INVALID = "INVALID",
}

export function isErroneousStatus(status: RequestStatus): boolean {
  return (
    status === RequestStatus.SERVER_ERROR ||
    status === RequestStatus.INVALID ||
    status === RequestStatus.CLIENT_ERROR ||
    status === RequestStatus.ERROR
  );
}

export default RequestStatus;
