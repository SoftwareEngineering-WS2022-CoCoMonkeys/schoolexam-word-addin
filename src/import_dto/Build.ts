export default class Build {
  count: number;
  pdfFile: number;
  qrCodePdfFile: string;

  static fromJson(json: string): Build {
    return Object.assign(new Build(), JSON.parse(json));
  }
}
