addLayer("re", {
  name: "Flowers", // This is optional, only used in a few places, If absent it just uses the layer id.

  symbol: "Re", // This appears on the layer's node. Default is the id with the first letter capitalized

  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order

  startData() {
    return {
      unlocked: false,

      points: new OmegaNum(0),
    };
  },

  tabFormat: [

      "main-display",

      "blank",

      "prestige-button",

      "resource-display",

      ["display-text", "Reincarnation will reset EVERYTHING in exchange for bee skill points. There will be a upgrade tree. You will gain 10 bee skill points for your first reset."],

      ["upgrade-tree", [[11], [21, 22], [31, 32], [41, 42]]],
    ],
  
  color: "#32DD78",

  requires: new OmegaNum(1e66), // Can be a function that takes requirement increases into account

  resource: "bee skill points", // Name of prestige currency

  baseResource: "development time", // Name of resource prestige is based on

  baseAmount() {
    return player.dev.points;
  }, // Get the current amount of baseResource

  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have

  exponent: 0, // Prestige currency exponent

  gainMult() {
    // Calculate the multiplier for main currency from bonuses

    mult = new OmegaNum(10);
    if (hasUpgrade("re", 41)) mult = mult.times("1.25")
    return mult;
  },

  gainExp() {
    // Calculate the exponent on main currency from bonuses

    return new OmegaNum(1);
  },

  row: 4, // Row the layer is in on the tree (0 is the first row)

  hotkeys: [
    {
      key: "r",
      description: "R: Reincarnate",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],

  resetDescription(){ return "Reincarnate for " },
  
  layerShown() {
    return hasUpgrade("dev", 45) || player.re.unlocked;
  },

  branches: ["hi", "dev", "queen"],
  
  upgrades: {
    11: {

      title: "First tree upgrade!",

      description: "x2.5 previous non-static layers.",

      cost: new OmegaNum(1),

      

      unlocked(){ return true}

    },
    21: {

      title: "Faster honey",

      description: "x5 Pollen.",

      cost: new OmegaNum(2),

      

      unlocked(){ return hasUpgrade('re', 11)},
      
      branches: ["11"]
    },
    22: {

      title: "Faster beehives",

      description: "x4 Beehives.",

      cost: new OmegaNum(2),

      

      unlocked(){ return hasUpgrade('re', 11)},

      

      branches: ["11"]

    },
    31: {

      title: "Faster flowers",

      description: "x3 Flowers.",

      cost: new OmegaNum(4),

      

      unlocked(){ return hasUpgrade('re', 21)},

      

      branches: ["22"]

    },
    32: {

      title: "Faster development",

      description: "x2 Development time.",

      cost: new OmegaNum(4),

      

      unlocked(){ return hasUpgrade('re', 22)},

      

      branches: ["21"]

    },
    41: {

      title: "More skill points",

      description: "x1.25 Bee skill points.",

      cost: new OmegaNum(8),

      

      unlocked(){ return hasUpgrade('re', 31)},

      

      branches: ["31"]

    },
    42: {

      title: "Even faster development",

      description: "x1.5 Development time.",

      cost: new OmegaNum(8),

      

      unlocked(){ return hasUpgrade('re', 32)},

      

      branches: ["32"]

    },
  },
});
