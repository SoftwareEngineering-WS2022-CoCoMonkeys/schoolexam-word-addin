import Exam from "../../../model/Exam";
import Build from "../../../model/Build";
import ITaskList from "../../../word/ITaskList";
import ServerError from "./ServerError";

/**
 * Repository that grants access to {@link Exam}-related functions.
 */
export default interface IExamsRepository {
  /**
   * Asynchronously get available exams.
   * @returns The list of exams (that the user is allowed to view) wrapped in a Promise.
   */
  getExams(): Promise<Exam[]>;

  /**
   * Asynchronously trigger the build of an {@link Exam}.
   * @param examId The ID of the exam to build.
   * @returns The data resulting from the build wrapped in Promise.
   */
  getBuild(examId: string): Promise<Build>;

  /**
   * Asynchronously Sset the PDF template and task metadata for an {@link Exam}.
   * @param examId The ID of the targeted exam.
   * @param taskPdf The PDF template to upload.
   * @param taskList Information about the tasks in this exam.
   * @returns The response wrapped in a promise.
   */
  setTaskPdf(examId: string, taskPdf: string, taskList: ITaskList): Promise<unknown>;

  /**
   * Asynchronously remove the build data for an {@link Exam} that is already {@link ExamStatus.SubmissionReady}.
   * @param examId The ID of the targeted exam.
   * @returns The response wrapped in a promise.
   */
  clean(examId: string): Promise<unknown>;
}
