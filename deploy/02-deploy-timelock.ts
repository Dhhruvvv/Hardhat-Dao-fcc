import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { MIN_DELAY, ADMIN_ADDRESS } from "../helper-hardhat-config";
import { ethers } from "hardhat";


const deployTimeLock = async function (
    hre : HardhatRuntimeEnvironment 
){
    const {getNamedAccounts, deployments, network }=hre;
    const {deploy , log } = deployments;
    const { deployer } =  await getNamedAccounts();
    log("Deploying TimeLock.......")
    const timelock = await deploy("TimeLock", {
        from : deployer,
        args : [MIN_DELAY, [], [], ADMIN_ADDRESS],
        log: true,
        // waitConfirmations: networkConfig[network.name].blockConfirmations || 1,
    })
    log(`timelock at ${timelock.address}`)

    /*
        if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
      await verify(governanceToken.address, [])
    } 
    */


}

export default deployTimeLock;