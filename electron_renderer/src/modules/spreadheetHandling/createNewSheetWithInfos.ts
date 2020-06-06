import { setHeaderOfSheet } from './setHeaderOfSheet';

export const createNewSheetWithInfos = async (doc: any, title: string, header: string[]) => {
    const newSheet = await doc.addSheet({ title: title }); //create the sheet

    setHeaderOfSheet(newSheet, header); //add the correct header
};