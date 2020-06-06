export const fetchSheetByTitle = (document: any, title: string) => {
    return document.sheetsByIndex.filter((sheet: { title: string; }) => sheet.title === title).length > 0 ? 
        document.sheetsByIndex.filter((sheet: { title: string; }) => sheet.title === title)[0] : null;
}