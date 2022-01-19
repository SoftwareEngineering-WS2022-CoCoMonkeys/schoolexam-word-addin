/**
 * A generic Date Transfer Object (DTO).
 * Must be able to convert to internal model class.
 */
export default interface IDTO<T> {
  /**
   * Create model object from DTO.
   */
  toModel(): T;
}
