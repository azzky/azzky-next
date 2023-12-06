const prepareContent = (str) => {
    if (str.includes('<p>')) {
        str = str.replace('<p>','').split('').reverse().join('').replace('>p/<','').split('').reverse().join('');
    }
    if (str.includes('\n')) {
        str = str.replace(/\n/g, '<br/>');
    }

    return str;
};

export default prepareContent;