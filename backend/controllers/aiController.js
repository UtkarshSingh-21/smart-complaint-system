exports.analyzeComplaint = async (req, res) => {

  try {

    const { description } = req.body;

    let priority = "Low";

    let department = "General Department";

    if (
      description.toLowerCase().includes("water")
    ) {

      priority = "Medium";

      department = "Water Department";
    }

    if (
      description.toLowerCase().includes("electricity")
    ) {

      priority = "High";

      department = "Electricity Department";
    }

    if (
      description.toLowerCase().includes("garbage")
    ) {

      priority = "Medium";

      department = "Sanitation Department";
    }

    const summary =
      description.substring(0, 60);

    const aiResponse =
      "Your complaint has been registered successfully and forwarded to the concerned department.";

    res.json({
      priority,
      department,
      summary,
      aiResponse,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};