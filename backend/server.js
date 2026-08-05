import "dotenv/config";   
await import("./app.js");
import "./jobs/reminderJob.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


