import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { ethers } from "hardhat";
import { VOTING_DELAY, VOTING_PERIOD, QUORAM_PERCENTAGE } from "../helper-hardhat-config";

const deployGovernorContract = async function (
    hre : HardhatRuntimeEnvironment 
){
    const {getNamedAccounts, deployments, network }=hre;
    const {deploy , log , get} = deployments;
    const { deployer } =  await getNamedAccounts();
    const governanceToken = await get("GovernanceToken");
    const timeLock = await get("TimeLock")

    log("Deploying GovernorContract.......")
    const governorContract = await deploy("MyGovernor", {
        from : deployer,
        args : [governanceToken.address, timeLock.address, VOTING_DELAY, VOTING_PERIOD, QUORAM_PERCENTAGE],
        log: true,
        // waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
    log(`timelock at ${governorContract.address}`)

    /*
        if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
      await verify(governanceToken.address, [])
    } 
    */


}

export default deployGovernorContract;