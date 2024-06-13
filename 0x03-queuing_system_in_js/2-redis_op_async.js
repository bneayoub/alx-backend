import redis from 'redis';
import {promisify} from 'util'

const client = redis.createClient()
client.on('connect', () => {
    console.log('Redis client connected to the server');
});
client.on('error', (err) => {
    console.error(`Redis client not connected to the server: ${err.message}`)
})

function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print)
}

const getAsy = promisify(client.get).bind(client)

async function displaySchoolValue(schoolName){
    console.log(await getAsy(schoolName))
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
