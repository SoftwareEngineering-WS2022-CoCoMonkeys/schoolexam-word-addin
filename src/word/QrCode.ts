import WordPersistable from "./WordPersistable";

export default class QrCode extends WordPersistable<QrCode> {
  async setFooterCcIdAndCopy(value: number): Promise<QrCode> {
    this._footerCcId = value;
    return await this.copy();
  }

  async setTitleCcIdAndCopy(value: number): Promise<QrCode> {
    this._titleCcId = value;
    return await this.copy();
  }

  propertyKey = "qrcode-data";

  get footerCcId(): number {
    return this._footerCcId;
  }

  get titleCcId(): number {
    return this._titleCcId;
  }

  private _footerCcId: number;
  private _titleCcId: number;

  getFooterContentControl(context: Word.RequestContext): Word.ContentControl {
    return context.document.contentControls.getByIdOrNullObject(this._footerCcId);
  }

  getTitleContentControl(context: Word.RequestContext): Word.ContentControl {
    return context.document.contentControls.getByIdOrNullObject(this._titleCcId);
  }

  footerIsPresent(): boolean {
    return this._footerCcId != null;
  }

  titleIsPresent(): boolean {
    return this._titleCcId != null;
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
    copy._titleCcId = this._titleCcId;
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
    return this._footerCcId === (other as QrCode)._footerCcId && this._titleCcId === (other as QrCode)._titleCcId;
  }
}
