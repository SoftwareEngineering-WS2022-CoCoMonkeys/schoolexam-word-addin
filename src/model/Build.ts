export default class Build {
  constructor(count: number, pdfFile: string, qrCodePdfFile: string) {
    this.count = count;
    this.pdfFile = pdfFile;
    this.qrCodePdfFile = qrCodePdfFile;
  }
  count: number;
  pdfFile: string;
  qrCodePdfFile: string;
}
