import IDTO from "./IDTO";
import Submission from "../model/Submission";

export default class SubmissionDTO implements IDTO<Submission> {
  /** base64 encoded PDF file of the submission scan */
  pdf: string;

  constructor(pdf: string) {
    this.pdf = pdf;
  }

  static fromModel(model: Submission): SubmissionDTO {
    return new SubmissionDTO(model.pdf);
  }

  toModel(): Submission {
    throw new Error("Method not implemented.");
  }
}
