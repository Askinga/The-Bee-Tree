addLayer("hi", {
  name: "Hives", // This is optional, only used in a few places, If absent it just uses the layer id.

  symbol: "Hi", // This appears on the layer's node. Default is the id with the first letter capitalized

  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order

  startData() {
    return {
      unlocked: false,

      points: new OmegaNum(0),
    };
  },

  color: "#FCDAA0",

  requires: new OmegaNum(130921), // Can be a function that takes requirement increases into account

  resource: "beehives", // Name of prestige currency

  baseResource: "honey", // Name of resource prestige is based on

  baseAmount() {
    return player.h.points;
  }, // Get the current amount of baseResource

  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have

  exponent: 0.5, // Prestige currency exponent

  gainMult() {
    // Calculate the multiplier for main currency from bonuses

    mult = new OmegaNum(1);

    return mult;
  },

  gainExp() {
    // Calculate the exponent on main currency from bonuses

    return new OmegaNum(1);
  },

  row: 3, // Row the layer is in on the tree (0 is the first row)

  hotkeys: [
    {
      key: "i",
      description: "I: Reset for hives",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],

  branches: ["h"],
   
  layerShown() {
    return hasMilestone("h", 14) || player.hi.unlocked;
  },
  
  milestones: {
    0: {

      requirementDescription: "1 Beehive",

      effectDescription: "Keep Honey Challenges (too painful to do them again). and x2 Pollen.",

      done() {

        return player.hi.points.gte("1");

      },

      

      unlocked() {

        return true;

      },

  },
  },
});
