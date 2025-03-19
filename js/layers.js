addLayer("f", {
  name: "Flowers", // This is optional, only used in a few places, If absent it just uses the layer id.
  symbol: "F", // This appears on the layer's node. Default is the id with the first letter capitalized
  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
  startData() {
    return {
      unlocked: true,
      points: new OmegaNum(0),
    };
  },
  passiveGeneration() {
    let p = new OmegaNum(1)
    if(hasUpgrade('f',14)) p = p.times(5)
    if(hasUpgrade('f',15)) p = p.times(2)
    if(hasUpgrade('f',23)) p = p.times(upgradeEffect('f', 23))
    if(hasUpgrade('f',24)) p = p.times(10)
    if(hasUpgrade('f',31)) p = p.times(1000)
    if(hasUpgrade('f',42)) p = p.times(1e6)
    return p
  },
  color: "#86AEF3",
  requires: new OmegaNum(10), // Can be a function that takes requirement increases into account
  resource: "Flowers", // Name of prestige currency
  baseResource: "points", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 1e-10000000000000000000000000, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new OmegaNum(1);
    if(hasUpgrade('f',14)) mult = mult.times(3)
    if(hasUpgrade('f',15)) mult = mult.times(5)
    if(hasUpgrade('f',21)) mult = mult.times(upgradeEffect('f', 21))
    if(hasUpgrade('f',22)) mult = mult.times(upgradeEffect('f', 22))
    if(hasUpgrade('f',24)) mult = mult.times(10)
    if(hasUpgrade('f',25)) mult = mult.times(upgradeEffect('f', 25))
    if(hasUpgrade('f',31)) mult = mult.times(2.5)
    if(hasUpgrade('f',32)) mult = mult.times(upgradeEffect('f', 32))
    if(hasUpgrade('f',33)) mult = mult.times(upgradeEffect('f', 33))
    if(hasUpgrade('f',34)) mult = mult.times(upgradeEffect('f', 34))
    if(hasUpgrade('f',35)) mult = mult.times(upgradeEffect('f', 35))
    if(hasUpgrade('f',41)) mult = mult.times(upgradeEffect('f', 41))
    if(hasUpgrade('f',42)) mult = mult.times(1e6)
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    return new OmegaNum(1);
  },
  row: 0, // Row the layer is in on the tree (0 is the first row)
  hotkeys: [
    {
      key: "f",
      description: "F: Reset for flowers",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],
  layerShown() {
    return true;
  },
  upgrades: {
    11: {
      title: "More Bees",
      description: "Boost Bees by *10",
      cost: new OmegaNum(1),
    },
    12: {
      title: "Even More Bees",

      description: "Boost Bees by ^10",

      cost: new OmegaNum("15"),
    },
    13: {
      title: "Even More Bees",

      description: "Boost Bees based on Flowers",

      cost: new OmegaNum("100"),
      effect() {
        return new OmegaNum(10).tetrate(player.f.points.pow(0.1));
      },

      effectDisplay() {
        return "10^^" + format(upgradeEffect("f", 13));
      },
    },
      14: {

	    title: "Faster",

	    description: "Make flower generation x5 quicker and x3 Flowers.",

	    cost: new OmegaNum("500")

    },
    15: {

	    title: "Even Faster",

	    description: "Make flower generation x2 quicker and x5 Flowers.",

	    cost: new OmegaNum("6000")

    },
    21: {

      title: "More Flowers",

      description: "Boost Flowers based on Flowers",

      cost: new OmegaNum("50000"),

      effect() {

        return player.f.points.pow(0.2);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("f", 21));

      },
  },
  22: {

      title: "Even More Flowers",

      description: "Boost Flowers based on Flowers again but weaker",

      cost: new OmegaNum("5e5"),

      effect() {

        return player.f.points.log(10).pow(1.25);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("f", 22));

      },
    },
    23: {

      title: "More Flower Generation",

      description: "Boost Flowers generation based on Flowers",

      cost: new OmegaNum("2.5e7"),

      effect() {

        return player.f.points.pow(0.1);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("f", 23));

      },

    },
    24: {

	    title: "Faster^2",

	    description: "Make flower generation x10 quicker and x10 Flowers.",

	    cost: new OmegaNum("1e9")

    },
    25: {

      title: "Even More Flowers 2",

      description: "Boost Flowers based on Flowers again",

      cost: new OmegaNum("2e10"),

      effect() {

        return player.f.points.log(10).pow(2);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("f", 25));

      },

    },
    31: {

	    title: "The Holy Bees",

	    description: "Make flower generation x1000 quicker and x2.5 Flowers.",

	    cost: new OmegaNum("1e15")

    },
    32: {

      title: "Even More Flowers 3",

      description: "Boost Flowers based on Flowers again",

      cost: new OmegaNum("1e22"),

      effect() {

        return player.f.points.log(10).pow(5);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("f", 32));

      },

    },
    33: {

      title: "Even More Flowers 4",

      description: "Boost Flowers based on Flowers again",

      cost: new OmegaNum("1e27"),

      effect() {

        return player.f.points.log(10).pow(3);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("f", 33));

      },

    },
    34: {

      title: "Even More Flowers 5",

      description: "Boost Flowers based on Flowers again",

      cost: new OmegaNum("2e37"),

      effect() {

        return player.f.points.log(10).pow(1.5);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("f", 34));

      },

    },
    35: {

      title: "Even More Flowers 6",

      description: "Boost Flowers based on Flowers again",

      cost: new OmegaNum("1.5e43"),

      effect() {

        return player.f.points.log(10).pow(1.25);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("f", 35));

      },

    },
    41: {

      title: "Even More Flowers Final",

      description: "Boost Flowers based on Flowers again",

      cost: new OmegaNum("1e49"),

      effect() {

        return player.f.points.log(10).pow(4);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("f", 41));

      },

    },
    42: {

	    title: "The God Bees",

	    description: "Make flower generation x1e6 quicker and x1e6 Flowers.",

	    cost: new OmegaNum("1e70")

    },
   },
});
