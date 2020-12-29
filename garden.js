// 1. Calulate cost for crop
const getCostsForCrop = input => input.crop.cost * input.numCrops;

// 2. Calulate revenue for crop
const getRevenueForCrop = input => input.crop.salePrice * input.numCrops;

// 3 & 10 Calculate profit for crop
// const getProfitForCrop = input => getRevenueForCrop(input) - getCostsForCrop(input);

const getProfitForCrop = (input, environmentFactors) => {
    if (!environmentFactors) return getRevenueForCrop(input) - getCostsForCrop(input);
    return getYieldForCrop(input, environmentFactors) * getRevenueForCrop(input) - getCostsForCrop(input);
};

// 4 & 11 Calculate total profit for multiple crops
const getTotalProfit = ({ crops }) => {
    const getProfitOfEachCrop = crops.map(crop => getProfitForCrop(crop));
    return getProfitOfEachCrop.reduce((accumulator, currentValue) => accumulator + currentValue);
}

// 5. BONUS Edit already written functions above to calculate enviroments too

// 6. add given environment factors
const getYieldForPlant = (plant, environmentFactors) => {
    if (!environmentFactors) return plant.yield;

    // Get different environment factors
    for (let [key, value] of Object.entries(environmentFactors)) {
        {
            let factorReference = plant.factors[key];
            let factorValue = factorReference[value];
            plant.yield = plant.yield * (100 + factorValue) / 100;
        }
    }
    return plant.yield;
}

const getYieldForCrop = (plant, environmentFactors) => {
    if (!environmentFactors) return plant.yield * plant.numCrops;

    for (let [key, value] of Object.entries(environmentFactors)) {
        {

            const factorReference = plant.crop['factors'][key]
                //let factorReference = plant.crop.factors[key];
                //        console.log('factorReference : ' + factorReference)
                //      console.log('waarde : ' + factorReference.low)
                //    console.log("low:" + factorReference.low + " medium : " + factorReference.medium + " high : " + factorReference.high)
            let factorValue = factorReference[value];
            //  console.log("gezochte waarde : " + key + " " + factorValue)
            plant.yield = plant.yield * (100 + factorValue) / 100;
        }
    }
    //console.log('basis ' + plant.yield + " " + plant.numCrops)
    //console.log("geretourneerde yield : " + plant.yield * plant.numCrops)
    return plant.yield * plant.numCrops;
}

const getTotalYield = ({ crops }) => { // ({}) shorthand to create objects
    const getYieldOfEachCrop = crops.map(crop => crop.crop.yield * crop.numCrops);
    return getYieldOfEachCrop.reduce((accumulator, currentValue) => accumulator + currentValue);
}




module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit
};