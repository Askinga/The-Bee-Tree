addLayer('s', {
  
  name: "Sprunki",
  
  symbol: "S",
  
  position: 0,
  
  startData(){
    return {
      unlocked: false,
      	points: new OmegaNum(0)
    }},

    color: "#dd00ff",

    passiveGeneration(){

      let p = new OmegaNum(0)

      return p

    },

  

    requires(){ 
      let req = new OmegaNum("10^^10^^1e5000")
      req = req.tetrate(new OmegaNum(10).tetrate(new OmegaNum("e5000").pow(player.s.points.add(1).times(0.2))))
      return req
    },// Can be a function that takes requirement increases into account

    resource: "sprunki", // Name of prestige currency

    baseResource: "bees", // Name of resource prestige is based on

    baseAmount() {return player.points}, // Get the current amount of baseResource

    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have

    exponent: 0, // Prestige currency exponent

    gainMult() { // Calculate the multiplier for main currency from bonuses

        mult = new OmegaNum(1)	        
        return mult

    },

    gainExp() { // Calculate the exponent on main currency from bonuses

        return new OmegaNum(1)

    },

    row: 1, // Row the layer is in on the tree (0 is the first row)

  

    branches: ["p"],

    hotkeys: [

        {key: "s", description: "S: Reset for sprunki", onPress(){if (canReset(this.layer)) doReset(this.layer)}},

    ],
    
    layerShown(){ return player.points.gte("10^^10^^1e4000")}

})