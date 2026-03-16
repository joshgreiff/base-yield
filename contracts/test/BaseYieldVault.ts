import { expect } from "chai";
import { ethers } from "hardhat";

describe("BaseYield vault scaffold", function () {
  it("mints and burns shares for Money Mode", async function () {
    const [user] = await ethers.getSigners();
    const moneyFactory = await ethers.getContractFactory("MoneyModeVault");
    const moneyVault = await moneyFactory.deploy();
    await moneyVault.waitForDeployment();

    await (await moneyVault.connect(user).deposit(1_000n)).wait();
    const shareTokenAddress = await moneyVault.shareToken();
    const shareToken = await ethers.getContractAt("VaultShareToken", shareTokenAddress);
    expect(await shareToken.balanceOf(user.address)).to.equal(1_000n);

    await (await moneyVault.connect(user).withdraw(400n)).wait();
    expect(await shareToken.balanceOf(user.address)).to.equal(600n);
  });
});
