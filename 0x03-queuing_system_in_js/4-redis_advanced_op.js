/* Create Hash:
Using hset, let’s store the following:
The key of the hash should be HolbertonSchools
It should have a value for:
Portland=50
Seattle=80
New York=20
Bogota=20
Cali=40
Paris=2
Make sure you use redis.print for each hset
Display Hash:
Using hgetall, display the object stored in Redis. It should return the following:
*/

import redis from 'redis';

const client = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err.message}`);
});

function setNewDocument(hashName, key, value) {
  client.hset(hashName, key, value, redis.print);
}

function displayDocumentValue(hashName, key) {
  client.hget(hashName, key, (err, res) => {
    console.log(res);
  });
}

const hashName = 'HolbertonSchools';
const hash = {
  Portland: 50,
  Seattle: 80,
  NewYork: 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2,
};

Object.keys(hash).forEach((key) => {
  setNewDocument(hashName, key, hash[key]);
});

client.hgetall(hashName, (err, res) => {
  console.log(res);
});

client.quit();
