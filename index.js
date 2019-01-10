const fetch = require('node-fetch');

const url = 'https://ghibliapi.herokuapp.com/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49';
const url2 = 'https://ghibliapi.herokuapp.com/films/12cfb892-aac0-4c5b-94af-521852e46d6a';

function doItPromises() {
    return fetch(url)
        .then(res => res.json())
        .then(data => {
            return fetch(url2)
                .then(res => res.json())
                .then(data2 => [data, data2])
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
}

// literal translation of doItPromises
// you can see how the nesting is still messy but improved a bit by async/await over the Promises version
async function doItAsync() {
    try {
        let response = await fetch(url);
        const data = await response.json();

        try {
            response = await fetch(url2);
            const data2 = await response.json();

            return [data, data2];
        }
        catch (err) {
            console.log(err);
        }
    }
    catch (err) {
        console.error(err);
    }
}

// cleaner translation of doItPromises; the nested error handling is not usually necessary
async function doItAsyncCleanly() {
    try {
        let response = await fetch(url);
        const data = await response.json();

        response = await fetch(url2);
        const data2 = await response.json();

        return [data, data2];
    }
    catch (err) {
        console.log(err);
    }
}

async function gotcha() {
    // If you are waiting for multiple things that can run in parallel, do NOT do this:
    // const foo = await fooThing();
    // const bar = await barThing();
    // const baz = await bazThing();
    // If you await each one, then you are blocking each call until the previous one completes.

    // Do this instead:
    const foo = fooThing();
    const bar = barThing();
    const baz = bazThing();

    const [fooResult, barResult, bazResult] = await Promise.all([foo, bar, baz]);

    // do something with results
}



function shouldThrowAnError() {
    return Promise.reject(new Error('Oops'));
}

async function throwsAnErrorSynchronously() {
    throw new Error('Oops');
}

module.exports = {
    doItAsync,
    doItPromises,
    shouldThrowAnError,
    throwsAnErrorSynchronously
};
