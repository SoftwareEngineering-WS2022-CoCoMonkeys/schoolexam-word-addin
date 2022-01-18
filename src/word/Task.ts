import ITask from "./ITask";

export default class Task implements ITask {
  readonly id: string;
  title: string;
  maxPoints: number;

  private readonly _ccId: number;
  private _startLinkCcId: number | null;
  private _endLinkCcId: number | null;

  constructor(
    id: string,
    title: string,
    maxPoints: number,
    ccId: number,
    startLinkCcId?: number | null,
    endLinkCcId?: number | null
  ) {
    this.id = id;
    this.title = title;
    this.maxPoints = maxPoints;
    this._ccId = ccId;
    this._startLinkCcId = startLinkCcId;
    this._endLinkCcId = endLinkCcId;
  }

  get ccId(): number {
    return this._ccId;
  }

  jumpToAsync(): Promise<void> {
    return Word.run(async (context) => this.jumpTo(context));
  }

  editAsync(fieldName: string, newValue: string | number): Promise<void> {
    return Word.run(async (context) => this.edit(context, fieldName, newValue));
  }

  async jumpTo(context: Word.RequestContext): Promise<void> {
    const contentControl = this.getAssociatedContentControl(context);
    const range = contentControl.getRange(Word.RangeLocation.whole);
    range.select(Word.SelectionMode.select);

    await context.sync();
  }

  async edit(context: Word.RequestContext, fieldName: string, newValue: string | number): Promise<void> {
    switch (fieldName) {
      case "title": {
        this.title = newValue as string;
        const contentControl = this.getAssociatedContentControl(context);
        contentControl.title = newValue.toString();
        break;
      }
      case "maxPoints": {
        this.maxPoints = newValue as number;
        break;
      }
      default:
        console.warn(`Unknown task field: ${fieldName}`);
    }

    await context.sync();
  }

  async prepareForDeletion(context: Word.RequestContext): Promise<void> {
    // delete associated content control
    const contentControl = this.getAssociatedContentControl(context);
    contentControl.cannotDelete = false;

    // keep content
    contentControl.delete(true);

    await context.sync();
  }

  getAssociatedContentControl(context: Word.RequestContext): Word.ContentControl | null {
    return context.document.contentControls.getByIdOrNullObject(this._ccId);
  }

  getStartLinkContentControl(context: Word.RequestContext): Word.ContentControl | null {
    return context.document.contentControls.getByIdOrNullObject(this._startLinkCcId);
  }

  getEndLinkContentControl(context: Word.RequestContext): Word.ContentControl | null {
    return context.document.contentControls.getByIdOrNullObject(this._endLinkCcId);
  }

  async removeLinkContentControls(context: Word.RequestContext): Promise<void> {
    if (this._startLinkCcId != null) {
      const startLinkContentControl = this.getStartLinkContentControl(context);
      if (startLinkContentControl == null) {
        console.warn(`Start link content control with id ${this._startLinkCcId} does not exist`);
      } else {
        // Delete with content
        startLinkContentControl.delete(false);
      }
    }
    if (this._endLinkCcId != null) {
      const endLinkContentControl = this.getEndLinkContentControl(context);
      if (endLinkContentControl == null) {
        console.warn(`End link content control with id ${this._endLinkCcId} does not exist`);
      } else {
        // Delete with content
        endLinkContentControl.delete(false);
      }
    }
    await context.sync();
  }

  async insertLinkContentControls(context: Word.RequestContext): Promise<void> {
    const contentControl = this.getAssociatedContentControl(context);

    if (contentControl == null) {
      console.error(`Task content control with id ${this._ccId} does not exist`);
      return;
    }

    // 1. Insert content controls at start and end
    const startLinkContentControl = contentControl.getRange(Word.RangeLocation.start).insertContentControl();
    const endLinkContentControl = contentControl.getRange(Word.RangeLocation.end).insertContentControl();

    // 2. Set title and tag accordingly
    startLinkContentControl.appearance = Word.ContentControlAppearance.hidden;
    startLinkContentControl.tag = "task-start-link";
    startLinkContentControl.title = "task-start-link-" + this.id;

    endLinkContentControl.appearance = Word.ContentControlAppearance.hidden;
    endLinkContentControl.tag = "task-end-link";
    endLinkContentControl.title = "task-end-link-" + this.id;

    /*
     3. Insert anchor element.
     Hyperlinks emerged as the best alternative to create markers inside the PDF document generated by Word.
     Bookmarks, although preferable, are not exported properly.
     */
    startLinkContentControl.insertHtml(
      `<a style="text-decoration: none; font-size:0.01em; transform: translate(-1px)" href="task-start-${this.id}">&nbsp;</a>`,
      Word.InsertLocation.start
    );

    endLinkContentControl.insertHtml(
      `<a style="text-decoration: none; font-size:0.01em; transform: translate(-1px)" href="task-end-${this.id}">&nbsp;</a>`,
      Word.InsertLocation.end
    );

    // 4. Remember IDs for subsequent deletion
    startLinkContentControl.load("id");
    endLinkContentControl.load("id");

    await context.sync();

    this._startLinkCcId = startLinkContentControl.id;
    this._endLinkCcId = endLinkContentControl.id;
  }
}
