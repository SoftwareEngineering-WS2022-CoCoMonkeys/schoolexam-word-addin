export default interface ITask {
  readonly id: string;
  readonly title: string;
  readonly maxPoints: number;

  jumpToAsync(): Promise<void>;

  editAsync(fieldName: string, newValue: string | number): Promise<void>;
}
