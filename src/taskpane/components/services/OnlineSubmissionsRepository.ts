import ISubmissionsRepository from "./ISubmissionsRepository";
import ApiService, { HttpMethod } from "./ApiService";
import SubmissionDTO from "../../../dto/SubmissionDTO";
import Submission from "../../../model/Submission";

class OnlineSubmissionsRepository implements ISubmissionsRepository {
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
