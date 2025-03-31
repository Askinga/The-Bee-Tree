addLayer("queen", {

    name: "Queen Bees", // This is optional, only used in a few places, If absent it just uses the layer id.

    symbol: "👑", // This appears on the layer's node. Default is the id with the first letter capitalized

    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order

    startData() { return {

        unlocked: false,

		points: new OmegaNum(0),    }},

    color: "#e0d82f",

    requires: new OmegaNum(5e21), // Can be a function that takes requirement increases into account

    resource: "queen bees", // Name of prestige currency

    baseResource: "beehives", // Name of resource prestige is based on

    baseAmount() {return player.hi.points}, // Get the current amount of baseResource

    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have

    exponent: 1.25, // Prestige currency exponent
  
    base: 100,

    gainMult() { // Calculate the multiplier for main currency from bonuses

        mult = new OmegaNum(1)

        return mult

    },

    tabFormat: [
      "main-display",
      "blank",
      "prestige-button",
      "resource-display",
      ["display-text", "Don't worry about your bees, they will act like if there was 1 queen."]
    ],
  
    gainExp() { // Calculate the exponent on main currency from bonuses

        return new OmegaNum(1)

    },

    row: 3, // Row the layer is in on the tree (0 is the first row)

    hotkeys: [

        {key: "q", description: "Q: Reset for queen bees", onPress(){if (canReset(this.layer)) doReset(this.layer)}},

    ],

    layerShown(){return (hasUpgrade('hi', 51) || player.queen.unlocked)},

    effect() {

    let base = new OmegaNum(10);

    let times = new OmegaNum(1)
      
    if(hasUpgrade('dev', 11)) times = times.times(upgradeEffect('dev', 11))
    
    return new OmegaNum(base).pow(player.queen.points.times(times));

  },
  
  resetDescription: "Get ",
  
  effectDescription() {

    return "which is boosting Beehives by x" + format(layers.queen.effect());

  },
})