import * as React from 'react';
import { fetchMainDocument } from '../../modules/spreadheetHandling/fetchMainDocument';
import { fetchSheetByTitle } from '../../modules/spreadheetHandling/fetchSheetByTitle';
import { decksSheetTitle } from '../../constants/sheets-titles';
import './DeckSelection.scss';
import { decksUsedSheetHeader } from '../../constants/sheets-headers';
import { useAsync } from 'react-async';

const getExistingDecksTitle = async () : Promise<string[]>=> {
    const requiredDoc = await fetchMainDocument();

    const existingDecksSheet = fetchSheetByTitle(requiredDoc, decksSheetTitle);
    const rows = await existingDecksSheet.getRows();

    return rows.map(
        (row: any) => row[decksUsedSheetHeader[0]]
    );
};

export const DeckSelection = () : JSX.Element => {
    const { data, error, isLoading } = useAsync({ promiseFn: getExistingDecksTitle })
    if (isLoading) return <div>{"Loading..."}</div>
    if (error) return <div>{`Something went wrong: ${error.message}`}</div>
    if(data) {
        return (
            <div>
                {data.map(
                    (deck: React.ReactNode, index: any) => <div key={`${deck}-${index}`}>{deck}</div>
                )}
            </div>
        );
    } else {
        return <div>Fallback - Ideally, we should never get here.</div>
    }
};