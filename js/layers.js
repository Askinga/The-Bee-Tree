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
  doReset(f) {

        // Stage 1, almost always needed, makes resetting this layer not delete your progress

        if (layers[f].row <= this.row) return;

    

        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 21, Milestones

        let keptUpgrades = [];

        

        // Stage 3, track which main features you want to keep - milestones

        let keep = [];

        if (hasUpgrade('hi', 13) || hasMilestone("h", 7)) keep.push("upgrades");

    

        // Stage 4, do the actual data resetautomate() {

        layerDataReset(this.layer, keep);

    

        // Stage 5, add back in the specific subfeatures you saved earlier

        player[this.layer].upgrades.push(...keptUpgrades);

    },
  passiveGeneration() {
    let p = new OmegaNum(0);
    if (hasUpgrade("f", 11) || hasUpgrade('p', 14)) p = p.add(1)
    if (hasUpgrade("f", 14)) p = p.times(6.5);
    if (hasUpgrade("f", 15)) p = p.times(2);
    if (hasUpgrade("f", 23) && !hasUpgrade("re", 171)) p = p.times(upgradeEffect("f", 23));
    if (hasUpgrade("f", 24)) p = p.times(10);
    if (hasUpgrade("f", 31)) p = p.times(1000);
    if (hasUpgrade("f", 42)) p = p.times(1e6);
    if (hasUpgrade("f", 43) && !hasUpgrade("re", 171)) p = p.times(upgradeEffect("f", 43));
    if (hasUpgrade("f", 44) && !hasUpgrade("re", 171)) p = p.times(upgradeEffect("f", 44));
    if (hasUpgrade("f", 52) && !hasUpgrade("re", 171)) p = p.times(upgradeEffect("f", 52));
    if (hasUpgrade("f", 53)) p = p.times(1e6);
    if (hasUpgrade("f", 54)) p = p.times(1e10);
    return p;
  },
  color: "#86AEF3",
  requires: new OmegaNum(10), // Can be a function that takes requirement increases into account
  resource: "Flowers", // Name of prestige currency
  baseResource: "bees", // Name of resource prestige is based on
  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource
  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
  exponent: 0, // Prestige currency exponent
  gainMult() {
    // Calculate the multiplier for main currency from bonuses
    mult = new OmegaNum(1);
    if (hasUpgrade("f", 14)) mult = mult.times(3.5);
    if (hasUpgrade("f", 15)) mult = mult.times(5);
    if (hasUpgrade("f", 21)) mult = mult.times(upgradeEffect("f", 21));
    if (hasUpgrade("f", 22)) mult = mult.times(upgradeEffect("f", 22));
    if (hasUpgrade("f", 24)) mult = mult.times(10);
    if (hasUpgrade("f", 25)) mult = mult.times(upgradeEffect("f", 25));
    if (hasUpgrade("f", 31)) mult = mult.times(2.5);
    if (hasUpgrade("f", 32)) mult = mult.times(upgradeEffect("f", 32));
    if (hasUpgrade("f", 33)) mult = mult.times(upgradeEffect("f", 33));
    if (hasUpgrade("f", 34)) mult = mult.times(upgradeEffect("f", 34));
    if (hasUpgrade("f", 35)) mult = mult.times(upgradeEffect("f", 35));
    if (hasUpgrade("f", 41)) mult = mult.times(upgradeEffect("f", 41));
    if (hasUpgrade("p", 11)) mult = mult.times(3);
    if (hasUpgrade("f", 42)) mult = mult.times(1e6);
    if (hasUpgrade("f", 51)) mult = mult.times(upgradeEffect("f", 51));
    if (hasUpgrade("p", 12)) mult = mult.times(4);
    if (hasUpgrade("p", 13)) mult = mult.times(4);
    if (hasUpgrade("p", 14)) mult = mult.times(upgradeEffect("p", 14));
    if (hasUpgrade("p", 15)) mult = mult.times(10);
    if (hasUpgrade("p", 31)) mult = mult.times(upgradeEffect("p", 31));
    if (hasMilestone("h", 0)) mult = mult.times(10);
    if (hasMilestone("h", 1)) mult = mult.times(3);
    if (hasMilestone("h", 3)) mult = mult.times(tmp.h.milestoneEffect1);
    if (hasUpgrade("p", 44)) mult = mult.times(upgradeEffect("p", 44));
    if (hasUpgrade("f", 64)) mult = mult.times(upgradeEffect("f", 64));
    if (!inChallenge("h", 12))
      mult = mult.times(
        new OmegaNum("1e1000").pow(challengeCompletions("h", 12), 2)
      );
    if (hasUpgrade("h", 13)) mult = mult.times(upgradeEffect("h", 13));
    if (hasUpgrade("h", 14)) mult = mult.times(upgradeEffect("h", 14));
    if (hasUpgrade("h", 15)) mult = mult.times(upgradeEffect("h", 15));
    if (hasUpgrade("h", 22)) mult = mult.times("ee5");
    if (hasUpgrade("h", 24)) mult = mult.times("e5e4");
    if (hasUpgrade("hi", 31)) mult = mult.times(upgradeEffect('hi', 31))
    if (hasUpgrade("re", 11)) mult = mult.times("2.5")
    if (hasUpgrade("re", 31)) mult = mult.times("3")
    if (hasUpgrade("re", 51)) mult = mult.times("10")
    if (hasUpgrade("re", 71)) mult = mult.times("100")
    if (hasUpgrade("re", 91)) mult = mult.times(upgradeEffect("re", 91))
    return mult;
  },
  gainExp() {
    // Calculate the exponent on main currency from bonuses
    let exp = new OmegaNum(1);
    if (hasUpgrade("f", 53)) exp = exp.times(1.05);
    if (hasUpgrade("f", 54)) exp = exp.times(1.1);
    if (hasUpgrade("p", 43)) exp = exp.times(1.1);
    if (hasUpgrade("f", 61)) exp = exp.times(1.075);
    if (hasUpgrade("f", 65)) exp = exp.times(1.05);
    if (hasMilestone("h", 10)) exp = exp.times(1.025);
    if (inChallenge("h", 11)) exp = exp.times(0.5);
    if (inChallenge("h", 12)) exp = exp.times(0.333);
    return exp;
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
  autoUpgrade() {
    return hasUpgrade("p", 12) || hasMilestone("h", 0);
  },
  upgrades: {
    11: {
      title: "More Bees",
      description: "Boost Bees by *10 and 100% of Flowers per second.",
      cost: new OmegaNum(1),
    },
    12: {
      title: "Even More Bees",

      description: "Boost Bees by ^10",

      cost: new OmegaNum("15"),

      unlocked() {
        return hasUpgrade("f", 11);
      },
    },
    13: {
      title: "Even More Bees",

      description: "Boost Bees based on Flowers",

      cost: new OmegaNum("100"),
      effect() {
        let tetPow = new OmegaNum(0.1);
        if (hasUpgrade("re", 11)) tetPow = tetPow.add(1)
        if (hasUpgrade("f", 45)) tetPow = tetPow.times(upgradeEffect("f", 45));
        if (hasUpgrade("f", 55)) tetPow = tetPow.times(upgradeEffect("f", 55));
        if (hasUpgrade("p", 24)) tetPow = tetPow.times(upgradeEffect("p", 24));
        if (hasUpgrade("p", 25)) tetPow = tetPow.times(upgradeEffect("p", 25));
        if (hasUpgrade("h", 11)) tetPow = tetPow.pow(upgradeEffect("h", 11));
        if (hasUpgrade("hi", 11)) tetPow = tetPow.pow(upgradeEffect("hi", 11));
        return new OmegaNum(10).tetrate(player.f.points.add(1).pow(tetPow));
      },

      effectDisplay() {
        return "10^^" + format(upgradeEffect("f", 13)) + "x";
      },

      unlocked() {
        return hasUpgrade("f", 12);
      },
    },
    14: {
      title: "Faster",

      description: "Make flower generation x6.5 quicker and x3.5 Flowers.",

      cost: new OmegaNum("150"),

      unlocked() {
        return hasUpgrade("f", 13);
      },
    },
    15: {
      title: "Even Faster",

      description: "Make flower generation x2 quicker and x5 Flowers.",

      cost: new OmegaNum("2000"),

      unlocked() {
        return hasUpgrade("f", 14);
      },
    },
    21: {
      title: "More Flowers",

      description: "Boost Flowers based on Flowers",

      cost: new OmegaNum("25000"),

      effect() {
        return player.f.points.add(1).pow(0.27);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("f", 21));
      },

      unlocked() {
        return hasUpgrade("f", 15);
      },
    },
    22: {
      title: "Even More Flowers",

      description: "Boost Flowers based on Flowers again but weaker",

      cost: new OmegaNum("5e5"),

      effect() {
        return player.f.points.add(1).log(10).add(1).pow(1.25);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("f", 22));
      },

      unlocked() {
        return hasUpgrade("f", 21);
      },
    },
    23: {
      title: "More Flower Generation",

      description: "Boost Flowers generation based on Flowers",

      cost: new OmegaNum("2.5e7"),

      effect() {
        return player.f.points.add(1).log(10).add(1).pow(1.25);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("f", 23));
      },

      unlocked() {
        return hasUpgrade("f", 22);
      },
    },
    24: {
      title: "Faster^2",

      description: "Make flower generation x10 quicker and x10 Flowers.",

      cost: new OmegaNum("1e9"),

      unlocked() {
        return hasUpgrade("f", 23);
      },
    },
    25: {
      title: "Even More Flowers 2",

      description: "Boost Flowers based on Flowers again",

      cost: new OmegaNum("2e10"),

      effect() {
        return player.f.points.add(1).log(10).add(1).pow(2);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("f", 25));
      },

      unlocked() {
        return hasUpgrade("f", 24);
      },
    },
    31: {
      title: "The Holy Bees",

      description: "Make flower generation x1000 quicker and x2.5 Flowers.",

      cost: new OmegaNum("1e15"),

      unlocked() {
        return hasUpgrade("f", 25);
      },
    },
    32: {
      title: "Even More Flowers 3",

      description: "Boost Flowers based on Flowers again",

      cost: new OmegaNum("1e23"),

      effect() {
        return player.f.points.add(1).log(10).add(1).pow(5);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("f", 32));
      },

      unlocked() {
        return hasUpgrade("f", 31);
      },
    },
    33: {
      title: "Even More Flowers 4",

      description: "Boost Flowers based on Flowers again",

      cost: new OmegaNum("1e38"),

      effect() {
        return player.f.points.add(1).log(10).add(1).pow(3);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("f", 33));
      },

      unlocked() {
        return hasUpgrade("f", 32);
      },
    },
    34: {
      title: "Even More Flowers 5",

      description: "Boost Flowers based on Flowers again",

      cost: new OmegaNum("1e48"),

      effect() {
        return player.f.points.add(1).log(10).add(1).pow(1.5);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("f", 34));
      },

      unlocked() {
        return hasUpgrade("f", 33);
      },
    },
    35: {
      title: "Even More Flowers 6",

      description: "Boost Flowers based on Flowers again",

      cost: new OmegaNum("1.5e53"),

      effect() {
        return player.f.points.add(1).log(10).add(1).pow(1.25);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("f", 35));
      },

      unlocked() {
        return hasUpgrade("f", 34);
      },
    },
    41: {
      title: "Even More Flowers Final",

      description: "Boost Flowers based on Flowers again",

      cost: new OmegaNum("2.5e57"),

      effect() {
        return player.f.points.add(1).log(10).add(1).pow(4);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("f", 41));
      },

      unlocked() {
        return hasUpgrade("f", 35);
      },
    },
    42: {
      title: "The God Bees",

      description: "Make flower generation x1e6 quicker and x1e6 Flowers.",

      cost: new OmegaNum("1e70"),

      unlocked() {
        return hasUpgrade("f", 41);
      },
    },
    43: {
      title: "Even More Flower Generation",

      description: "Boost Flowers generation based on Flowers again",

      cost: new OmegaNum("1e90"),

      effect() {
        return player.f.points.add(1).log(10).add(1).pow(2);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("f", 43));
      },

      unlocked() {
        return hasUpgrade("f", 42);
      },
    },
    44: {
      title: "Even More Flower Generation 2",

      description: "Boost Flowers generation based on Flowers again",

      cost: new OmegaNum("1e98"),

      effect() {
        return player.f.points.add(1).log(10).add(1).pow(1.5);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("f", 44));
      },

      unlocked() {
        return hasUpgrade("f", 43);
      },
    },
    45: {
      title: "Get past the FF1e10 range",

      description: "Boost Upgrade 3 based on Flowers",

      cost: new OmegaNum("1.5e103"),

      effect() {
        return player.f.points.add(1).pow(0.00065);
      },

      effectDisplay() {
        return "Tetration Power x" + format(upgradeEffect("f", 45));
      },

      unlocked() {
        return hasUpgrade("f", 44);
      },
    },
    51: {
      title: "Yet More Flowers",

      description: "Boost Flowers based on Flowers",

      cost: new OmegaNum("2e103"),

      effect() {
        return player.f.points.pow(0.14);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("f", 51));
      },

      unlocked() {
        return hasUpgrade("f", 45);
      },
    },
    52: {
      title: "Even More Flower Generation 3",

      description: "Boost Flowers generation based on Flowers again",

      cost: new OmegaNum("1e124"),

      effect() {
        return player.f.points.add(1).log(10).add(1).pow(3.5);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("f", 52));
      },

      unlocked() {
        return hasUpgrade("f", 51);
      },
    },
    53: {
      title: "Holy Flowers",

      description: "Make flower generation x1e6 quicker and ^1.05 Flowers.",

      cost: new OmegaNum("2e149"),

      unlocked() {
        return hasUpgrade("f", 52);
      },
    },
    54: {
      title: "God Flowers",

      description: "Make flower generation x1e10 quicker and ^1.1 Flowers.",

      cost: new OmegaNum("1e173"),

      unlocked() {
        return hasUpgrade("f", 53);
      },
    },
    55: {
      title: "New Layer!",

      description:
        "Boost Upgrade 3 based on Flowers again but stronger and unlock a new layer.",

      cost: new OmegaNum("2.5e223"),

      effect() {
        return player.f.points.add(1).pow(0.001);
      },

      effectDisplay() {
        return "Tetration Power x" + format(upgradeEffect("f", 55));
      },

      unlocked() {
        return hasUpgrade("f", 54);
      },
    },
    61: {
      title: "Next Row!",

      description: "^1.075 Flowers.",

      cost: new OmegaNum("1e1300"),

      unlocked() {
        return hasMilestone("h", 6);
      },
    },
    62: {
      title: "Big pollen boost",

      description: "^1.05 Pollen",

      cost: new OmegaNum("1e1715"),

      unlocked() {
        return hasUpgrade("f", 61);
      },
    },
    63: {
      title: "Pollen boost",

      description: "^1.03 Pollen",

      cost: new OmegaNum("1e9540"),

      unlocked() {
        return hasUpgrade("f", 62);
      },
    },
    64: {
      title: "Even More Flowers?",

      description: "Boost Flowers based on Flowers again",

      cost: new OmegaNum("1e11900"),

      effect() {
        return player.f.points.add(1).pow(0.05);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect("f", 64));
      },

      unlocked() {
        return hasUpgrade("f", 63);
      },
    },
    65: {
      title: "End of this row",

      description: "^1.05 Flowers.",

      cost: new OmegaNum("1e14310"),

      unlocked() {
        return hasUpgrade("f", 64);
      },
    },
  },
});
