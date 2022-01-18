import IDTO from "./IDTO";
import Submission from "../model/Submission";

export default class SubmissionDTO implements IDTO<Submission> {
  /** base64 encoded PDF of the submission scan */
  pdf: string;

  constructor(pdf: string) {
    this.pdf = pdf;
  }

  toModel(): Submission {
    throw new Error("Method not implemented.");
  }

  static fromModel(model: Submission): SubmissionDTO {
    return new SubmissionDTO(model.pdf);
  }
}
