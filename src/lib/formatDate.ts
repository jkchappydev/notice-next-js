export function formatDate(date: Date) {
    const isToday = date.toDateString() === new Date().toDateString();

    return isToday
        ? date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: false})
        : date.toLocaleDateString();
}