export class Task {

    constructor(taskId, parentTaskId, maxPoints, ccId) {
        this.taskId = taskId;
        this.parentTaskId = parentTaskId;
        this.maxPoints = maxPoints;
        this.ccId = ccId;
    }

    taskId: string;
    parentTaskId: string | null;
    maxPoints: number;
    ccId: number;


    equals(other: any): boolean {
        if (this === other) {
            return true;
        }
        if (typeof (this) !== typeof (other)) {
            return this == other;
        }
        return this.taskId == (other as Task).taskId;
    }
}
