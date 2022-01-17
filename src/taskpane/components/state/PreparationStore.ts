import { createHook, createStore } from "react-sweet-state";
import Exam from "../../../import_dto/Exam";
import IPreparationState from "./IPreparationState";
import QrCode from "../../../word/QrCode";
import Authentication from "../../../import_dto/Authentication";
import Build from "../../../import_dto/Build";

const preparationStore = createStore({
  // value of the store on initialisation
  initialState: <IPreparationState>{
    // Load from Word "storage"
    selectedExam: null,
    qrCode: new QrCode(),
    taskPdf: null,
    build: null,
  },
  // actions that trigger store mutation
  actions: {
    setSelectedExam(selectedExam: Exam) {
      return ({ setState, getState }) => {
        setState({
          ...getState(),
          selectedExam: selectedExam,
        });
      };
    },
    setTaskPdf(taskPdf: string) {
      return ({ setState, getState }) => {
        setState({
          ...getState(),
          taskPdf: taskPdf,
        });
      };
    },
    setFooterQrCodeCcId(footerCcId: number) {
      return async ({ setState, getState }) => {
        setState({
          ...getState(),
          qrCode: await getState().qrCode.setFooterCcIdAndCopy(footerCcId),
        });
      };
    },
    setTitleQrCodeCcId(titleCcId: number) {
      return async ({ setState, getState }) => {
        setState({
          ...getState(),
          qrCode: await getState().qrCode.setTitleCcIdAndCopy(titleCcId),
        });
      };
    },
    setBuild(build: Build) {
      return ({ setState, getState }) => {
        setState({
          ...getState(),
          build: build,
        });
      };
    },
    loadQrCode() {
      return async ({ setState, getState }) => {
        setState({
          ...getState(),
          qrCode: await getState().qrCode.load(),
        });
      };
    },
  },
  // optional, mostly used for easy debugging
  name: "preparationStore",
});

const usePrep = createHook(preparationStore);
export default usePrep;
