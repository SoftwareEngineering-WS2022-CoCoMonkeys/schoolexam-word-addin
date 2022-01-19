import WordPersistable from "./WordPersistable";
import IQrCode from "./IQrCode";

/**
 * Collection of the two required QR-Codes that is persisted in the Word document as a custom property.
 */
export default class QrCode extends WordPersistable<QrCode> implements IQrCode {
  propertyKey = "qrcode-data";

  /** The ID of the {@link Word.ContentControl} associated with the page QR-Code */
  private _footerCcId: number;

  /** The ID of the {@link Word.ContentControl} associated with the student QR-Code */
  private _headerCcId: number;

  /**
   * @inheritDoc
   * @param value The new ID of the {@link Word.ContentControl} associated with the page QR-Code
   */
  set footer(value: number) {
    this._footerCcId = value;
  }

  /**
   * @inheritDoc
   * @param value The new ID of the {@link Word.ContentControl} associated with the student QR-Code
   */
  set header(value: number) {
    this._headerCcId = value;
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
  footerIsPresent(): boolean {
    return this._footerCcId != null;
  }

  /**
   * @inheritDoc
   */
  titleIsPresent(): boolean {
    return this._headerCcId != null;
  }

  /**
   * @inheritDoc
   */
  bothArePresent(): boolean {
    return this.titleIsPresent() && this.footerIsPresent();
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
