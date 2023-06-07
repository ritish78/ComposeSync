const date = require('date-and-time');

export default function formatDate(dateToFormat, hours = true) {
    let pattern = date.compile('ddd at HH:mm, (DD-MMM-YYYY)');
    if (!hours) {
        pattern = date.compile('ddd, DD-MMM-YYYY');
    }
    return date.format(new Date(dateToFormat), pattern);
}