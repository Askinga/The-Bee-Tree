addLayer("re", {
  name: "Flowers", // This is optional, only used in a few places, If absent it just uses the layer id.

  symbol: "Re", // This appears on the layer's node. Default is the id with the first letter capitalized

  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order

  startData() {
    return {
      unlocked: true,

      points: new OmegaNum(0),
    };
  },

  tabFormat: [

      "main-display",

      "blank",

      "prestige-button",

      "resource-display",

      ["display-text", "Reincarnation will reset EVERYTHING in exchange for bee skill points. There will be a upgrade tree."]

    ],
  
  color: "#B236A6",

  requires: new OmegaNum(1e65), // Can be a function that takes requirement increases into account

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

  branches: ["hi", "dev", "queen"]
});
