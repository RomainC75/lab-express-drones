const express = require("express");
const router = express.Router();
const Drone = require("../models/Drone.model");
// require the Drone model here

const possibleKeys = ["name", "propellers", "maxSpeed"];

router.get("/", async (req, res, next) => {
  try {
    const ans = await Drone.find();
    res.status(200).json(ans);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newDrone = req.body;
    if (!newDrone.hasOwnProperty("name")) {
      next(1);
    } else if (
      Object.keys(req.body).filter((key) => !possibleKeys.includes(key))
        .length > 0
    ) {
      next(2);
    }
    const ans = await Drone.create(newDrone);
    console.log("++", ans, "++");
    res.status(201).json(ans);
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
  //Drone.findByIdAndUpdate
  try {
    const droneId = req.params.id;
    const ans = await Drone.findByIdAndUpdate(droneId, req.body, { new: true });
    console.log("--->", ans);
    res.status(200).json(ans);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try{
    const droneId = req.params.id
    const ans = await Drone.findByIdAndDelete(droneId)
    if(ans===null){
      next(3)
    }else{
      res.status(200).json(ans)
    }
  }catch(err){
    next(err)
  }
});

module.exports = router;
