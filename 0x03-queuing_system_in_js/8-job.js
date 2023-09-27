/* create a function named createPushNotificationsJobs:
It takes into argument jobs (array of objects), and queue (Kue queue)
If jobs is not an array, it should throw an Error with message: Jobs is not an array
For each job in jobs, create a job in the queue push_notification_code_3
When a job is created, it should log to the console Notification job created: JOB_ID
When a job is complete, it should log to the console Notification job JOB_ID completed
When a job is failed, it should log to the console Notification job JOB_ID failed: ERROR
When a job is making progress, it should log to the console Notification job JOB_ID PERCENT% complete
*/

import kue from 'kue';

const queue = kue.createQueue();

function sendNotification(phoneNumber, message) {
  console.log(
    `Sending notification to ${phoneNumber}, with message: ${message}`
  );
}

function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) throw Error('Jobs is not an array');
  jobs.forEach((job) => {
    const newJob = queue.create('push_notification_code_3', job);
    newJob
      .on('enqueue', () => {
        console.log(`Notification job created: ${newJob.id}`);
      })
      .on('complete', () => {
        console.log(`Notification job ${newJob.id} completed`);
      })
      .on('failed', (err) => {
        console.log(`Notification job ${newJob.id} failed: ${err}`);
      })
      .on('progress', (progress) => {
        console.log(
          `Notification job ${newJob.id} ${progress}% complete`
        );
      });
    newJob.save((err) => {
      if (!err) console.log(`Notification job created: ${newJob.id}`);
    });
  });
}

export { createPushNotificationsJobs as default, sendNotification, queue };
