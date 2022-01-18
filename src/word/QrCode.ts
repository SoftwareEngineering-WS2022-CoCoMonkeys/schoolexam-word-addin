import WordPersistable from "./WordPersistable";
import IQrCode from "./IQrCode";

export default class QrCode extends WordPersistable<QrCode> implements IQrCode {
  async copyAsync(): Promise<QrCode> {
    const copy = Object.assign(new QrCode(), this) as QrCode;
    await copy.saveAsync();
    return copy;
  }

  propertyKey = "qrcode-data";

  private _footerCcId: number;

  get footerCcId(): number {
    return this._footerCcId;
  }

  private _headerCcId: number;

  set footer(value: number) {
    this._footerCcId = value;
  }

  set header(value: number) {
    this._headerCcId = value;
  }

  get headerCcId(): number {
    return this._headerCcId;
  }

  getFooterContentControl(context: Word.RequestContext): Word.ContentControl {
    return context.document.contentControls.getByIdOrNullObject(this._footerCcId);
  }

  getTitleContentControl(context: Word.RequestContext): Word.ContentControl {
    return context.document.contentControls.getByIdOrNullObject(this._headerCcId);
  }

  footerIsPresent(): boolean {
    return this._footerCcId != null;
  }

  titleIsPresent(): boolean {
    return this._headerCcId != null;
  }

  bothArePresent(): boolean {
    return this.titleIsPresent() && this.footerIsPresent();
  }

  init(): void {
    return;
  }

  reviver(key: string, value: unknown): unknown {
    if (key === "") {
      return Object.assign(new QrCode(), value);
    }
    return value;
  }

  newEmpty(): QrCode {
    return new QrCode();
  }

  async copy(): Promise<QrCode> {
    const copy = new QrCode();
    copy._footerCcId = this._footerCcId;
    copy._headerCcId = this._headerCcId;
    await copy.saveAsync();
    return copy;
  }

  equals(other: unknown): boolean {
    if (other == null) {
      return false;
    }
    if (this === other) {
      return true;
    }
    if (typeof this !== typeof other) {
      return this == other;
    }
    return this._footerCcId === (other as QrCode)._footerCcId && this._headerCcId === (other as QrCode)._headerCcId;
  }
}
