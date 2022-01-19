/**
 * A task that has an associated region in the document.
 */
export default interface ITask {
  /**
   * The unique (UUID) of this task
   */
  readonly id: string;
  /** The human-readable display name of this task. Usually includes the index of this task within the document task sequence */
  readonly title: string;
  /** The maximum number of ponts achievable for this task */
  readonly maxPoints: number;

  /**
   * Asynchronously ump to the position of this task in the document.
   */
  jumpToAsync(): Promise<void>;

  /**
   * Asynchronously edit a field of this task.
   * @param fieldName The name of the field to edit.
   * @param newValue The new value of the field.
   */
  editAsync(fieldName: string, newValue: string | number): Promise<void>;
}
