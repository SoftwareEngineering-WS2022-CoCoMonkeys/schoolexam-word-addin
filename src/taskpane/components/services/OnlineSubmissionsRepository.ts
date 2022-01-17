import ISubmissionsRepository from "./ISubmissionsRepository";
import ApiService, { HttpMethod } from "./ApiService";
import SubmissionDTO from "../../../export_dto/SubmissionDTO";

class OnlineSubmissionsRepository implements ISubmissionsRepository {
  uploadSubmission(examId: string, submission: SubmissionDTO): Promise<Response> {
    return ApiService.request(HttpMethod.POST, `/Submission/Upload/${examId}`, submission);
  }
}

const SubmissionsRepository = new OnlineSubmissionsRepository();
export default SubmissionsRepository;
