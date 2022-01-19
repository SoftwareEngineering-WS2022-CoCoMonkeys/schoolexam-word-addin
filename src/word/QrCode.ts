import WordPersistable from "./WordPersistable";
import IQrCode from "./IQrCode";

/**
 * Collection of the two required QR-Codes that is persisted in the Word document as a custom property.
 */
export default class QrCode extends WordPersistable<QrCode> implements IQrCode {
  propertyKey = "qrcode-data";

  /** The ID of the {@link Word.ContentControl} associated with the page QR-Code */
  private _pageQrCodeCcId: number;

  /** The ID of the {@link Word.ContentControl} associated with the student QR-Code */
  private _studentQrCodeCcId: number;

  /**
   * @inheritDoc
   * @param value The new ID of the {@link Word.ContentControl} associated with the page QR-Code
   */
  set pageQrCode(value: number) {
    this._pageQrCodeCcId = value;
  }

  /**
   * @inheritDoc
   * @param value The new ID of the {@link Word.ContentControl} associated with the student QR-Code
   */
  set studentQrCode(value: number) {
    this._studentQrCodeCcId = value;
  }

  /**
   * @inheritDoc
   */
  async copyAsync(): Promise<QrCode> {
    const copy = Object.assign(new QrCode(), this) as QrCode;
    await copy.saveAsync();
    return copy;
  }

  /**
   * @inheritDoc
   */
  pageQrCodeIsPresent(): boolean {
    return this._pageQrCodeCcId != null;
  }

  /**
   * @inheritDoc
   */
  studentQrCodeIsPresent(): boolean {
    return this._studentQrCodeCcId != null;
  }

  /**
   * @inheritDoc
   */
  bothArePresent(): boolean {
    return this.studentQrCodeIsPresent() && this.pageQrCodeIsPresent();
  }

  /**
   * @inheritDoc
   */
  init(): void {
    return;
  }

  /**
   * @inheritDoc
   */
  reviver(key: string, value: unknown): unknown {
    if (key === "") {
      return Object.assign(new QrCode(), value);
    }
    return value;
  }

  /**
   * @inheritDoc
   */
  newEmpty(): QrCode {
    return new QrCode();
  }
}
