export default interface ITask {
  get taskId(): string;

  get title(): string;

  get maxPoints(): number;

  get ccId(): number;

  equals(other: unknown): boolean;
}
