import SubmissionDTO from "../../../export_dto/SubmissionDTO";

export default interface ISubmissionsRepository {
  uploadSubmission(examId: string, submission: SubmissionDTO): Promise<Response>;
}
