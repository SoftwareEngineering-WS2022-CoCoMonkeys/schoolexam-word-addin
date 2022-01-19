/**
 * A generic Date Transfer Object (DTO).
 * Must be able to convert to internal model class.
 */
export default interface IDTO<T> {
  toModel(): T;
}
