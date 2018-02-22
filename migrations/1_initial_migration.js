var InrtToken = artifacts.require("./InrtToken.sol");
module.exports = function(deployer) {
  deployer.deploy(InrtToken, 1000000000, "inrt" , "inrt" , 2);
};
