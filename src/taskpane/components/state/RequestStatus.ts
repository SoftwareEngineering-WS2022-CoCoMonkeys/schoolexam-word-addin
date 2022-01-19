/**
 * Available request statuses.
 * Depending on the status, the UI may give visual feedback to the user.
 */
const enum RequestStatus {
  /** Not doing anything */
  IDLE,
  /** Sent request, waiting for response */
  WAITING,
  /** Successful completion of the request */
  SUCCESS,
  /** Failure */
  ERROR,
}

export default RequestStatus;
