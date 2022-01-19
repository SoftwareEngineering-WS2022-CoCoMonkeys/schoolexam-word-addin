import { createHook, createStore } from "react-sweet-state";
import TaskList from "../../../word/TaskList";
import Task from "../../../word/Task";
import IDocumentState from "./IDocumentState";
import QrCode from "../../../word/QrCode";
import ITaskList from "../../../word/ITaskList";
import { getQrCodeBase64, getTitlePlaceHolderBase64 } from "../structural/StructuralUtil";

// ACTIONS
/**
 * @param taskList The new TaskList.
 */
const setTaskList = (taskList: ITaskList) => {
  return async ({ setState }) => {
    console.log("set tasklist to", taskList);
    setState({
      taskList,
    });
  };
};

/**
 * @param qrCode The new QrCode object.
 */
const setQrCode = (qrCode: QrCode) => {
  return async ({ setState }) => {
    setState({
      qrCode,
    });
  };
};

/**
 * Asynchronously load {@link ITaskList} and {@link QrCode} data persisted in the Word document.
 */
const load = () => {
  return async ({ getState, dispatch }) => {
    dispatch(setTaskList(await getState().taskList.load()));
    dispatch(setQrCode(await getState().qrCode.load()));
  };
};

/**
 * Asynchronously add a new task (from the current selection) to the {@link IDocumentState.taskList}.
 * @param maxPoints The maximum points achievable.
 */
const addTask = (maxPoints: number) => {
  return async ({ getState, dispatch }) => {
    await getState().taskList.addTaskFromSelectionAsync(maxPoints);
    dispatch(setTaskList(await getState().taskList.copyAsync()));
  };
};

/**
 * Asynchronously edit a task.
 * @param id The unique ID of the task to edit.
 * @param fieldName The name of the field to modify.
 * @param newValue The new value of the field.
 */
const editTask = (id: string, fieldName: string, newValue: string | number) => {
  return async ({ getState, dispatch }) => {
    const taskToEdit = getState().taskList.getTaskById(id);
    await taskToEdit.editAsync(fieldName, newValue);
    dispatch(setTaskList(await getState().taskList.copyAsync()));
  };
};

/**
 * Asynchronously delete a task from the {@link IDocumentState.taskList}.
 * @param taskToDelete The task to delete.
 */
const deleteTask = (taskToDelete: Task) => {
  return async ({ getState, dispatch }) => {
    await getState().taskList.deleteTaskAsync(taskToDelete);
    dispatch(setTaskList(await getState().taskList.copyAsync()));
  };
};

/**
 * Asynchronously update the titles of all tasks from the {@link IDocumentState.taskList} so they are indexed in the
 * order they appear in the document.
 */
const updateTaskTitles = () => {
  return async ({ getState, dispatch }) => {
    await getState().taskList.updateTaskTitlesAsync();
    dispatch(setTaskList(await getState().taskList.copyAsync()));
  };
};

/**
 * @param footerCcId The ID of the {@link Word.ContentControl} to associate with the page QR-Code.
 */
const setFooterQrCode = (footerCcId: number) => {
  return async ({ getState, dispatch }) => {
    getState().qrCode.footer = footerCcId;
    dispatch(setQrCode(await getState().qrCode.copyAsync()));
  };
};

/**
 * @param headerCcId The ID of the {@link Word.ContentControl} to associate with the student QR-Code.
 */
const setHeaderQrCode = (headerCcId: number) => {
  return async ({ getState, dispatch }) => {
    getState().qrCode.header = headerCcId;
    dispatch(setQrCode(await getState().qrCode.copyAsync()));
  };
};

/**
 * Prepare for conversion to PDF.
 */
const prepareForConversion = () => {
  return async ({ getState }) => {
    await getState().taskList.prepareForConversion();
  };
};

/**
 * Tear down artifacts from PDF conversion.
 */
const afterConversion = () => {
  return async ({ getState }) => {
    await getState().taskList.afterConversion();
  };
};

/**
 * Asynchronously create an exemplary front page for the {@link Exam} represented by the current document.
 * @param examTitle The exam title.
 * @param examDate The exam date.
 * @param courseName The name of the course.
 */
