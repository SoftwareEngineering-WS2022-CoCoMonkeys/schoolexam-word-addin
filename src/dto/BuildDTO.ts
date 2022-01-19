import Build from "../model/Build";
import IDTO from "./IDTO";

/**
 * DTO for {@link Build}
 */
export default class BuildDTO implements IDTO<Build> {
  count: number;
  /** base64 encoded PDF file */
  pdfFile: string;
  /** base64 encoded PDF file */
  qrCodePdfFile: string;

  constructor(count: number, pdfFile: string, qrCodePdfFile: string) {
    this.count = count;
    this.pdfFile = pdfFile;
    this.qrCodePdfFile = qrCodePdfFile;
  }

  /**
   * Create DTO from JSON string.
   * @param json The typed object.
   */
  static fromJson(json: string): BuildDTO {
    // @ts-ignore
    return Object.assign(new BuildDTO(), JSON.parse(json));
  }

  /**
   * Create DTO from model object
   * @param model The model object.
   */
  static fromModel(model: Build): BuildDTO {
    return new BuildDTO(model.count, model.pdfFile, model.qrCodePdfFile);
  }

  /**
   * @inheritDoc
   */
  toModel(): Build {
    return new Build(this.count, this.pdfFile, this.qrCodePdfFile);
  }
}
