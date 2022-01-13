export default interface IExam {
  get examId(): string;

  get status(): string | undefined;

  get title(): string | undefined;

  get dateOfExam(): Date | undefined;

  get subject(): string | undefined;

  equals(other: unknown): boolean;
}
