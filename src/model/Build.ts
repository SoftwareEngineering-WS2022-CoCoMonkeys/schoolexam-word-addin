/**
 * Results of the server-side Build.
 */
export default class Build {
  /** The number of booklets that were built, each with unique page QR-Codes */
  count: number;
  /** The base64-encoded PDF file containing all booklets as a simple concatenation */
  pdfFile: string;
  /** The base64-encoded PDf file containing the student-specific QR-codes for this exam */
  qrCodePdfFile: string;

  constructor(count: number, pdfFile: string, qrCodePdfFile: string) {
    this.count = count;
    this.pdfFile = pdfFile;
    this.qrCodePdfFile = qrCodePdfFile;
  }
}
