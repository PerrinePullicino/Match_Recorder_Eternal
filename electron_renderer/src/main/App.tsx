import React from 'react';

import { decksUsedSheetHeader, currentMonthSheetHeader } from '../constants/sheets-headers';
import { fetchSheetByTitle } from '../modules/spreadheetHandling/fetchSheetByTitle';
import { setHeaderOfSheet } from '../modules/spreadheetHandling/setHeaderOfSheet';
import { fetchMainDocument } from '../modules/spreadheetHandling/fetchMainDocument';

import { decksSheetTitle, currentMonthSheetTitle } from '../constants/sheets-titles';
import { createNewSheetWithInfos } from '../modules/spreadheetHandling/createNewSheetWithInfos';

import { DeckSelection } from '../panels/DeckSelection/DeckSelection';
import './App.scss';

import { useAsync } from 'react-async';

const initSpreadsheet = async () => {
    const requiredDoc = await fetchMainDocument();

    const sheetsToInitWithInfos = [
        {
            title: decksSheetTitle,
            headers: decksUsedSheetHeader
        },
        {
            title: currentMonthSheetTitle(),
            headers: currentMonthSheetHeader
        }
    ];

    sheetsToInitWithInfos.forEach(
        ({title, headers}) => {
            const sheetToInit = fetchSheetByTitle(requiredDoc, title);

            if(sheetToInit == null) {
                console.log(`${title} didnt exist, creating`);
                createNewSheetWithInfos(requiredDoc, title, headers);
            } else {
                console.log(`${title} exists, formatting`);
                setHeaderOfSheet(sheetToInit, headers);
            }
        }
    );
}

const App = () => {
    
    const { error, isLoading } = useAsync({ promiseFn: initSpreadsheet })
    if (isLoading) return <div>{"Loading..."}</div>
    if (error) return <div>{`Something went wrong: ${error.message}`}</div>

    return (
        <DeckSelection />
        // <div>Whatever</div>
    );
}

export default App;
