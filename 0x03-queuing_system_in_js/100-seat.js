const kue = require('kue');
const queue = kue.createQueue();
const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

const app = express();
const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
});

const getAsync = promisify(client.get).bind(client);

const reserveSeat = (number) => {
    client.set('available_seats', number);
};

const getCurrentAvailableSeats = async () => {
    const seats = await getAsync('available_seats');
    return seats;
};

reserveSeat(50);
let reservationEnabled = true;

app.get('/available_seats', async (req, res) => {
    const seats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats: seats });
});

app.get('/reserve_seat', async (req, res) => {
    if (!reservationEnabled) {
        res.json({ status: 'Reservation are blocked' });
    } else {
        const job = queue.create('reserve_seat', {}).save((err) => {
            if (err) {
                res.json({ status: 'Reservation failed' });
            } else {
                res.json({ status: 'Reservation in process' });
            }
        });
        job.on('complete', () => {
            console.log(`Seat reservation job ${job.id} completed`);
        });
        job.on('failed', (err) => {
            console.log(`Seat reservation job ${job.id} failed: ${err}`);
        });
    }
});

app.get('/process', async (req, res) => {
    res.json({ status: 'Queue processing' });
    queue.process('reserve_seat', async (job, done) => {
        const seats = await getCurrentAvailableSeats();
        if (seats <= 0) {
            reservationEnabled = false;
            done(new Error('Not enough seats available'));
        } else {
            reserveSeat(seats - 1);
            if (seats - 1 === 0) {
                reservationEnabled = false;
            }
            done();
        }
    });
});

app.listen(1245);

module.exports = app;
