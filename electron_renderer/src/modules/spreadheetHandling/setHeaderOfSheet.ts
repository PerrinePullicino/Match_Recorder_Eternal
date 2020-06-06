export const setHeaderOfSheet = (sheetToFormat: any, headerToUse: string[]) => {
    if(sheetToFormat.headerValues !== headerToUse) {
        sheetToFormat.setHeaderRow(headerToUse);   
    }
};