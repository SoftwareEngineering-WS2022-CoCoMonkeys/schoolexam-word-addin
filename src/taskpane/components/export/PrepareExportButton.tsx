import { DefaultButton } from "@fluentui/react";
import React = require("react");

export interface IPrepareExportButtonProps {
    exportButtonDisabled?: boolean;
    setExportButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  }

export default function PrepareExportButton(_props: any) {

    function prepareDocumentForExport(){
        Word.run(async (context) => {
            var contentControlCollection = context.document.body.getRange().contentControls;
            contentControlCollection.load();
            await context.sync();
            const allContentControls = contentControlCollection.items;
            for(var contentControl of allContentControls){
                contentControl.insertText("#" + contentControl.title,Word.InsertLocation.start);
                contentControl.insertText("#" + contentControl.title,Word.InsertLocation.end);
            }
            await context.sync();
        });
        Office.context.ui.displayDialogAsync("https://localhost:3000/exportPreparedDialog.html",
            {height: 35, width: 20, displayInIframe: true},function (result) {
                if (result.status === Office.AsyncResultStatus.Succeeded) {
                    var dataValue = result.value; // Get selected data.
                    console.log('Selected data is ' + dataValue);
                } else {
                    var err = result.error;
                    console.log(err.name + ": " + err.message);
                }
            });
        _props.setExportButtonDisabled(false)
        
    }
    

    return (
        <div>
          <DefaultButton id="prepare-export-exam-btn" className="margin-btn" onClick={prepareDocumentForExport}  text="Dokumentenexport vorbereiten" />
        </div>
      );
}