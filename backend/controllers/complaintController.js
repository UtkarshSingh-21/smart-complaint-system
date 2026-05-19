const Complaint =
require("../models/Complaint");

const axios = require("axios");

exports.createComplaint =
async (req,res)=>{

  try{

    const {
      name,
      email,
      title,
      description,
      category,
      location,
    } = req.body;

    let priority = "Low";
    let department = "General Department";
    let aiSummary = "";
    let aiResponse = "";

    // AI Logic

    if(
      description.toLowerCase().includes("water")
    ){

      priority = "Medium";

      department =
      "Water Department";

      aiSummary =
      "Water leakage issue detected.";

      aiResponse =
      "Water department has been notified.";
    }

    if(
      description.toLowerCase().includes("electricity")
    ){

      priority = "High";

      department =
      "Electricity Department";

      aiSummary =
      "Electricity issue detected.";

      aiResponse =
      "Urgent electricity complaint forwarded.";
    }

    if(
      description.toLowerCase().includes("garbage")
    ){

      priority = "Medium";

      department =
      "Sanitation Department";

      aiSummary =
      "Garbage issue detected.";

      aiResponse =
      "Sanitation team notified.";
    }

    const complaint =
    await Complaint.create({

      name,
      email,
      title,
      description,
      category,
      location,

      priority,
      department,
      aiSummary,
      aiResponse,

    });

    res.status(201).json(
      complaint
    );

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:error.message,
    });
  }
};

exports.getComplaints =
async(req,res)=>{

  try{

    const complaints =
    await Complaint.find();

    res.json(complaints);

  }catch(error){

    res.status(500).json({
      message:error.message,
    });
  }
};