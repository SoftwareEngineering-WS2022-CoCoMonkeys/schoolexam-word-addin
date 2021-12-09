export class Task {
  constructor(taskId, maxPoints, contentControl) {
    this.taskId = taskId;
    this.maxPoints = maxPoints;
    this.#cc = contentControl;
  }
  readonly taskId: string;
  readonly maxPoints: number;
  #cc: Word.ContentControl;


  bindContentControl(contentControl: Word.ContentControl) {
    this.#cc = contentControl;
  }
}
