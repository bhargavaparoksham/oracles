const PriceOracle = artifacts.require("PriceOracle");



module.exports = async function(deployer, network, accounts) {


  //Deploy nftGenerator

  await deployer.deploy(PriceOracle)
  const priceOracle = await PriceOracle.deployed()


};