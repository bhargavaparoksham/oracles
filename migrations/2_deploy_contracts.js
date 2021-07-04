const PriceOracle = artifacts.require("PriceOracle");


module.exports = async function(deployer, network, accounts) {


  //Deploy priceOracle

  await deployer.deploy(PriceOracle)
  const priceOracle = await PriceOracle.deployed()


};