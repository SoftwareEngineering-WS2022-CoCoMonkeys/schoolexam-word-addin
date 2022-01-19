import IDTO from "./IDTO";
import Submission from "../model/Submission";

/**
 * DTO for {@link Submission}
 */
export default class SubmissionDTO implements IDTO<Submission> {
  /** base64 encoded PDF file of the submission scan */
  pdf: string;

  constructor(pdf: string) {
    this.pdf = pdf;
  }

  /**
   * Create DTO from model object
   * @param model The model object.
   */
  static fromModel(model: Submission): SubmissionDTO {
    return new SubmissionDTO(model.pdf);
  }

  /**
   * @inheritDoc
   */
  toModel(): Submission {
    throw new Error("Method not implemented.");
  }
}
