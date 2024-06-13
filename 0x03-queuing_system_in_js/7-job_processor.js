const kue = require('kue')
const queue = kue.createQueue()

const blacklistedNumbers = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done){
    job.progress(0, 100)
    if (blacklistedNumbers.includes(phoneNumber)){
        done(Error(`Phone number ${phoneNumber} is blacklisted`))
        return
    }
    job.progress(50, 100)
    done()
}

queue.process('push_notification_code_2', 2, (job, done) => {
    const {phoneNumber, message} = job.data

    sendNotification(phoneNumber, message, job, done)
})
