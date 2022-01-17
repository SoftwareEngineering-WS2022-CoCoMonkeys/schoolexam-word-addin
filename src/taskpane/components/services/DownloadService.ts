const anchor = document.createElement("a");

export default function downloadFileBase64(dataType: string, fileName: string, fileBase64: string): void {
  anchor.setAttribute("id", "download-anchor");
  anchor.setAttribute("download", fileName);
  anchor.setAttribute("href", `data:${dataType};base64,${fileBase64}`);

  anchor.click();
}

// Removing the child causes the download to be corrupted and is not necessary.
// appendChild() moves it on its own.
