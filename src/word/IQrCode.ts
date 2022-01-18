export default interface IQrCode {
  footerIsPresent(): boolean;

  titleIsPresent(): boolean;

  bothArePresent(): boolean;

  set footer(value: unknown);

  set header(value: unknown);
}
