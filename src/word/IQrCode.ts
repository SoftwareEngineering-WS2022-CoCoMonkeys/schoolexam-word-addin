/**
 * Collection of the two required QR-Codes.
 */
export default interface IQrCode {
  /**
   * @returns Whether the required page QR-Code in the footer is present.
   */
  pageQrCodeIsPresent(): boolean;

  /**
   * @returns Whether the required student QR-Code on the front page / header is present.
   */
  studentQrCodeIsPresent(): boolean;

  /**
   * @returns Whether both required QR-Codes are present.
   */
  bothArePresent(): boolean;

  /**
   * @param value The new location of the page QR-Code.
   */
  set pageQrCode(value: unknown);

  /**
   * @param value The new location of the student QR-Code.
   */
  set studentQrCode(value: unknown);
}
