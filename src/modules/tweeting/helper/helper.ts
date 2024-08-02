// for delaying the tasks
async function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { delay }