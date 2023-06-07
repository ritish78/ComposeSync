const date = require('date-and-time');

export default function formatDate(dateToFormat, hours = true) {
    let pattern = date.compile('ddd at HH:mm, (MM-DD-YYYY)');
    if (!hours) {
        pattern = date.compile('ddd, MM-DD-YYYY');
    }
    return date.format(new Date(dateToFormat), pattern);
}