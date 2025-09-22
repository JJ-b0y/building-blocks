export function formatDate(date) {
    return date.toLocaleDateString("en-NG", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
};