export default function DateParser({ date }) {
    // Original format - yyyy-mm-dd || New format - dd/mm/yyyy
    const originalDate = new Date(date);
    const formattedDate = `${originalDate.getDate()}/${('0' + (originalDate.getMonth()+1)).slice(-2)}/${originalDate.getFullYear()}`;
    return (
        <>
            { formattedDate }
        </>
    );
}