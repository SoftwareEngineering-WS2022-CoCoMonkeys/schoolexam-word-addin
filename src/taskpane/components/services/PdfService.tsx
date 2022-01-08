import FileType = Office.FileType;
import File = Office.File;

class PdfService {
  async getDocument(): Promise<Array<any>> {
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
    console.log(promises);
    return Promise.all(promises).then((slices) => slices.reduce((a, b) => a.concat(b)));
  }
}

export default new PdfService();
