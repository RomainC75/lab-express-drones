// Iteration #1
const Drone = require('../models/Drone.model')
const openConnection = require('../db/index')
const {default: mongoose } = require('mongoose')
const { create } = require('../models/Drone.model')

const initialDrones = [
    {
        name: "Atomics MQ-9 Reaper",
        propellers: 4,
        maxSpeed: 18
    },
    {
        name: "GigaJet",
        propellers: 5,
        maxSpeed: 25
    },
    {
        name: "DumboDrones",
        propellers: 3,
        maxSpeed: 15
    }
]

async function seedDrones (){
    try{
        await openConnection()
        const createdSDrones = await Drone.create(initialDrones)
        console.log('created Drones ', createdSDrones)
    }catch(e){
        console.log('seedDrones Error!')
    }
    mongoose.connection.close()
}

seedDrones()