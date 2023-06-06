const date = require('date-and-time');

export default function formatDate(dateToFormat, hours = true) {
    let pattern = date.compile('ddd, MM DD YYYY HH:mm');
    if (!hours) {
        pattern = date.compile('ddd, MM DD YYYY');
    }
    return date.format(new Date(dateToFormat), pattern);
}