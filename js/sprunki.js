addLayer('h', {
  
  name: "honey",
  
  symbol: "H",
  
  position: 0,
  
  startData(){
    return {
      unlocked: false,
      	points: new OmegaNum(0)
    }},

    color: "#FFC30B",

    passiveGeneration(){

      let p = new OmegaNum(0)

      return p

    },

  

    requires(){ 
      let req = new OmegaNum("1e9")
      return req
    },// Can be a function that takes requirement increases into account

    resource: "honey", // Name of prestige currency

    baseResource: "pollen", // Name of resource prestige is based on

    baseAmount() {return player.p.points}, // Get the current amount of baseResource

    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have

    exponent: 1.002, // Prestige currency exponent
    
    base: 10,
  
    gainMult() { // Calculate the multiplier for main currency from bonuses

        mult = new OmegaNum(1)	        
        return mult

    },

    gainExp() { // Calculate the exponent on main currency from bonuses

        return new OmegaNum(1)

    },

    row: 2, // Row the layer is in on the tree (0 is the first row)

  

    branches: ["p"],

    hotkeys: [

        {key: "h", description: "H: Reset for honey", onPress(){if (canReset(this.layer)) doReset(this.layer)}},

    ],
  
    canBuyMax(){ return hasMilestone('h', 3)},
    
    layerShown(){ return (player.points.gte("10^^10^^1e4000") || player.h.unlocked)},
  
    milestoneEffect1(){
      return new OmegaNum(10).pow(player.h.points)
    },
  
    milestones: {
      0: {
        requirementDescription: "1 Honey",
        effectDescription: "x10 Flowers and keep Flower Upgrade Automation.",
        done(){ return player.h.points.gte('1')}
      },
      1: {

        requirementDescription: "3 Honey",

        effectDescription: "x3 Flowers.",

        done(){ return player.h.points.gte('3')},

        unlocked(){ return hasMilestone('h', 0)}
        
      },
      2: {

        requirementDescription: "6 Honey",

        effectDescription: "Automate Pollen upgrades and unlock a new Pollen upgrade.",

        done(){ return player.h.points.gte('6')},

        unlocked(){ return hasMilestone('h', 1)}

      },
      3: {

        requirementDescription: "12 Honey",

        effectDescription(){ return 'Buy max Honey and boost Flowers based on Honey. Currently: x' + format(tmp.h.milestoneEffect1)},

        done(){ return player.h.points.gte('12')},
          
        unlocked(){ return hasMilestone('h', 2)}

      },
      4: {

        requirementDescription: "13 Honey",

        effectDescription: "Always have at least 100% of Pollen per second and unlock a new row of Pollen upgrades.",

        done(){ return player.h.points.gte('13')},

        unlocked(){ return hasMilestone('h', 3)}

      },
      5: {

        requirementDescription: "43 Honey",

        effectDescription: "Honey base is 3.",

        done(){ return player.h.points.gte('43')},

        unlocked(){ return hasMilestone('h', 4)}

      },
      6: {

        requirementDescription: "54 Honey",

        effectDescription: "Unlock a new row of Flower upgrades.",

        done(){ return player.h.points.gte('54')},

        unlocked(){ return hasMilestone('h', 5)}

      },
      
    },
	
    effect(){
      let base = new OmegaNum(2.5)
      if(hasMilestone('h',5)) base = base.add(0.5)
      return new OmegaNum(base).pow(player.h.points)
    },
  
    effectDescription(){
      return 'which is boosting Pollen by x' + format(layers.h.effect())
    },
  
})