/* create a redis client:
On connect, it should log the message Redis client connected to the server
On error, it should log the message Redis client not connected to the server: ERROR MESSAGE
It should subscribe to the channel holberton school channel
When it receives message on the channel holberton school channel, it should log the message to the console
When the message is KILL_SERVER, it should unsubscribe and quit
*/

const redis = require('redis');

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

client.subscribe('holberton school channel');

client.on('message', (channel, message) => {
  if (message === 'KILL_SERVER') {
    client.unsubscribe(channel);
    client.quit();
  }
  console.log(message);
});
