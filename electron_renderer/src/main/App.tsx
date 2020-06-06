import React from 'react';
import logo from './logo.svg';
import './App.scss';

const { GoogleSpreadsheet } = require('google-spreadsheet');

const accessSpreadsheet = async () => {
    const requiredDoc = new GoogleSpreadsheet(process.env.REACT_APP_SPREADSHEET_URL_ID);
    
    // If not working, see: https://github.com/theoephraim/node-google-spreadsheet/issues/117
    requiredDoc.useServiceAccountAuth({
        client_email: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY,
    });

    await requiredDoc.loadInfo(); // loads document properties and worksheets
    
    console.log(requiredDoc.sheetsByIndex.map((doc: { title: string; }) => doc.title).includes("Decks"));
    // await requiredDoc.updateProperties({ title: 'Eternal Climbing' });
    
    // const sheet = requiredDoc.sheetsByIndex[0]; // or use doc.sheetsById[id]
    // console.log(sheet.title);
    // console.log(sheet.rowCount);
    // const rows = await sheet.getRows();
    // console.log(rows);
    // await rows[1].delete(); // delete a row
}


const App = () => {
    accessSpreadsheet();
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Re-edit <code>src/App.js</code> and save to reload.
        </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
        </a>
            </header>
        </div>
    );
}

export default App;
