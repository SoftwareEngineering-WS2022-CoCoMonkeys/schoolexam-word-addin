import Submission from "../../../model/Submission";

export default interface ISubmissionsRepository {
  uploadSubmission(submission: Submission): Promise<Response>;
}
