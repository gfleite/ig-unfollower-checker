const fs = require("fs");

console.log("starting the followers check...");

function readJsonFile(filePath) {
  try {
    //check if the file exists
    if (!fs.existsSync(filePath)) {
      console.log(`file not found: ${filePath}`);
      return null;
    }
    const fileContent = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.log("error parsing file", error);
    return null;
  }
}

const followersData = readJsonFile("../files/followers_1.json");
const followingData = readJsonFile("../files/following.json");

if (!followersData || !followingData) {
  console.log("Could not load data. Make sure both files are at the right folder and try again!");
  process.exit(1);
}

const followersList = followersData.map((follower) => follower.string_list_data?.[0]?.value);

const followingList = followingData.relationships_following.map((following) => following.string_list_data?.[0]?.value);

console.log("followers count:", followersList.length);
console.log("following count:", followingList.length);

const followersSet = new Set(followersList);

const notFollowingBack = followingList.filter((username) => !followersSet.has(username));

if (notFollowingBack.length === 0) {
  console.log("🎉 Great news! Everyone you follow also follows you back.");
} else {
  console.log("You have", notFollowingBack.length, "people who don't follow you back.");
  notFollowingBack.forEach((username) => {
    console.log({ username });
  });
}
