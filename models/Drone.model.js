// Iteration #1
const { Schema, SchemaTypes, model } = require("mongoose");

const DroneSchema = new Schema({
  name: { type: String, required: true },
  propellers: Number,
  maxSpeed: Number,
});

const Drone = model("Drone", DroneSchema);

module.exports = Drone;
