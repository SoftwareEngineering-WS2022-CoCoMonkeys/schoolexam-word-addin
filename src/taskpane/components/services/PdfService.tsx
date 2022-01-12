import FileType = Office.FileType;
import File = Office.File;

export default class PdfService {
  static async getDocument(): Promise<string> {
    const promises: Promise<number[]>[] = [];
    const result = await new Promise<Office.AsyncResult<File>>((resolve, reject) => {
      Office.context.document.getFileAsync(FileType.Pdf, async (result) => {
        if (result.status === Office.AsyncResultStatus.Succeeded) {
          resolve(result);
        } else {
          reject();
        }
      });
    });
    const sliceCount = result.value.sliceCount;
    // The Office API gives us the PDF document in 4MB slices.
    // We have to concatenate them ourselves.
    for (let i = 0; i < sliceCount; i++) {
      promises.push(
        new Promise<number[]>((resolve, reject) => {
          result.value.getSliceAsync(i, (result) => {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
              console.log(typeof result.value.data);
              resolve(result.value.data);
            } else {
              reject();
            }
          });
        })
      );
    }
    return Promise.all(promises)
      .then((slices) => slices.reduce((a, b) => a.concat(b)))
      .then((byteArr) => this.arrayBufferToBase64(byteArr));
  }

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
