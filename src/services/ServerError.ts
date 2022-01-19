/**
 * An erroneous server response with detailed information about the error.
 */
export default class ServerError {
  /** The HTTP status code */
  status: number;
  /** The HTTP status text */
  statusText: string;
  /** The error message returned by  */
  errorMessage: string | null;

  constructor(status: number, statusText: string, errorMessage?: string | null) {
    this.status = status;
    this.statusText = statusText;
    this.errorMessage = errorMessage;
  }

  toString(): string {
    return `Server responded with ${this.status}-${this.statusText}: ${this.errorMessage}`;
  }
}
