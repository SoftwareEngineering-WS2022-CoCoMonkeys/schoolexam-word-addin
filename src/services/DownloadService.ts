/** Constant HTML anchor element for "hidden downloads */
const anchor = document.createElement("a");
anchor.setAttribute("id", "download-anchor");

/**
 * Initiate a file download.
 * @param dataType The file type, e.g. "application/pdf"
 * @param fileName The name of the file after download
 * @param fileBase64 The file as a base64 string
 */
export default function downloadFileBase64(dataType: string, fileName: string, fileBase64: string): void {
  anchor.setAttribute("download", fileName);
  anchor.setAttribute("href", `data:${dataType};base64,${fileBase64}`);

  anchor.click();
}

/** Constant HTML input for file uploads */
const fileInput = document.createElement("input");

// Allow multiple file selection
fileInput.setAttribute("multiple", "multiple");
fileInput.setAttribute("type", "file");

/**
 * Initiate a file upload.
 * @param callback Function to call once the upload is completed and the files have been converted to base64 strings.
 * @param onError Function to call if the upload or conversion to base64 fails.
 */
export function uploadFileBase64(callback: (filesBase64: string[]) => void, onError?: (error: Error) => void): void {
  /**
   * Listens to changes in the file input of the file input element.
   */
  async function listener() {
    const filesBase64 = [];
    for (let i = 0; i < fileInput.files.length; i++) {
      const file = fileInput.files.item(i);
      try {
        // Convert file to base64 string
        // from https://stackoverflow.com/a/52311051
        const fileBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
            if (encoded.length % 4 > 0) {
              encoded += "=".repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);
          };
          reader.onerror = (error) => reject(error);
        });
        filesBase64.push(fileBase64);
      } catch (e) {
        console.warn(`File conversion number ${i} failed with reason:`, e);
        onError(e);
        return;
      }
    }
    callback(filesBase64);
  }

  fileInput.onchange = listener;

  // Trigger upload
  fileInput.click();
}
