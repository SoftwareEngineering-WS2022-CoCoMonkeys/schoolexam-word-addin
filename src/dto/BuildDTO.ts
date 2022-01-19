import Build from "../model/Build";
import IDTO from "./IDTO";

export default class BuildDTO implements IDTO<Build> {
  count: number;
  /** base64 encoded PDF file */
  pdfFile: string;
  /** base64 encoded PDF file */
  qrCodePdfFile: string;

  static fromJson(json: string): BuildDTO {
    return Object.assign(new BuildDTO(), JSON.parse(json));
  }

  toModel(): Build {
    return new Build(this.count, this.pdfFile, this.qrCodePdfFile);
  }
}
