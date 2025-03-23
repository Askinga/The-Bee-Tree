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

    exponent: 1, // Prestige currency exponent
    
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
    
    layerShown(){ return (player.points.gte("10^^10^^1e4000") || player.h.unlocked)},
  
    milestones: {
      0: {
        requirementDescription: "1 Honey",
        effectDescription: "x10 Flowers and keep Flower Upgrade Automation.",
        done(){ return player.h.points.gte('1')}
      },
      1: {

        requirementDescription: "3 Honey",

        effectDescription: "x3 Flowers",

        done(){ return player.h.points.gte('3')},

        unlocked(){ return hasMilestone('h', 0)}
        
      },
      12: {

        requirementDescription: "6 Honey",

        effectDescription: "x3 Flowers",

        done(){ return player.h.points.gte('3')},

        unlocked(){ return hasMilestone('h', 0)}

        

      },
    },
	
    effect(){
      return new OmegaNum(2.5).pow(player.h.points)
    },
  
    effectDescription(){
      return 'which is boosting Pollen by x' + format(layers.h.effect())
    },
  
})