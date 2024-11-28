// Access the environment variable in the script
const arg = process.env.SCRIPT_ARG;

console.log("Template script running...");
if (arg) {
  try {
    // Deserialize the JSON string into an object
    const parsedObject = JSON.parse(arg);

    console.log("Received object:", parsedObject);
  } catch (error) {
    console.error("Error parsing SCRIPT_ARG:", error);
  }
} else {
  console.log("No argument received");
}
