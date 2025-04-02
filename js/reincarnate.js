addLayer("re", {
  name: "Reincarnation", // This is optional, only used in a few places, If absent it just uses the layer id.

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

    [
      "display-text",
      "Reincarnation will reset EVERYTHING in exchange for bee skill points. There will be a upgrade tree. You will gain 25 bee skill points for your first reset.",
    ],

    [
      "upgrade-tree",
      [
        [11],
        [21, 22],
        [31, 32],
        [41, 42],
        [51],
        [61, 62, 63, 64],
        [71, 72],
        [81, 82, 83],
        [91],
        [101, 102, 103],
        [111, 112],
        [121],
      ],
    ],
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

    mult = new OmegaNum(25);
    if (hasUpgrade("re", 41)) mult = mult.times("1.25");
    if (hasUpgrade("re", 82)) mult = mult.times("1.5");
    if (hasUpgrade("re", 102)) mult = mult.times("2");
    if (hasUpgrade("re", 111)) mult = mult.times(upgradeEffect("re", 111));
    if (hasUpgrade("re", 112)) mult = mult.times(upgradeEffect("re", 112));
    if (hasUpgrade("re", 121)) mult = mult.times(upgradeEffect("re", 121));
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

  resetDescription() {
    return "Reincarnate for ";
  },

  layerShown() {
    return hasUpgrade("dev", 45) || player.re.unlocked;
  },

  branches: ["hi", "dev", "queen"],

  upgrades: {
    11: {
      title: "First tree upgrade!",

      description:
        "x2.5 previous non-static layers. Also add 1 to base effect power of Flower Upgrade 3.",

      cost: new OmegaNum(1),

      unlocked() {
        return true;
      },
    },
    21: {
      title: "Faster honey",

      description: "x5 Pollen.",

      cost: new OmegaNum(2),

      unlocked() {
        return hasUpgrade("re", 11);
      },

      branches: ["11"],
    },
    22: {
      title: "Faster beehives",

      description: "x4 Beehives.",

      cost: new OmegaNum(2),

      unlocked() {
        return hasUpgrade("re", 11);
      },

      branches: ["11"],
    },
    31: {
      title: "Faster flowers",

      description: "x3 Flowers and keep Honey challenges.",

      cost: new OmegaNum(4),

      unlocked() {
        return hasUpgrade("re", 21);
      },

      branches: ["22"],
    },
    32: {
      title: "Faster development",

      description: "x2 Development time.",

      cost: new OmegaNum(4),

      unlocked() {
        return hasUpgrade("re", 22);
      },

      branches: ["21"],
    },
    41: {
      title: "More skill points",

      description: "x1.25 Bee skill points.",

      cost: new OmegaNum(8),

      unlocked() {
        return hasUpgrade("re", 31);
      },

      branches: ["31"],
    },
    42: {
      title: "Even faster development",

      description: "x1.5 Development time.",

      cost: new OmegaNum(8),

      unlocked() {
        return hasUpgrade("re", 32);
      },

      branches: ["32"],
    },
    51: {
      title: "Big boost",

      description: "x10 Previous non-static layers.",

      cost: new OmegaNum(16),

      unlocked() {
        return hasUpgrade("re", 41) && hasUpgrade("re", 42);
      },

      branches: ["41", "42"],
    },
    61: {
      title: "Auto 1",

      description: "Automate Beehive upgrades.",

      cost: new OmegaNum(25),

      unlocked() {
        return hasUpgrade("re", 51);
      },

      branches: ["51"],
    },
    62: {
      title: "Auto 2",

      description: "Keep Honey Upgrades.",

      cost: new OmegaNum(25),

      unlocked() {
        return hasUpgrade("re", 51);
      },

      branches: ["51"],
    },
    63: {
      title: "Auto 3",

      description: "Automate Development upgrades.",

      cost: new OmegaNum(25),

      unlocked() {
        return hasUpgrade("re", 51);
      },

      branches: ["51"],
    },
    64: {
      title: "Auto 4",

      description: "Automate the whole Queen Bee layer and it resets nothing.",

      cost: new OmegaNum(25),

      unlocked() {
        return hasUpgrade("re", 51);
      },

      branches: ["51"],
    },
    71: {
      title: "Bigger boost",

      description: "x100 Previous non-static layers.",

      cost: new OmegaNum(65),

      unlocked() {
        return (
          hasUpgrade("re", 61) &&
          hasUpgrade("re", 62) &&
          hasUpgrade("re", 63) &&
          hasUpgrade("re", 64)
        );
      },

      branches: ["61", "62"],
    },
    72: {
      title: "Auto 5",

      description: "Keep Honey Milestones",

      cost: new OmegaNum(65),

      unlocked() {
        return (
          hasUpgrade("re", 61) &&
          hasUpgrade("re", 62) &&
          hasUpgrade("re", 63) &&
          hasUpgrade("re", 64)
        );
      },

      branches: ["63", "64"],
    },
    81: {
      title: "Auto 6",

      description: "Keep the Beehive generation.",

      cost: new OmegaNum(100),

      unlocked() {
        return hasUpgrade("re", 71) && hasUpgrade("re", 72);
      },

      branches: ["71"],
    },
    82: {
      title: "More Skill Points",

      description: "x1.5 Bee skill points.",

      cost: new OmegaNum(100),

      unlocked() {
        return hasUpgrade("re", 71) && hasUpgrade("re", 72);
      },

      branches: ["71", "72"],
    },
    83: {
      title: "Faster Pre-Beehives",

      description: "x1e100 Pollen.",

      cost: new OmegaNum(100),

      unlocked() {
        return hasUpgrade("re", 71) && hasUpgrade("re", 72);
      },

      branches: ["72"],
    },
    91: {
      title: "Ultra Power",

      description:
        "Boost Previous non-static layers based on Bee Skill Points.",

      cost: new OmegaNum(250),

      effect() {
        let pow = new OmegaNum(2);

        return player.re.points.add(1).pow(pow);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return (
          hasUpgrade("re", 81) && hasUpgrade("re", 82) && hasUpgrade("re", 83)
        );
      },

      branches: ["81", "82", "83"],
    },
    101: {

      title: "QoL",

      description: "Max buy Queen Bees.",

      cost: new OmegaNum(200),

      unlocked() {

        return hasUpgrade("re", 91);

      },

      branches: ["91"],

    },
    102: {

      title: "Bee Skills",

      description: "x2 Bee skill points",

      cost: new OmegaNum(300),

      unlocked() {

        return hasUpgrade("re", 91);

      },

      branches: ["91"],

    },
    103: {

      title: "More Worker Bees",

      description: "x5 Development time.",

      cost: new OmegaNum(200),

      unlocked() {

        return hasUpgrade("re", 91);

      },

      branches: ["91"],

    },
    111: {

      title: "Honey Skills",

      description:

        "Boost Bee skill points based on Honey.",

      cost: new OmegaNum(500),

      effect() {

        let pow = new OmegaNum(0.2);

        return player.h.points.add(1).log(10).add(1).pow(pow);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect(this.layer, this.id));

      },

      unlocked() {

        return (

          hasUpgrade("re", 101) && hasUpgrade("re", 102) && hasUpgrade("re", 103)

        );

      },

      branches: ["101", "102"],

    },
    112: {

      title: "Skilled",

      description:

        "Boost Bee skill points based on Bee Skill Points.",

      cost: new OmegaNum(500),

      effect() {

        let pow = new OmegaNum(0.1);

        return player.re.points.add(1).pow(pow);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect(this.layer, this.id));

      },

      unlocked() {

        return (

          hasUpgrade("re", 101) && hasUpgrade("re", 102) && hasUpgrade("re", 103)

        );

      },

      branches: ["102", "103"],

    },
    121: {

      title: "Super Skills",

      description:

        "Boost Bee skill points based on Development time.",

      cost: new OmegaNum(2000),

      effect() {

        let pow = new OmegaNum(1);

        return player.dev.points.add(1).log(10).div(100).add(1).pow(pow);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect(this.layer, this.id));

      },

      unlocked() {

        return (

          hasUpgrade("re", 111) && hasUpgrade("re", 112)

        );

      },

      branches: ["111", "112"],

    },
  },
});
