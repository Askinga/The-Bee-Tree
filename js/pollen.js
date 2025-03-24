addLayer("p", {

    name: "pollen", // This is optional, only used in a few places, If absent it just uses the layer id.

    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized

    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order

    startData() { return {

        unlocked: false,

		points: new OmegaNum(0),    }},

    color: "#FFFFE0",

    passiveGeneration(){
      let p = new OmegaNum(0)
      if(hasUpgrade('p',21)) p = p.add(1)
      if(hasMilestone('h',4)) p = p.add(1)
      if(hasUpgrade('p',23)) p = p.times(5)
      return p
    },
  
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
        if(hasUpgrade('p',21)) mult = mult.times(upgradeEffect('p',21))
        if(hasUpgrade('p',22)) mult = mult.times(upgradeEffect('p',22))
        if(hasUpgrade('p',23)) mult = mult.times(2)
        if(hasUpgrade('p',31)) mult = mult.times(2)   
        if(hasUpgrade('p',32)) mult = mult.times(upgradeEffect('p',32))
        if(hasUpgrade('p',33)) mult = mult.times(upgradeEffect('p',33))
        mult = mult.times(layers.h.effect())
        if(hasUpgrade('p',34)) mult = mult.times(upgradeEffect('p',34))
        if(hasUpgrade('p',35)) mult = mult.times(upgradeEffect('p',35))
        if(hasUpgrade('p',41)) mult = mult.times(upgradeEffect('p',41))
        if(hasUpgrade('p',42)) mult = mult.times(upgradeEffect('p',42))
        if(hasUpgrade("p", 45)) mult = mult.times(upgradeEffect("p", 45));
        mult = mult.times(new OmegaNum(10).pow(challengeCompletions("h", 11),2))
        if(inChallenge('h', 11)) mult = mult.times(0) 
        return mult

    },

    gainExp() { // Calculate the exponent on main currency from bonuses

        exp = new OmegaNum(1)
        if(hasUpgrade('f', 62)) exp = exp.times(1.05)
        return exp
    },

    row: 1, // Row the layer is in on the tree (0 is the first row)
  
    branches: ["f"],

    hotkeys: [

        {key: "p", description: "P: Reset for pollen", onPress(){if (canReset(this.layer)) doReset(this.layer)}},

    ],
  
    autoUpgrade(){return hasMilestone('h', 2)},
	
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
      
      unlocked(){ return hasUpgrade('p',11)}

    },
    13: {

      title: "Faster",

      description: "Boost Flowers by x4 and x2 Pollen.",

      cost: new OmegaNum(2),
      
      unlocked(){ return hasUpgrade('p',12)}

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
      
      unlocked(){ return hasUpgrade('p',13)}
   },
    15: {

      title: "Faster 2",

      description: "Boost Flowers by x10 and x2.5 Pollen.",

      cost: new OmegaNum(100),

      unlocked(){ return hasUpgrade('p',14)}
    },
    21: {

      title: "Faster Pollen",

      description: "Boost Pollen based on Pollen and +100% of Pollen per sec.",

      cost: new OmegaNum("300"),

      effect() {

        return player.p.points.add(1).pow(0.1);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("p", 21));

      },

      

      unlocked(){ return hasUpgrade('p',15)}

    },
    22: {

      title: "Even More Pollen",

      description: "Boost Pollen based on Pollen again",

      cost: new OmegaNum("3000"),

      effect() {

        return player.p.points.add(1).log(10).add(1).pow(1.25);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("p", 22));

      },

      

      unlocked(){ return hasUpgrade('p',21)}

   },
    23: {

      title: "Even Faster Pollen",

      description: "x2 Pollen and x5 of Pollen per sec.",

      cost: new OmegaNum("75000"),

      unlocked(){ return hasUpgrade('p',22)}

   },
    24: {

      title: "Faster Bees",

      description: "Boost Flower Upgrade 3 based on Pollen",

      cost: new OmegaNum("1e6"),

      effect() {

        return player.p.points.add(1).pow(0.02);

      },

      effectDisplay() {

        return "Tetration Power x" + format(upgradeEffect("p", 24));

      },

      

      unlocked(){ return hasUpgrade('p',23)}

   },
    25: {

      title: "Even Faster Bees",

      description: "Boost Flower Upgrade 3 based on Pollen",

      cost: new OmegaNum("1.5e6"),

      effect() {

        return player.p.points.add(1).log(10).add(1).pow(1.1);

      },

      effectDisplay() {

        return "Tetration Power x" + format(upgradeEffect("p", 25));

      },

      

      unlocked(){ return hasUpgrade('p',24)}

   },
    31: {

      title: "More Pollen and Flowers 2",

      description: "Boost Flowers based on Pollen again and x2 Pollen",

      cost: new OmegaNum("2e6"),

      effect() {

        return player.p.points.add(1).pow(2);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("p", 31));

      },

      

      unlocked(){ return hasUpgrade('p',25)}

   },
    32: {

      title: "Even More Pollen 2",

      description: "Boost Pollen based on Flowers",

      cost: new OmegaNum("5e6"),

      effect() {

        return player.f.points.add(1).pow(0.001);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("p", 32));

      },

      

      unlocked(){ return hasUpgrade('p',31)}

   },
    33: {

      title: "Even More Pollen 3",

      description: "Boost Pollen based on Pollen again",

      cost: new OmegaNum("1e7"),

      effect() {

        return player.p.points.add(1).log(10).add(1).pow(1.3);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("p", 33));

      },

      

      unlocked(){ return hasUpgrade('p',32)}

   },
    34: {

      title: "Even More Pollen 4",

      description: "Boost Pollen based on Pollen again",

      cost: new OmegaNum("3e9"),

      effect() {

        return player.p.points.add(1).log(10).add(1).pow(1.4);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("p", 34));

      },

      

      unlocked(){ return hasUpgrade('p',33)}

   },
    35: {

      title: "Even More Pollen 5",

      description: "Boost Pollen based on Pollen again",

      cost: new OmegaNum("5e14"),

      effect() {

        return player.p.points.add(1).log(10).add(1).pow(1.5);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("p", 35));

      },

      

      unlocked(){ return hasMilestone('h',2)}

   },
    41: {

      title: "Even More Pollen 6",

      description: "Boost Pollen based on Pollen again",

      cost: new OmegaNum("1e22"),

      effect() {

        return player.p.points.add(1).log(10).add(1).pow(1.6);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("p", 41));

      },

      

      unlocked(){ return hasMilestone('h',4)}

   },
     42: {

      title: "Even More Pollen 7",

      description: "Boost Pollen based on Pollen again",

      cost: new OmegaNum("1e29"),

      effect() {

        return player.p.points.add(1).log(10).add(1).pow(1.7);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("p", 42));

      },

      

      unlocked(){ return hasUpgrade('p', 41)}

   },
    43: {

      title: "Pollinated Flowers",

      description: "^1.05 Flowers",

      cost: new OmegaNum("7.5e37"),

      unlocked(){ return hasUpgrade('p', 42)}

   },
    44: {

      title: "Flower Boost",

      description: "Boost Flowers based on Pollen again",

      cost: new OmegaNum("1e38"),

      effect() {

        return player.p.points.add(1).pow(2.25);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("p", 44));

      },

      

      unlocked(){ return hasUpgrade('p', 43)}

   },
    45: {

      title: "Faster Pollen 2",

      description: "Boost Pollen based on Pollen again.",

      cost: new OmegaNum("1e39"),

      effect() {

        return player.p.points.add(1).pow(0.1);

      },

      effectDisplay() {

        return "x" + format(upgradeEffect("p", 45));

      },

      

      unlocked(){ return hasUpgrade('p',44)}

    },
    },
})