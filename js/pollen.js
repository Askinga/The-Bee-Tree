addLayer("p", {

    name: "pollen", // This is optional, only used in a few places, If absent it just uses the layer id.

    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized

    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order

    startData() { return {

        unlocked: false,

		points: new OmegaNum(0),    }},

    color: "#FFFFE0",

    requires: new OmegaNum("10^^10^^4e52"), // Can be a function that takes requirement increases into account

    resource: "pollen", // Name of prestige currency

    baseResource: "bees", // Name of resource prestige is based on

    baseAmount() {return player.points}, // Get the current amount of baseResource

    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have

    exponent: 0, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses

        mult = new OmegaNum(1)	
        if(hasUpgrade('p',13)) mult = mult.times(2)
        if(hasUpgrade('p',14)) mult = mult.times(3)
        if(hasUpgrade('p',15)) mult = mult.times(2.5)
        return mult

    },

    gainExp() { // Calculate the exponent on main currency from bonuses

        return new OmegaNum(1)

    },

    row: 1, // Row the layer is in on the tree (0 is the first row)
  
    branches: ["f"],

    hotkeys: [

        {key: "p", description: "P: Reset for pollen", onPress(){if (canReset(this.layer)) doReset(this.layer)}},

    ],

    layerShown(){return (hasUpgrade('f', 55) || player.p.unlocked)},
    upgrades: {

    11: {

      title: "More Flowers",

      description: "Boost Flowers by x3",

      cost: new OmegaNum(1),

    },
    12: {

      title: "Even More Flowers",

      description: "Boost Flowers by x4 and auto buy Flower upgrades.",

      cost: new OmegaNum(1),

    },
    13: {

      title: "Faster",

      description: "Boost Flowers by x4 and x2 Pollen.",

      cost: new OmegaNum(2),

    },
    14: {

      title: "More Pollen and Flowers",

      description: "Boost Flowers based on Pollen and x3 Pollen",

      cost: new OmegaNum("4"),

      effect() {

        return player.p.points.add(1).pow(1.5);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("p", 14));

      },
   },
    15: {

      title: "Faster 2",

      description: "Boost Flowers by x10 and x2.5 Pollen.",

      cost: new OmegaNum(100),

    },
    },
})