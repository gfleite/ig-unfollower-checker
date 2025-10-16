const fs = require("fs");

function extractUsernames(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = JSON.parse(fileContent);
    return data;
  } catch (error) {
    console.log("error parsing file", error);
    return null;
  }
}

const followersData = extractUsernames("./followers_1.json");
const followingData = extractUsernames(".following.json");

if (!followersData || !followingData) {
  console.log("Could not load data. Make sure both files are at the right folder!");
} else {
  console.log("\nFollower entry:", followersData[0]);
  console.log("\nFollowing entry:", followersData[0]);
}
