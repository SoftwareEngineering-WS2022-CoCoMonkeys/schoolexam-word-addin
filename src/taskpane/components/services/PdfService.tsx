import FileType = Office.FileType;
import File = Office.File;

class PdfService {
  async getDocument(): Promise<string> {
    const promises: Promise<Array<any>>[] = [];
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
    let completedSlices = 0;
    for (let i = 0; i < sliceCount; i++) {
      promises.push(
        new Promise<Array<any>>((resolve, reject) => {
          result.value.getSliceAsync(i, (result) => {
            if (result.status === Office.AsyncResultStatus.Succeeded) {
              completedSlices++;
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

  arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}

export default new PdfService();
