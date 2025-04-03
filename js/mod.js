let modInfo = {
  name: "Bee Tree",
  id: "ILOVEBEES71",
  author: "Askinga",
  pointsName: "bees",
  modFiles: [
    "layers.js",
    "pollen.js",
    "sprunki.js",
    "hives.js",
    "queens.js",
    "development.js",
    "reincarnate.js",
    "tree.js",
  ],

  discordName: "",
  discordLink: "",
  initialStartPoints: new OmegaNum(10), // Used for hard resets and new players
  offlineLimit: 1, // In hours
};

// Set your version in num and name
let VERSION = {
  num: "1.0.0",
  name: "Release",
};

let changelog = `<h1>Changelog:</h1><br>
  <h3>v1.0.0</h3><br>
    - Added a lot of upgrades<br>
    - Added 2 challenges<br>
    - Added 7 layers<br>
    - Added a bit of milestones<br>
    - Added 6 buyables<br>
    - Added 1 upgrade tree<br>
    - Added 2 options<br>
    - Changed page from substantial-pastoral-wormhole.glitch.me to bee-tree.glitch.me<br>
    - Thats all the dev remembers, possibly more<br>
    <br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`;

let winText = `Congratulations! You have tooken over the world and beaten this game, but for now...`;

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"];

function getStartPoints() {
  return new OmegaNum(modInfo.initialStartPoints);
}

// Determines if it should show points/sec
function canGenPoints() {
  return true;
}

// Calculate points/sec!
function getPointGen() {
  if (!canGenPoints()) return new OmegaNum(0);

  let gain = new OmegaNum(1);
  if (hasUpgrade("f", 11)) gain = gain.times(10);
  if (hasUpgrade("f", 12)) gain = gain.pow(10);
  if (hasUpgrade("f", 13)) gain = gain.tetrate(upgradeEffect("f", 13));
  return gain;
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() {
  return {};
}

// Display extra things at the top of the page
var displayThings = [
  () => "You are " + format(player.re.percent) + "% to taking over the world",
];

// Determines when the game "ends"
function isEndgame() {
  return player.re.percent.gte(100);
}

// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
  return 3600; // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion) {}
