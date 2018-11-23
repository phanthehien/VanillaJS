function guid()
{
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function getSubString(text, length = 30) {
    if (text) {
        return text.slice(0, length) + '...';
    }

    return text;
}

function formatDate(date){
    const dd = date.getDate();
    const mm = date.getMonth()+1;
    const yy = date.getFullYear();

    return yy + "-" + mm + "-" + dd;
}