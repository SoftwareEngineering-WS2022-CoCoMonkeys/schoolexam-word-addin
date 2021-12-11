export class Task {

  constructor(globaltaskId, localTaskId, maxPoints, ccId) {
    this.globalTaskId = globaltaskId;
    this.localTaskId = localTaskId;
    this.maxPoints = maxPoints;
    this.ccId = ccId;
  }

  localTaskId: string;
  readonly globalTaskId: string;
  readonly maxPoints: number;
  ccId: number;

  toHtmlTableRow(): HTMLTableRowElement {
    let html = `<tr id="task-${this.localTaskId}">
      <td class="mdl-data-table__cell--non-numeric">${this.localTaskId}</td>
      <td class="mdl-data-table__cell--non-numeric">${this.globalTaskId}</td>
      <td>${this.maxPoints}</td>
      </tr`;
    var template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild as HTMLTableRowElement;
  }
}
