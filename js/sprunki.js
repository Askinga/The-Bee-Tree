addLayer("h", {
  name: "honey",

  doReset(h) {
    // Stage 1, almost always needed, makes resetting this layer not delete your progress

    if (layers[h].row <= this.row) return;

    // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones

    let keptUpgrades = [];

    // Stage 3, track which main features you want to keep - milestones

    let keep = [];

    if (hasMilestone("hi", 0) || hasUpgrade('re', 31)) keep.push("challenges");

    if (hasUpgrade("hi", 13)) keep.push("milestones");
    
    if (hasUpgrade("re", 62)) keep.push("upgrades");

    // Stage 4, do the actual data resetautomate() {

    layerDataReset(this.layer, keep);

    // Stage 5, add back in the specific subfeatures you saved earlier

    player[this.layer].upgrades.push(...keptUpgrades);
  },

  symbol: "H",

  position: 0,

  startData() {
    return {
      unlocked: false,
      points: new OmegaNum(0),
    };
  },

  color: "#FFC30B",

  passiveGeneration() {
    let p = new OmegaNum(0);

    return p;
  },

  requires() {
    let req = new OmegaNum("1e9");
    return req;
  }, // Can be a function that takes requirement increases into account

  resource: "honey", // Name of prestige currency

  baseResource: "pollen", // Name of resource prestige is based on

  baseAmount() {
    return player.p.points;
  }, // Get the current amount of baseResource

  type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have

  exponent: 1.002, // Prestige currency exponent

  base: 10,

  gainMult() {
    // Calculate the multiplier for main currency from bonuses

    mult = new OmegaNum(1);
    return mult;
  },

  gainExp() {
    // Calculate the exponent on main currency from bonuses

    return new OmegaNum(1);
  },

  row: 2, // Row the layer is in on the tree (0 is the first row)

  branches: ["p"],

  autoPrestige() {
    return (player.h.autoPrestige && hasMilestone('h', 9));
  },

  milestonePopups(){ return options.honeyPopups },
  
  hotkeys: [
    {
      key: "h",
      description: "H: Reset for honey",
      onPress() {
        if (canReset(this.layer)) doReset(this.layer);
      },
    },
  ],

  canBuyMax() {
    return hasMilestone("h", 3);
  },

  resetsNothing() {
    return hasMilestone("h", 11);
  },

  layerShown() {
    return player.points.gte("10^^10^^1e4000") || player.h.unlocked;
  },
  autoUpgrade() {
    return hasUpgrade("hi", 14);
  },
  milestoneEffect1() {
    return new OmegaNum(10).pow(player.h.points);
  },
  challenges: {
    11: {
      name: "Dying Flowers",

      challengeDescription: function () {
        return (
          "Square root Flower gain and you can't gain Pollen.<br>" +
          challengeCompletions(this.layer, this.id) +
          "/" +
          this.completionLimit +
          " completions"
        );
      },

      rewardDescription: function () {
        return (
          "x" +
          format(new OmegaNum(10).pow(challengeCompletions("h", 11), 2)) +
          " to Pollen gain."
        );
      },

      goalDescription: function () {
        return (
          format(
            new OmegaNum.pow(10000, challengeCompletions("h", 11) + 22.25)
          ) + " Flowers"
        );
      },

      completionLimit: 100,

      canComplete: function () {
        return player.f.points.gte(
          new OmegaNum.pow(10000, challengeCompletions("h", 11) + 22.25)
        );
      },

      unlocked() {
        return hasMilestone("h", 7);
      },
    },
    12: {
      name: "Terrible Pollen Supply",

      challengeDescription: function () {
        return (
          "Cube root Flower gain and square root Pollen gain. (effect dosent work in this challenge)<br>" +
          challengeCompletions(this.layer, this.id) +
          "/" +
          this.completionLimit +
          " completions"
        );
      },

      rewardDescription: function () {
        return (
          "x" +
          format(new OmegaNum("1e1000").pow(challengeCompletions("h", 12), 2)) +
          " to Flower gain."
        );
      },

      goalDescription: function () {
        return (
          format(new OmegaNum.pow(1e5, challengeCompletions("h", 12) + 44)) +
          " Pollen"
        );
      },

      completionLimit: 100,

      canComplete: function () {
        return player.p.points.gte(
          new OmegaNum.pow(1e5, challengeCompletions("h", 12) + 44)
        );
      },

      unlocked() {
        return hasMilestone("h", 8);
      },
    },
  },
  milestones: {
    0: {
      requirementDescription: "1 Honey",
      effectDescription: "x10 Flowers and keep Flower Upgrade Automation.",
      done() {
        return player.h.points.gte("1");
      },
    },
    1: {
      requirementDescription: "3 Honey",

      effectDescription: "x3 Flowers.",

      done() {
        return player.h.points.gte("3");
      },

      unlocked() {
        return hasMilestone("h", 0);
      },
    },
    2: {
      requirementDescription: "6 Honey",

      effectDescription:
        "Automate Pollen upgrades and unlock a new Pollen upgrade.",

      done() {
        return player.h.points.gte("6");
      },

      unlocked() {
        return hasMilestone("h", 1);
      },
    },
    3: {
      requirementDescription: "12 Honey",

      effectDescription() {
        return (
          "Buy max Honey and boost Flowers based on Honey. Currently: x" +
          format(tmp.h.milestoneEffect1)
        );
      },

      done() {
        return player.h.points.gte("12");
      },

      unlocked() {
        return hasMilestone("h", 2);
      },
    },
    4: {
      requirementDescription: "13 Honey",

      effectDescription:
        "Always have at least 100% of Pollen per second and unlock a new row of Pollen upgrades.",

      done() {
        return player.h.points.gte("13");
      },

      unlocked() {
        return hasMilestone("h", 3);
      },
    },
    5: {
      requirementDescription: "43 Honey",

      effectDescription: "Honey base is 3.",

      done() {
        return player.h.points.gte("43");
      },

      unlocked() {
        return hasMilestone("h", 4);
      },
    },
    6: {
      requirementDescription: "54 Honey",

      effectDescription: "Unlock a new row of Flower upgrades.",

      done() {
        return player.h.points.gte("54");
      },

      unlocked() {
        return hasMilestone("h", 5);
      },
    },
    7: {
      requirementDescription: "69 Honey",

      effectDescription: "Unlock a challenge.",

      done() {
        return player.h.points.gte("69");
      },

      unlocked() {
        return hasMilestone("h", 6);
      },
    },
    8: {
      requirementDescription: "551 Honey",

      effectDescription: "Unlock a challenge.",

      done() {
        return player.h.points.gte("551");
      },

      unlocked() {
        return hasMilestone("h", 7);
      },
    },
    9: {
      requirementDescription: "605 Honey",

      effectDescription: "Automatically reset for honey.",

      done() {
        return player.h.points.gte("605");
      },

      toggles: [["h", "autoPrestige"]],

      unlocked() {
        return hasMilestone("h", 8);
      },
    },
    10: {
      requirementDescription: "1e265 Pollen inside Terrible Pollen Supply",

      effectDescription: "^1.025 flowers",

      done() {
        return player.p.points.gte("1e265") && inChallenge("h", 12);
      },

      unlocked() {
        return hasMilestone("h", 9);
      },
    },
    11: {
      requirementDescription: "100 Terrible Pollen Supply completions",

      effectDescription: "Honey resets nothing.",

      done() {
        return maxedChallenge("h", 12);
      },

      unlocked() {
        return hasMilestone("h", 10);
      },
    },
    12: {
      requirementDescription: "2,571 Honey",

      effectDescription: "Unlock Honey Upgrades",

      done() {
        return player.h.points.gte("2571");
      },

      unlocked() {
        return hasMilestone("h", 11);
      },
    },
    13: {
      requirementDescription: "50,333 Honey",

      effectDescription: "Unlock a new row of Pollen upgrades.",

      done() {
        return player.h.points.gte("50333");
      },

      unlocked() {
        return hasMilestone("h", 12);
      },
    },
    14: {
      requirementDescription: "130,921 Honey",

      effectDescription: "Unlock a new layer.",

      done() {
        return player.h.points.gte("130921");
      },

      unlocked() {
        return hasMilestone("h", 13);
      },
    },
  },
  upgrades: {
    11: {
      title: "Honey Upgrades!",

      description: "Boost Flower Upgrade 3 based on Honey and x1e50 Pollen",

      cost: new OmegaNum(2571),

      effect() {
        let pow = new OmegaNum(0.1);
        if (hasUpgrade("h", 12)) pow = pow.times(upgradeEffect("h", 12));
        return player.h.points.pow(pow);
      },

      effectDisplay() {
        return "Tetration Power ^" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasMilestone("h", 12);
      },
    },
    12: {
      title: "Booster",

      description: "Boost the previous upgrade based on Honey and x1e75 Pollen",

      cost: new OmegaNum(2790),

      effect() {
        return player.h.points.pow(0.075);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("h", 11);
      },
    },
    13: {
      title: "Flower Booster",

      description: "Boost Flowers based on Pollne and x1e100 Pollen",

      cost: new OmegaNum(3119),

      effect() {
        return player.p.points.pow(10);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("h", 12);
      },
    },
    14: {
      title: "Flower Booster 2",

      description: "Boost Flowers based on Pollen again and x1e125 Pollen",

      cost: new OmegaNum(4455),

      effect() {
        let pow = new OmegaNum(5);

        return player.p.points.pow(pow);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("h", 13);
      },
    },
    15: {
      title: "Flower Booster 3",

      description: "Boost Flowers based on Pollen again and x1e150 Pollen",

      cost: new OmegaNum(5879),

      effect() {
        let pow = new OmegaNum(3);

        return player.p.points.pow(pow);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("h", 14);
      },
    },
    21: {
      title: "Pollen Booster",

      description: "Boost Pollen based on Flowers again.",

      cost: new OmegaNum(7456),

      effect() {
        let pow = new OmegaNum(0.0005);
        return player.f.points.pow(pow);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("h", 15);
      },
    },
    22: {
      title: "Insane Flower Boost",

      description: "x1e100K Flowers",

      cost: new OmegaNum(14691),

      unlocked() {
        return hasUpgrade("h", 21);
      },
    },
    23: {
      title: "Insane Pollen Boost",

      description: "x1e1K Pollen",

      cost: new OmegaNum(22165),

      unlocked() {
        return hasUpgrade("h", 22);
      },
    },
    24: {
      title: "Insane Flower Boost 2",

      description: "x1e50K Flowers",

      cost: new OmegaNum(33081),

      unlocked() {
        return hasUpgrade("h", 23);
      },
    },
    25: {
      title: "Insane Pollen Boost 2",

      description: "x1e1.25K Pollen",

      cost: new OmegaNum(36782),

      unlocked() {
        return hasUpgrade("h", 24);
      },
    },
  },

  effect() {
    let base = new OmegaNum(2.5);
    if (hasMilestone("h", 5)) base = base.add(0.5);
    return new OmegaNum(base).pow(player.h.points);
  },

  effectDescription() {
    return "which is boosting Pollen by x" + format(layers.h.effect());
  },
});
