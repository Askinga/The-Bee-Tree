addLayer("re", {
  name: "Reincarnation", // This is optional, only used in a few places, If absent it just uses the layer id.

  symbol: "Re", // This appears on the layer's node. Default is the id with the first letter capitalized

  position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order

  startData() {
    return {
      unlocked: false,

      points: new OmegaNum(0),

      reinBees: new OmegaNum(0),

      reinBeesGain: new OmegaNum(0),
    };
  },

  tabFormat: {
    "Reincarnation Tree": {
      content: [
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
            [131, 132, 133],
            [141],
            [151],
            [161],
            [171, 172, 173, 174],
            [181],
          ],
        ],
      ],
    },
    "Reincarnated Bees": {
      unlocked() {
        return hasUpgrade("re", 161);
      },
      content: [
        "main-display",
        "blank",
        "prestige-button",
        "blank",
        [
          "display-text",
          function () {
            return (
              "You have " +
              format(player.re.reinBees) +
              " Reincarnated Bees, which is boostng Bee skill points by x" +
              format(tmp.re.reinBeesEffect)
            );
          },
        ],
        [
          "display-text",
          function () {
            return "(" + format(player.re.reinBeesGain) + "/sec)";
          },
        ],
        "blank",
        "buyables",
      ],
    },
  },

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
    if (hasUpgrade("re", 131)) mult = mult.times(upgradeEffect("re", 131));
    if (hasUpgrade("re", 132)) mult = mult.times(upgradeEffect("re", 132));
    if (hasUpgrade("re", 133)) mult = mult.times(upgradeEffect("re", 133));
    mult = mult.times(tmp.re.reinBeesEffect);
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

  reinBeesEffect() {
    return player.re.reinBees.add(1).pow(0.5);
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

        if (hasUpgrade("re", 141)) pow = pow.add(upgradeEffect("re", 141));

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

      description: "Boost Bee skill points based on Honey.",

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
          hasUpgrade("re", 101) &&
          hasUpgrade("re", 102) &&
          hasUpgrade("re", 103)
        );
      },

      branches: ["101", "102"],
    },
    112: {
      title: "Skilled",

      description: "Boost Bee skill points based on Bee Skill Points.",

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
          hasUpgrade("re", 101) &&
          hasUpgrade("re", 102) &&
          hasUpgrade("re", 103)
        );
      },

      branches: ["102", "103"],
    },
    121: {
      title: "Super Skills",

      description: "Boost Bee skill points based on Development time.",

      cost: new OmegaNum(2000),

      effect() {
        let pow = new OmegaNum(1);

        return player.dev.points.add(1).log(10).div(100).add(1).pow(pow);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("re", 111) && hasUpgrade("re", 112);
      },

      branches: ["111", "112"],
    },
    131: {
      title: "Skilled Beehives",

      description: "Boost Bee skill points based on Beehives.",

      cost: new OmegaNum(10000),

      effect() {
        let pow = new OmegaNum(1);

        return player.hi.points.add(3).log(10).log(10).div(8).add(1).pow(pow);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("re", 121);
      },

      branches: ["121", "101"],
    },
    132: {
      title: "Insane.",

      description: "Boost Bee skill points based on Flowers.",

      cost: new OmegaNum(10000),

      effect() {
        let pow = new OmegaNum(1);

        return player.f.points.add(3).log(10).log(10).div(20).add(1).pow(pow);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("re", 121);
      },

      branches: ["121"],
    },
    133: {
      title: "Pollinated Skills",

      description: "Boost Bee skill points based on Pollen.",

      cost: new OmegaNum(10000),

      effect() {
        let pow = new OmegaNum(1);

        return player.p.points.add(3).log(10).log(10).div(17).add(1).pow(pow);
      },

      effectDisplay() {
        return "x" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return hasUpgrade("re", 121);
      },

      branches: ["121", "103"],
    },
    141: {
      title: "Booster",

      description: "Boost 'Ultra Power' based on Bee skill points.",

      cost: new OmegaNum(150000),

      effect() {
        let pow = new OmegaNum(0.5);

        return player.re.points.add(1).log(10).div(10).pow(pow);
      },

      effectDisplay() {
        return "Power +" + format(upgradeEffect(this.layer, this.id));
      },

      unlocked() {
        return (
          hasUpgrade("re", 131) &&
          hasUpgrade("re", 132) &&
          hasUpgrade("re", 133)
        );
      },

      branches: ["131", "132", "133"],
    },
    151: {
      title: "Insane Pollen",

      description: "xe25000 Pollen.",

      cost: new OmegaNum(175000),

      unlocked() {
        return hasUpgrade("re", 141);
      },

      branches: ["131", "141", "133"],
    },
    161: {
      title: "Bees have reincarnated",

      description: "Unlock something new. And 1 buyable",

      cost: new OmegaNum(400000),

      unlocked() {
        return hasUpgrade("re", 151);
      },

      branches: ["151"],
    },
    171: {

      title: "They get smarter",

      description: "Unlock 1 buyable, but disable ALL flower generation upgrades with effects.",

      cost: new OmegaNum(1e7),

      unlocked() {

        return hasUpgrade("re", 161);

      },

      branches: ["161"],

    },
    172: {

      title: "They get even smarter",

      description: "Unlock another buyable.",

      cost: new OmegaNum(2.5e8),

      unlocked() {

        return hasUpgrade("re", 171);

      },

      branches: ["161"],

    },
    173: {

      title: "150IQ Bees",

      description: "Unlock another buyable.",

      cost: new OmegaNum(1.5e9),

      unlocked() {

        return hasUpgrade("re", 172);

      },

      branches: ["161"],

    },
    174: {

      title: "175IQ Bees",

      description: "Unlock another buyable.",

      cost: new OmegaNum(1.5e11),

      unlocked() {

        return hasUpgrade("re", 173);

      },

      branches: ["161"],

    },
    181: {

      title: "Rein Booster",

      description: "Boost Reincarnated Bees based on Reincarnated Bees and unlock a new buyable.",

      cost: new OmegaNum("1e1058"),

      effect() {

        let pow = new OmegaNum(0.25);

        return player.re.reinBees.add(1).pow(pow);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect(this.layer, this.id));

      },

      unlocked() {

        return (

          hasUpgrade("re", 171) &&

          hasUpgrade("re", 172) &&

          hasUpgrade("re", 173) &&
          
          hasUpgrade("re", 174)

        );

      },

      branches: ["171", "172"],

    },
  },
  buyables: {
    11: {
      unlocked(){ return hasUpgrade('re', 161)},
      title: "Reincarnated Bees Upgrade",
      cost(x) {
        return new OmegaNum(10).times(new OmegaNum(1.35).pow(x));
      },

      display() {
            return "Boost Reincarnated Bees by x1.25 per purchase." + "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Reincarnated Bees" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/1000.<br>Effect: Boost Reincarnated Bee gain by x" + format(buyableEffect(this.layer, this.id))
        },
      canAfford() {
        return player[this.layer].reinBees.gte(this.cost());
      },

      buy() {
        player[this.layer].reinBees = player[this.layer].reinBees.sub(
          this.cost()
        );

        setBuyableAmount(
          this.layer,
          this.id,
          getBuyableAmount(this.layer, this.id).add(1)
        );
      },
      effect(x) {
        let base1 = new OmegaNum(1.25);
        let base2 = x;
        let exp = new OmegaNum(1)
        let eff = base1.pow(OmegaNum.pow(base2, exp));
        return eff
      },
      purchaseLimit: 1000
    },
    12: {
      unlocked(){ return hasUpgrade('re', 171)},
      
      title: "Flower Upgrade",

      cost(x) {

        return new OmegaNum("ee13").pow(new OmegaNum(2.5).pow(x));

      },

      display() {

            return "Boost Reincarnated Bees by x2 per purchase." + "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Flowers" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/1000.<br>Effect: Boost Reincarnated Bee gain by x" + format(buyableEffect(this.layer, this.id))

        },

      canAfford() {

        return player.f.points.gte(this.cost());

      },

      buy() {

        player.f.points = player.f.points.sub(

          this.cost()

        );

        setBuyableAmount(

          this.layer,

          this.id,

          getBuyableAmount(this.layer, this.id).add(1)

        );

      },

      effect(x) {

        let base1 = new OmegaNum(2);

        let base2 = x;

        let exp = new OmegaNum(1)

        let eff = base1.pow(OmegaNum.pow(base2, exp));

        return eff

      },
      purchaseLimit: 1000
    },
    13: {

      unlocked(){ return hasUpgrade('re', 172)},

      title: "Pollen Upgrade",

      cost(x) {

        return new OmegaNum("e1.5e11").pow(new OmegaNum(2).pow(x));

      },

      display() {

            return "Boost Reincarnated Bees by x2.5 per purchase." + "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Pollen" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/1000.<br>Effect: Boost Reincarnated Bee gain by x" + format(buyableEffect(this.layer, this.id))

        },

      canAfford() {

        return player.p.points.gte(this.cost());

      },

      buy() {

        player.p.points = player.p.points.sub(

          this.cost()

        );

        setBuyableAmount(

          this.layer,

          this.id,

          getBuyableAmount(this.layer, this.id).add(1)

        );

      },

      effect(x) {

        let base1 = new OmegaNum(2.5);

        let base2 = x;

        let exp = new OmegaNum(1)

        let eff = base1.pow(OmegaNum.pow(base2, exp));

        return eff

      },
      purchaseLimit: 1000
    },
    21: {

      unlocked(){ return hasUpgrade('re', 173)},

      title: "Beehive Upgrade",

      cost(x) {

        return new OmegaNum("e5e6").pow(new OmegaNum(5.5).pow(x));

      },

      display() {

            return "Boost Reincarnated Bees by x3 per purchase." + "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Beehives" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/1000.<br>Effect: Boost Reincarnated Bee gain by x" + format(buyableEffect(this.layer, this.id))

        },

      canAfford() {

        return player.hi.points.gte(this.cost());

      },

      buy() {

        player.hi.points = player.hi.points.sub(

          this.cost()

        );

        setBuyableAmount(

          this.layer,

          this.id,

          getBuyableAmount(this.layer, this.id).add(1)

        );

      },

      effect(x) {

        let base1 = new OmegaNum(3);

        let base2 = x;

        let exp = new OmegaNum(1)

        let eff = base1.pow(OmegaNum.pow(base2, exp));

        return eff

      },
      purchaseLimit: 1000
    },
    22: {

      unlocked(){ return hasUpgrade('re', 174)},

      title: "Queen Bee Upgrade",

      cost(x) {

        return new OmegaNum("500000").times(new OmegaNum(15).pow(x));

      },

      display() {

            return "Boost Reincarnated Bees by x4 per purchase." + "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Queen Bees" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/1000.<br>Effect: Boost Reincarnated Bee gain by x" + format(buyableEffect(this.layer, this.id))

        },

      canAfford() {

        return player.queen.points.gte(this.cost());

      },

      buy() {

        player.queen.points = player.queen.points.sub(

          this.cost()

        );

        setBuyableAmount(

          this.layer,

          this.id,

          getBuyableAmount(this.layer, this.id).add(1)

        );

      },

      effect(x) {

        let base1 = new OmegaNum(4);

        let base2 = x;

        let exp = new OmegaNum(1)

        let eff = base1.pow(OmegaNum.pow(base2, exp));

        return eff

      },
      purchaseLimit: 1000
    },
    23: {

      unlocked(){ return hasUpgrade('re', 181)},

      title: "Bee Skill Point Upgrade",

      cost(x) {

        return new OmegaNum("1e1058").times(new OmegaNum(100).pow(x));

      },

      display() {

            return "Boost Reincarnated Bees by x10 per purchase." + "<br>Cost: " + format(tmp[this.layer].buyables[this.id].cost) + " Bee skill points" + "<br>Bought: " + getBuyableAmount(this.layer, this.id) + "/1000.<br>Effect: Boost Reincarnated Bee gain by x" + format(buyableEffect(this.layer, this.id))

        },

      canAfford() {

        return player.re.points.gte(this.cost());

      },

      buy() {

        player.re.points = player.re.points.sub(

          this.cost()

        );

        setBuyableAmount(

          this.layer,

          this.id,

          getBuyableAmount(this.layer, this.id).add(1)

        );

      },

      effect(x) {

        let base1 = new OmegaNum(10);

        let base2 = x;

        let exp = new OmegaNum(1)

        let eff = base1.pow(OmegaNum.pow(base2, exp));

        return eff

      },

      purchaseLimit: 1000

    },
  },
  update(diff) {
    let gain = new OmegaNum(1)
    gain = gain.times(buyableEffect('re', 11))
    gain = gain.times(buyableEffect('re', 12))
    gain = gain.times(buyableEffect('re', 13))
    gain = gain.times(buyableEffect('re', 21))
    gain = gain.times(buyableEffect('re', 22))
    gain = gain.times(buyableEffect('re', 23))
    if(hasUpgrade('re', 181)) gain = gain.times(upgradeEffect('re', 181))
    
    player.re.reinBeesGain = gain
    gain = gain.times(diff)
    player.re.reinBees = player.re.reinBees.add(gain)
    },
});
