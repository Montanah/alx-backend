/* Create an array jobs
Create a queue with Kue
Write a loop that will go through the array jobs and for each object:
Create a new job to the queue push_notification_code_2 with the current object
If there is no error, log to the console Notification job created: JOB_ID
On the job completion, log to the console Notification job JOB_ID completed
On the job failure, log to the console Notification job JOB_ID failed: ERROR
On the job progress, log to the console Notification job JOB_ID PERCENTAGE% complete
*/

const kue = require('kue');

const queue = kue.createQueue();

const jobs = [
  {
    phoneNumber: '4153518780',
    message: 'This is the code 1234 to verify your account',
  },
  {
    phoneNumber: '4153518781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153518743',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153538781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153118782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4153718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4159518782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4158718781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4153818782',
    message: 'This is the code 4321 to verify your account',
  },
  {
    phoneNumber: '4154318781',
    message: 'This is the code 4562 to verify your account',
  },
  {
    phoneNumber: '4151218782',
    message: 'This is the code 4321 to verify your account',
  },
];

jobs.forEach((job) => {
  const jobCreated = queue.create('push_notification_code_2', job).save((err) => {
    if (!err) console.log(`Notification job created: ${jobCreated.id}`);
  });

  jobCreated.on('complete', () => {
    console.log(`Notification job ${jobCreated.id} completed`);
  });

  jobCreated.on('failed', (err) => {
    console.log(`Notification job ${jobCreated.id} failed: ${err}`);
  });

  jobCreated.on('progress', (progress) => {
    console.log(`Notification job ${jobCreated.id} ${progress}% complete`);
  });
});
