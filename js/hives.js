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

  passiveGeneration(){
    let p = new OmegaNum(0)
    if (hasUpgrade("hi", 32)) p = p.add("1");
    return p
  },
  
  baseAmount() {
    return player.h.points;
  }, // Get the current amount of baseResource

  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have

  exponent: 0.5, // Prestige currency exponent

  gainMult() {
    // Calculate the multiplier for main currency from bonuses

    mult = new OmegaNum(1);
    if (hasUpgrade("hi", 15)) mult = mult.times(upgradeEffect("hi", 15));
    if (hasUpgrade("hi", 22)) mult = mult.times("2");
    if (hasUpgrade("hi", 23)) mult = mult.times("3");
    if (hasUpgrade("hi", 24)) mult = mult.times(upgradeEffect("hi", 24));
    if (hasUpgrade("hi", 25)) mult = mult.times("4");
    if (hasUpgrade("hi", 32)) mult = mult.times("3");
    if (hasUpgrade("hi", 33)) mult = mult.times("5");
    if (hasUpgrade("hi", 34)) mult = mult.times("6");
    if (hasUpgrade("hi", 35)) mult = mult.times(upgradeEffect("hi", 35));
    if (hasUpgrade("hi", 41)) mult = mult.times(upgradeEffect("hi", 41));
    if (hasUpgrade("hi", 42)) mult = mult.times(upgradeEffect("hi", 42));
    if (hasUpgrade("hi", 43)) mult = mult.times(upgradeEffect("hi", 43));
    if (hasUpgrade("hi", 44)) mult = mult.times(upgradeEffect("hi", 44));
    if (hasUpgrade("hi", 45)) mult = mult.times(upgradeEffect("hi", 45));
    if (hasUpgrade("hi", 51)) mult = mult.times("100");
    mult = mult.times(layers.queen.effect());
    if (hasUpgrade("hi", 52)) mult = mult.times(upgradeEffect("hi", 52)); 
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
      description: "I: Reset for beehives",
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

      effectDescription:
        "Keep Honey Challenges (too painful to do them again). and x2 Pollen.",

      done() {
        return player.hi.points.gte("1");
      },

      unlocked() {
        return true;
      },
    },
  },
  upgrades: {
    11: {
      title: "Finally the bees have a home!",

      description: "Boost Flower Upgrade 3 based on Beehives and x3 Pollen",

      cost: new OmegaNum(1),

      effect() {
        let pow = new OmegaNum(player.hi.points.add(1).pow(0.4));

        return player.hi.points.add(1).pow(pow);
      },

      effectDisplay() {
        return "Tetration Power ^" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return true;
      },
    },
    12: {
      title: "Bees are happy!",

      description: "They are so happy that they multiply Pollen by x1e100!",

      cost: new OmegaNum(2),

      unlocked() {
        return hasUpgrade("hi", 11);
      },
    },
    13: {
      title: "Beekeepers",

      description: "Keep Flower Upgrades, Honey Milestones and xe1K Pollen",

      cost: new OmegaNum(3),

      unlocked() {
        return hasUpgrade("hi", 12);
      },
    },
    14: {
      title: "Full Honey Automation",

      description: "Automate Honey Upgrades and xe2K Pollen!",

      cost: new OmegaNum(6),

      unlocked() {
        return hasUpgrade("hi", 13);
      },
    },
    15: {
      title: "More Honey = More Beehives?",

      description: "Boost Beehives based on Honey.",

      cost: new OmegaNum(15),

      effect() {
        let pow = new OmegaNum(0.5);

        return player.h.points.add(1).log(10).add(1).pow(pow);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("hi", 14);
      },
    },
    21: {
      title: "Insane Boost",

      description: "Boost Pollen based on Beehives.",

      cost: new OmegaNum(40),

      effect() {
        let pow = new OmegaNum(1500);

        return player.hi.points.add(1).pow(pow);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("hi", 15);
      },
    },
    22: {
      title: "More Bee Homes",

      description: "x2 Beehives",

      cost: new OmegaNum(50),

      unlocked() {
        return hasUpgrade("hi", 21);
      },
    },
    23: {
      title: "Good Pollination Sources",

      description: "x3 Beehives",

      cost: new OmegaNum(100),

      unlocked() {
        return hasUpgrade("hi", 22);
      },
    },
    24: {
      title: "More Beehives",

      description: "Boost Beehives based on Beehives.",

      cost: new OmegaNum(325),

      effect() {
        let pow = new OmegaNum(0.1);

        return player.hi.points.add(1).pow(pow);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("hi", 23);
      },
    },
    25: {
      title: "Hyperactive Bees",

      description: "x4 Beehives",

      cost: new OmegaNum(600),

      unlocked() {
        return hasUpgrade("hi", 24);
      },
    },
    31: {
      title: "Insane Boost 2",

      description: "Boost Flowers based on Beehives.",

      cost: new OmegaNum(3000),

      effect() {
        let pow = new OmegaNum(1000000);

        return player.hi.points.add(1).pow(pow);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("hi", 25);
      },
    },
    32: {

      title: "Speed up Hives",

      description: "x3 Beehives and 100% of Beehives per second.",

      cost: new OmegaNum(5000),

      unlocked() {

        return hasUpgrade("hi", 31);

      },

    },
    33: {

      title: "Hyperactive Bees^2",

      description: "x5 Beehives",

      cost: new OmegaNum(2.5e5),

      unlocked() {

        return hasUpgrade("hi", 32);

      },

    },
    34: {

      title: "Hyperactive Bees^3",

      description: "X6 Beehives",

      cost: new OmegaNum(1e6),

      unlocked() {

        return hasUpgrade("hi", 33);

      },

    },
    15: {

      title: "More Honey = More Beehives?",

      description: "Boost Beehives based on Honey.",

      cost: new OmegaNum(15),

      effect() {

        let pow = new OmegaNum(0.5);

        return player.h.points.add(1).log(10).add(1).pow(pow);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect(this.layer, this.id));

      },

      unlocked() {

        return hasUpgrade("hi", 14);

      },

    },

    35: {

      title: "Insane Beehive Boost",

      description: "Boost Beehives based on Pollen.",

      cost: new OmegaNum(1e7),

      effect() {

        let pow = new OmegaNum(1);

        return player.p.points.add(1).log(10).log(10).add(1).pow(pow);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect(this.layer, this.id));

      },

      unlocked() {

        return hasUpgrade("hi", 34);

      },

    },
    41: {

      title: "Insane Beehive Boost 2",

      description: "Boost Beehives based on Beehives.",

      cost: new OmegaNum(2.5e8),

      effect() {

        return player.hi.points.add(1).log(10).add(1);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect(this.layer, this.id));

      },

      unlocked() {

        return hasUpgrade("hi", 35);

      },

    },
    42: {

      title: "Beehive Boost",

      description: "Boost Beehives based on Beehives again.",

      cost: new OmegaNum(1e10),

      effect() {

        let pow = new OmegaNum(0.65);

        return player.hi.points.add(1).log(10).add(1).pow(pow);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect(this.layer, this.id));

      },

      unlocked() {

        return hasUpgrade("hi", 41);

      },

    },
    43: {

      title: "Good Beehive Boost",

      description: "Boost Beehives based on Beehives again.",

      cost: new OmegaNum(1e11),

      effect() {

        let pow = new OmegaNum(1.25);

        return player.hi.points.add(1).log(10).add(1).pow(pow);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect(this.layer, this.id));

      },

      unlocked() {

        return hasUpgrade("hi", 42);

      },

    },
    44: {

      title: "Great Beehive Boost",

      description: "Boost Beehives based on Beehives again.",

      cost: new OmegaNum(1e13),

      effect() {

        let pow = new OmegaNum(1.3);

        return player.hi.points.add(1).log(10).add(1).pow(pow);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect(this.layer, this.id));

      },

      unlocked() {

        return hasUpgrade("hi", 43);

      },

    },
    45: {

      title: "Amazing Beehive Boost",

      description: "Boost Beehives based on Beehives again.",

      cost: new OmegaNum(5e15),

      effect() {

        let pow = new OmegaNum(1.5);

        return player.hi.points.add(1).log(10).add(1).pow(pow);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect(this.layer, this.id));

      },

      unlocked() {

        return hasUpgrade("hi", 44);

      },

    },
    51: {

      title: "Static Beehive Boost",

      description: "x100 Beehives",

      cost: new OmegaNum(1e19),

      unlocked() {

        return hasUpgrade("hi", 45);

      },

    },
    52: {

      title: "Flower Beehive Boost",

      description: "Boost Beehives based on Flowers.",

      cost: new OmegaNum(1e23),

      effect() {

        let pow = new OmegaNum(1);

        return player.f.points.add(1).log(10).log(10).add(1).pow(pow);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect(this.layer, this.id));

      },

      unlocked() {

        return hasUpgrade("hi", 51);

      },

    },
  },
});
