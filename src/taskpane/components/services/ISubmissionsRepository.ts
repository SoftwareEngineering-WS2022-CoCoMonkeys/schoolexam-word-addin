import Submission from "../../../model/Submission";
import ServerError from "./ServerError";

/**
 * Repository that grants access to {@link Submission}-related functions.
 */
export default interface ISubmissionsRepository {
  /**
   * Asynchronously upload a submission for an exam.
   * @param submission The submission to upload. Contains information about the associated exam.
   * @returns The response wrapped in Promise.
   */
  uploadSubmission(submission: Submission): Promise<Response>;
}
