export default class Build {
  count: number;
  pdfFile: string;
  qrCodePdfFile: string;

  constructor(count: number, pdfFile: string, qrCodePdfFile: string) {
    this.count = count;
    this.pdfFile = pdfFile;
    this.qrCodePdfFile = qrCodePdfFile;
  }
}
