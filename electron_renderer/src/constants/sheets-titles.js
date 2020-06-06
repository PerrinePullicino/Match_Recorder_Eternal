export const decksSheetTitle = "My Decks";

export const currentMonthSheetTitle = () => {
    const date = new Date();
    const month = date.toLocaleString('default', { month: 'long', year: 'numeric' }); // Month YYYY

    return month;
};