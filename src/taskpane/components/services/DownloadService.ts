const anchor = document.createElement("a");
anchor.setAttribute("id", "download-anchor");

export default function downloadFileBase64(dataType: string, fileName: string, fileBase64: string): void {
  anchor.setAttribute("download", fileName);
  anchor.setAttribute("href", `data:${dataType};base64,${fileBase64}`);

  anchor.click();
}
// Removing the child causes the download to be corrupted and is not necessary.
// appendChild() moves it on its own.

const fileInput = document.createElement("input");

// Allow for multiple file selection
fileInput.setAttribute("multiple", "multiple");

export function uploadFileBase64(callback: (filesBase64: string[]) => void, onError?: (error: Error) => void): void {
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
  fileInput.setAttribute("type", "file");

  fileInput.click();
}
