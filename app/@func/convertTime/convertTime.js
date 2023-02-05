function convertTime(text) {
    const time = new Date(text);

    const createAt = time.toLocaleDateString();

    return createAt;
}

export default convertTime;
