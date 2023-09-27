/*Using promisify, modify the function displaySchoolValue to use ES6 async / await
*/

import redis from 'redis';
const { promisify } = require('util');

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

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

async function displaySchoolValue(schoolName) {
  const asyncGet = promisify(client.get).bind(client);
  const res = await asyncGet(schoolName);
  console.log(res);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