const createFrontPage = (examTitle: string, examDate: Date, courseName: string) => {
  return async ({ dispatch }) => {
    const frontPageHtml =
      "<br> <div style='text-align:center'> <div style='font-size: x-large'>" +
      examTitle +
      " </div> <br> <br> " +
      courseName +
      " <br> " +
      String(examDate.toLocaleDateString("de-De") + "</div><br> <br> <br>");

    await Word.run(async (context) => {
      let tableParagraph = context.document.body.paragraphs.getFirst();
      // Word API bugs making access to the first element before a table element impossible
      // Null checks also not working here, therefore this unclean solution is the last possibility
      try {
        tableParagraph.parentTable.delete();
        await context.sync();
      } catch (e) {
        console.debug(e);
      } finally {
        // 1. Create table
        tableParagraph = context.document.body.paragraphs.getFirst();
        const table = tableParagraph.insertTable(1, 2, Word.InsertLocation.before, null);
        table.getBorder(Word.BorderLocation.all).type = "None";
        const leftSide = table.getCell(0, 0);
        leftSide.columnWidth = 30;
        leftSide.setCellPadding(Word.CellPaddingLocation.bottom, 1);

        // 2. Insert content control
        const contentControl = leftSide.body.insertContentControl();
        contentControl.appearance = Word.ContentControlAppearance.boundingBox;
        contentControl.tag = "title-qr-code";
        contentControl.title = "title-qr-code";

        // Warning: setting cannot edit breaks this content control
        contentControl.insertInlinePictureFromBase64(getTitlePlaceHolderBase64(), Word.InsertLocation.start);
        contentControl.inlinePictures.getFirst().hyperlink = "http://studentQrCode";

        // 3. Insert front page text
        const rightSide = table.getCell(0, 1);
        rightSide.columnWidth = 400;
        rightSide.body.insertHtml(frontPageHtml, Word.InsertLocation.start);
        rightSide.body.font.set({
          bold: true,
          size: 15,
        });

        await context.sync();

        // persist title QR Code id
        contentControl.load("id");
        await context.sync();
        dispatch(setHeaderQrCode(contentControl.id));
      }
    });
  };
};

/**
 * Asynchronously create the footer for the current document.
 *
 * This step has to take place before exporting the document because it embeds the vital page QR-Code.
 */
const createFooter = () => {
  return async ({ dispatch }) => {
    return Word.run(async (context) => {
      const footer = context.document.sections.getFirst().getFooter(Word.HeaderFooterType.primary);
      footer.clear();

      const contentControl = footer.getRange(Word.RangeLocation.start).insertContentControl();
      contentControl.appearance = Word.ContentControlAppearance.boundingBox;
      contentControl.tag = "footer-qr-code";
      contentControl.title = "footer-qr-code";

      // Warning: setting cannot edit breaks this content control
      await context.sync();

      const qrCode = getQrCodeBase64();
      // we CANNOT use the InlinePicture returned from this method as working with it leads to a GeneralException
      contentControl.insertInlinePictureFromBase64(qrCode, Word.InsertLocation.start);
      const qrCodePicture = contentControl.inlinePictures.getFirst();
      await context.sync();
      qrCodePicture.hyperlink = "http://pageQrCode";
      qrCodePicture.height = 30;

      // persist footer QR Code id
      contentControl.load("id");
      await context.sync();
      await dispatch(setFooterQrCode(contentControl.id));
    });
  };
};

/**
 * Asynchronously create the header for the current document.
 *
 * This step has to take place before exporting the document because it embeds the student QR-Code placeholder.
 */
const createHeader = () => {
  return async ({ dispatch }) => {
    return Word.run(async (context) => {
      const header = context.document.sections.getFirst().getHeader(Word.HeaderFooterType.primary);
      header.clear();

      const contentControl = header.getRange(Word.RangeLocation.start).insertContentControl();
      contentControl.appearance = Word.ContentControlAppearance.boundingBox;
      contentControl.tag = "header-qr-code-placeholder";
      contentControl.title = "header-qr-code-placeholder";

      // Warning: setting cannot edit breaks this content control

      await context.sync();

      const paragraph = contentControl.insertParagraph(">>>Platz für QR-Code<<<", Word.InsertLocation.start);
      // change color to grey
      paragraph.font.set({
        color: "grey",
      });

      await context.sync();

      // persist header QR Code id
      contentControl.load("id");
      await context.sync();
      await dispatch(setHeaderQrCode(contentControl.id));
    });
  };
};

// STORE INITIALIZATION
/**
 * The document MicroStore.
 */
const documentStore = createStore({
  initialState: <IDocumentState>{
    taskList: new TaskList(),
    qrCode: new QrCode(),
  },
  // PUBLIC ACTIONS
  actions: {
    load,
    addTask,
    editTask,
    deleteTask,
    updateTaskTitles,
    setFooterQrCode,
    setHeaderQrCode,
    prepareForConversion,
    afterConversion,
    createFrontPage,
    createFooter,
    createHeader,
  },
  name: "document-store",
});

/**
 * Custom React Hook that grants access to the document MicroStore.
 * In particular, exposes the {@link IDocumentState} and document-related actions.
 */
const useDocument = createHook(documentStore);
export default useDocument;

// SELECTORS
const tasks = (state: IDocumentState) => state.taskList;
/**
 * Custom React Hook that only exposes the task-related state and document-related actions.
 */
export const useTasks = createHook(documentStore, {
  selector: tasks,
});
/**
 * Custom React Hook that only exposes the QR-Code-related state and document-related actions.
 */
const qrCode = (state: IDocumentState) => state.qrCode;
export const useQrCode = createHook(documentStore, {
  selector: qrCode,
});
