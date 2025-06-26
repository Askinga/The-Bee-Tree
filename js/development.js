let tmtBuyable = {
  width: "400px",

  height: "80px",

  "min-height": "120px",

  "font-size": "10px",

  margin: "10px",

  "border-radius": "33%",
};

addLayer("dev", {
  name: "Time", // This is optional, only used in a few places, If absent it just uses the layer id.

  symbol: "Dev", // This appears on the layer's node. Default is the id with the first letter capitalized

  position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order

  startData() {
    return {
      unlocked: false,

      points: new OmegaNum(0),
    };
  },

  color: "#FFDADE",

  requires: new OmegaNum("10^^10^^10^^10^^8"), // Can be a function that takes requirement increases into account

  resource: "seconds of beehive development", // Name of prestige currency

  baseResource: "bees", // Name of resource prestige is based on

  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource

  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have

  exponent: 0, // Prestige currency exponent

  passiveGeneration() {
    let p = new OmegaNum(0);

    if (player.dev.unlocked) p = p.add(1);

    return p;
  },

  prestigeButtonText() {
    return "Start beehive development. Need FFF1.0000F8 Bees";
  },

  gainMult() {
    // Calculate the multiplier for main currency from bonuses

    mult = new OmegaNum(1);

    if (hasUpgrade("dev", 11)) mult = mult.times(2);
    if (hasUpgrade("dev", 12)) mult = mult.times(2.5);
    if (hasUpgrade("dev", 13)) mult = mult.times(upgradeEffect("dev", 13));
    if (hasUpgrade("dev", 14)) mult = mult.times(5);
    if (hasUpgrade("dev", 15)) mult = mult.times(3);
    if (hasUpgrade("dev", 21)) mult = mult.times(upgradeEffect("dev", 21));
    if (hasUpgrade("dev", 22)) mult = mult.times(upgradeEffect("dev", 22));
    if (hasUpgrade("dev", 23)) mult = mult.times(upgradeEffect("dev", 23));
    if (hasUpgrade("dev", 24)) mult = mult.times(upgradeEffect("dev", 24));
    if (hasUpgrade("dev", 25)) mult = mult.times(upgradeEffect("dev", 25));
    if (hasUpgrade("dev", 31)) mult = mult.times(10000);
    if (hasUpgrade("dev", 32)) mult = mult.times(upgradeEffect("dev", 32));
    if (hasUpgrade("dev", 33)) mult = mult.times(upgradeEffect("dev", 33));
    if (hasUpgrade("dev", 34)) mult = mult.times(upgradeEffect("dev", 34));
    if (hasUpgrade("dev", 35)) mult = mult.times(1000);
    if (hasUpgrade("dev", 41)) mult = mult.times(500);
    if (hasUpgrade("dev", 43)) mult = mult.times(1000);
    if (hasUpgrade("dev", 44)) mult = mult.times(5000);
    if (hasUpgrade("dev", 45)) mult = mult.times(10000);
    if (hasUpgrade("re", 11)) mult = mult.times("2.5");
    if (hasUpgrade("re", 32)) mult = mult.times("2");
    if (hasUpgrade("re", 42)) mult = mult.times("1.5");
    if (hasUpgrade("re", 51)) mult = mult.times("10");
    if (hasUpgrade("re", 71)) mult = mult.times("100");
    if (hasUpgrade("re", 91)) mult = mult.times(upgradeEffect("re", 91));
    if (hasUpgrade("re", 103)) mult = mult.times("5");
    return mult;
  },

  gainExp() {
    // Calculate the exponent on main currency from bonuses

    return new OmegaNum(1);
  },

  tabFormat: [
    "main-display",
    "blank",
    "clickables",
    "resource-display",
    "blank",
    "upgrades",
  ],

  row: 3, // Row the layer is in on the tree (0 is the first row)

  hotkeys: [
    {
      key: "d",
      description: "D: Develop your beehives",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],

  layerShown() {
    return hasUpgrade("hi", 65) || player.dev.unlocked;
  },

  branches: ["hi"],

  effect() {
    return player.dev.points.add(1).pow(5);
  },

  effectDescription() {
    return "which is boosting Beehives by x" + format(layers.dev.effect());
  },

  autoUpgrade() {
    return hasUpgrade("re", 63);
  },

  automate(){
    if(hasUpgrade('hi', 65)) player.dev.unlocked = true
  },
  
  clickables: {
    11: {
      title: "Start the Development",

      display() {
        return "Starts Beehive Development";
      },

      onClick() {
        doReset("dev", "true");
        player.dev.points = player.dev.points.add(1);
      },

      canClick() {
        return (
          !player.dev.points.gte(1) && player.points.gte("10^^10^^10^^10^^8")
        );
      },

      style() {
        return { ...tmtBuyable };
      },
    },
  },
  upgrades: {
    11: {
      title: "Queens get happy",
      description:
        "Boost Queen Bees in the Queen Bee Effect based on Development Time and x2 Development time.",
      cost: new OmegaNum(45),
      effect() {
        return player.dev.points.add(1).pow(0.01);
      },
      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },
    },
    12: {
      title: "Queens encourages bees to work faster",

      description: "x2.5 Development time.",

      cost: new OmegaNum(110),

      unlocked() {
        return hasUpgrade("dev", 11);
      },
    },
    13: {
      title: "More Queens = More Work",

      description: "Boost Development time based on Queen Bees.",

      cost: new OmegaNum(250),

      effect() {
        return player.queen.points.add(1).pow(0.5);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("dev", 12);
      },
    },
    14: {
      title: "Queens are not satisfied",

      description: "BUMP IT UP! x5 Development time.",

      cost: new OmegaNum(1400),

      unlocked() {
        return hasUpgrade("dev", 13);
      },
    },
    15: {
      title: "Queens encourages bees to work even faster",

      description: "x3 Development time.",

      cost: new OmegaNum(8000),

      unlocked() {
        return hasUpgrade("dev", 14);
      },
    },
    21: {
      title: "More Work",

      description: "Boost Development time based on Development time.",

      cost: new OmegaNum(29000),

      effect() {
        return player.dev.points.add(1).pow(0.2);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("dev", 15);
      },
    },
    22: {
      title: "Even More Work",

      description: "Boost Development time based on Development time again.",

      cost: new OmegaNum(8e5),

      effect() {
        return player.dev.points.add(1).log(10).add(1).pow(1.25);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("dev", 21);
      },
    },
    23: {
      title: "Even More Work 2",

      description: "Boost Development time based on Development time again.",

      cost: new OmegaNum(8.5e7),

      effect() {
        return player.dev.points.add(1).log(10).add(1).pow(1.3);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("dev", 22);
      },
    },
    24: {
      title: "Even More Work 3",

      description: "Boost Development time based on Development time again.",

      cost: new OmegaNum(1.75e10),

      effect() {
        return player.dev.points.add(1).log(10).add(1).pow(1.4);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("dev", 23);
      },
    },
    25: {
      title: "Even More Work 4",

      description: "Boost Development time based on Development time again.",

      cost: new OmegaNum(1.8e13),

      effect() {
        return player.dev.points.add(1).log(10).add(1).pow(1.5);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("dev", 24);
      },
    },
    31: {
      title: "Faster!",

      description: "x10000 Development time.",

      cost: new OmegaNum(8e16),

      unlocked() {
        return hasUpgrade("dev", 25);
      },
    },
    32: {
      title: "Even More Work 5",

      description: "Boost Development time based on Development time again.",

      cost: new OmegaNum(8e22),

      effect() {
        return player.dev.points.add(1).pow(0.1);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("dev", 31);
      },
    },
    33: {
      title: "Even More Work 6",

      description: "Boost Development time based on Development time again.",

      cost: new OmegaNum(3.5e26),

      effect() {
        return player.dev.points.add(1).pow(0.075);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("dev", 32);
      },
    },
    34: {
      title: "Even More Work Final",

      description: "Boost Development time based on Development time again.",

      cost: new OmegaNum(2e30),

      effect() {
        return player.dev.points.add(1).pow(0.06);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("dev", 33);
      },
    },
    35: {
      title: "Queens encourages bees to work way faster",

      description: "x1000 Development time.",

      cost: new OmegaNum(8e33),

      unlocked() {
        return hasUpgrade("dev", 34);
      },
    },
    41: {
      title: "Queens encourages bees to work way fasterer",

      description: "x500 Development time.",

      cost: new OmegaNum(8e39),

      unlocked() {
        return hasUpgrade("dev", 35);
      },
    },
    42: {
      title: "Pentation?",

      description: "Boost Beehive Upgrade 25 based on Development time.",

      cost: new OmegaNum(2e45),

      effect() {
        return player.dev.points.add(1).pow(0.0005);
      },

      effectDisplay() {
        return (
          "Tetration Power Multi ^^^" +
          format(upgradeEffect(this.layer, this.id))
        );
      },

      unlocked() {
        return hasUpgrade("dev", 41);
      },
    },
    43: {
      title: "Queens encourages bees to work way faster^3",

      description: "x1000 Development time.",

      cost: new OmegaNum(2.5e45),

      unlocked() {
        return hasUpgrade("dev", 42);
      },
    },
    44: {
      title: "Queens encourages bees to work way faster^4",

      description: "x5000 Development time.",

      cost: new OmegaNum(2e51),

      unlocked() {
        return hasUpgrade("dev", 43);
      },
    },
    45: {
      title: "Queens encourages bees to work way faster^5",

      description: "x10000 Development time and unlock a new layer.",

      cost: new OmegaNum(2.5e58),

      unlocked() {
        return hasUpgrade("dev", 44);
      },
    },
  },
});
