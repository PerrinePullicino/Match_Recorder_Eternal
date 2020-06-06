const { GoogleSpreadsheet } = require('google-spreadsheet');

export const fetchMainDocument = async () => {
    const requiredDoc = new GoogleSpreadsheet(process.env.REACT_APP_SPREADSHEET_URL_ID);
    // If not working, see: https://github.com/theoephraim/node-google-spreadsheet/issues/117
    requiredDoc.useServiceAccountAuth({
        client_email: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY,
    });

    await requiredDoc.loadInfo(); // loads document properties and worksheets
    return requiredDoc;
};