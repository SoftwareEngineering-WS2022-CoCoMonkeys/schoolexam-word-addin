import ISubmissionsRepository from "./ISubmissionsRepository";
import ApiService, { HttpMethod } from "./ApiService";
import SubmissionDTO from "../../../dto/SubmissionDTO";
import Submission from "../../../model/Submission";

/**
 * Submissions repository that uses the deployed SchoolExam backend.
 */
class OnlineSubmissionsRepository implements ISubmissionsRepository {
  /**
   * @inheritDoc
   * @returns The HTTP response wrapped in a Promise.
   */
  uploadSubmission(submission: Submission): Promise<Response> {
    return ApiService.request(
      HttpMethod.POST,
      `/Submission/Upload/${submission.examId}`,
      SubmissionDTO.fromModel(submission)
    );
  }
}

const SubmissionsRepository = new OnlineSubmissionsRepository();
export default SubmissionsRepository;
