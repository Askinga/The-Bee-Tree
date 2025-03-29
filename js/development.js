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

  requires: new OmegaNum("10^^10^^10^^6"), // Can be a function that takes requirement increases into account

  resource: "seconds of beehive development time", // Name of prestige currency

  baseResource: "bees", // Name of resource prestige is based on

  baseAmount() {
    return player.points;
  }, // Get the current amount of baseResource

  type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have

  exponent: 0, // Prestige currency exponent

  passiveGeneration() {
    let p = new OmegaNum(0);

    if (player.dev.points.gte(1)) p = p.add(1);

    return p;
  },

  prestigeButtonText() {
    return "Start beehive development. Need FF1.0000F6 Bees";
  },

  gainMult() {
    // Calculate the multiplier for main currency from bonuses

    mult = new OmegaNum(1);

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
    "upgrades"
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

  clickables: {
    11: {
      title: "Start the Development",

      display() {
        return "Starts Beehive Development";
      },

      onClick(){
        return player.dev.points = player.dev.points.add(1)
      },
      
      canClick(){ return !player.dev.points.gte(1)},
      
      style() {
        return { ...tmtBuyable };
      },
    },
  },
  upgrades: {
    11: {
      title: "Queens get happy",
      description: "Development time boosts Queen Bee base.",
      cost: new OmegaNum(60),
      effect(){
        return player.dev.points.addpow(0.01)
      },
      effectDisplay(){
        return "+"+format(upgradeEffect(this.layer, this.id))
      },
  },
  },
});
