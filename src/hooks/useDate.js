const getDate = () => {
    const getYear = new Date().getFullYear()
    return getYear === 2020 ? getYear : '2020 - ' + getYear
}

export default getDate