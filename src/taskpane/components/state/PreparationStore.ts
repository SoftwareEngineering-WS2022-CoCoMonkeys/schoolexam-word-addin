import { createHook, createStore } from "react-sweet-state";
import IPreparationState from "./IPreparationState";
import QrCode from "../../../word/QrCode";

const preparationStore = createStore({
  // value of the store on initialisation
  initialState: <IPreparationState>{
    // Load from Word "storage"
    qrCode: new QrCode(),
  },
  // actions that trigger store mutation
  actions: {
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
