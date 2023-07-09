import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
// import {verify } from "../utils/verify";
const deployGovernanceToken = async function (
    hre : HardhatRuntimeEnvironment 
){
    const {getNamedAccounts, deployments, network }=hre;
    const {deploy , log } = deployments;
    const { deployer } =  await getNamedAccounts();
    log("Deploying Governance TOken..")
    const governanceToken = await deploy("GovernanceToken", {
        from : deployer,
        args : [],
        log: true,
        // waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
    log(`GovernanceToken at ${governanceToken.address}`)
    /*
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
      await verify(governanceToken.address, [])
    }
  } 
  */
 log(`Delegating to ${deployer}`)
 await delegate(governanceToken.address, deployer)
 log("Delegated!")
};
 
const delegate = async (governanceTokenAddress : string, delegatedAccount: string ) => {
  const governanceToken = await ethers.getContractAt("GovernanceToken",governanceTokenAddress);
  const tx = await governanceToken.delegate(delegatedAccount);

  await tx.wait(1);
  console.log(
    `Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`
  );
};


export default deployGovernanceToken;