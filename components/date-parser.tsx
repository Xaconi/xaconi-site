export default function DateParser(props: { date: string | Date }) {
    // Original format - yyyy-mm-dd || New format - dd/mm/yyyy
    const originalDate = new Date(props.date);
    const formattedDate = `${originalDate.getDate()}/${('0' + (originalDate.getMonth() + 1)).slice(-2)}/${originalDate.getFullYear()}`;
    return (
        <>
            {formattedDate}
        </>
    );
}