/**
 * Service that handles PDF-related functions for the currently opened Word document.
 */
export default class PdfService {
  /**
   * Asynchronously convert the Word document to a PDF encoded as a base64 string.
   * The Office API gives us the PDF document in 4MB slices.
   * We have to concatenate them ourselves.
   * @returns The result wrapped in a Promise.
   */
  static async getDocument(): Promise<string> {
    /** Holds promises for all the PDF slices. They are give as byte arrays */
    const promises: Promise<number[]>[] = [];

    // 1. Determine conversion status and slice count
    const result = await new Promise<Office.AsyncResult<Office.File>>((resolve, reject) => {
      Office.context.document.getFileAsync(Office.FileType.Pdf, async (result) => {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          resolve(result);
        } else {
          reject(result);
        }
      });
    });
    const sliceCount = result.value.sliceCount;

    console.debug(`Processing ${sliceCount} slices`);

    // 2. Read slices individually
    for (let i = 0; i < sliceCount; i++) {
      promises.push(
        new Promise<number[]>((resolve, reject) => {
          result.value.getSliceAsync(i, (result) => {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
              resolve(result.value.data);
            } else {
              reject();
            }
          });
        })
      );
    }

    // 3. Concatenate, convert to base64, and return
    return Promise.all(promises)
      .then((slices) => slices.reduce((a, b) => a.concat(b)))
      .then((byteArr) => this.arrayBufferToBase64(byteArr));
  }

  /**
   * Convert byte array to base64 string.
   * @param buffer The binary data to convert.
   * @returns The corresponding base64 string.
   */
  static arrayBufferToBase64(buffer: number[]): string {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
