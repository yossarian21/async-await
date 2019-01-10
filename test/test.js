const { expect } = require('chai');
const { doItAsync, doItPromises, shouldThrowAnError, throwsAnErrorSynchronously } = require('../index');

describe('tests', function () {
    describe('promises', function () {
        it('does promises', function () {
            return doItPromises()
                .then(([movie1, movie2]) => {
                    expect(movie1.title).to.equal('My Neighbor Totoro');
                    expect(movie2.title).to.equal('Grave of the Fireflies');
                });
        });
    });

    describe('async', function () {
        it('can handle async await', async function () {
            const [movie1, movie2] = await doItAsync();

            expect(movie1.title).to.equal('My Neighbor Totoro');
            expect(movie2.title).to.equal('Grave of the Fireflies');
        });
    });

    describe('mix & match', function () {
        it('can handle an async function as a promise', function () {
            return doItAsync()
                .then(([movie1, movie2]) => {
                    expect(movie1.title).to.equal('My Neighbor Totoro');
                    expect(movie2.title).to.equal('Grave of the Fireflies');
                });
        });

        it('can handle a function returning a promise', async function () {
            const [movie1, movie2] = await doItPromises();

            expect(movie1.title).to.equal('My Neighbor Totoro');
            expect(movie2.title).to.equal('Grave of the Fireflies');
        });
    });

    describe('expecting errors', function () {
        it('the old way', function () {
            return shouldThrowAnError()
                .then(
                    () => expect.fail(),
                    err => {
                        expect(err.message).to.equal('Oops');
                    }
                );
        });

        it('the async await way', async function () {
            try {
                await shouldThrowAnError();
                expect.fail();
            }
            catch (err) {
                expect(err.message).to.equal('Oops');
            }
        });

        it('async keyword turns sync errors into rejected promises', function () {
            return throwsAnErrorSynchronously()
                .then(
                    () => expect.fail(),
                    err => {
                        expect(err.message).to.equal('Oops');
                    }
                );
        });
    });
});
