const RandomNumberGenerator = artifacts.require("RandomNumberGenerator");



module.exports = async function(deployer, network, accounts) {


  //Deploy RandomNumGenerator

  await deployer.deploy(RandomNumberGenerator)
  const randomNumGenerator = await RandomNumberGenerator.deployed()


};