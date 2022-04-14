// import getWeb3 from "../../../util/getWeb3.js";
import { ethers } from "ethers";
import artifactNFT from "../../../artifacts/contracts/NFT.sol/NFTCollection.json";

const contractAddress = "0xEb4dFccEfa40DA23fa0E8762DA3F966058b91F12";
const contractABI = artifactNFT.abi;

const getNFTs = async (account) => {
  const { ethereum } = window;
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const ContractNFT = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    console.log(signer, ContractNFT);
    const count = await ContractNFT.balanceOf(account);
    const amt = await ethers.utils.formatUnits(count);
    const counting = amt * Math.pow(10, 18);
    for (let i = 1; i <= counting; i++) {
      const uri = await ContractNFT.tokenURI(i);
      console.log(uri);
    }
  }
};

export default {
  connectWallet: async () => {
    const { ethereum } = window;
    if (!ethereum) {
      //   const provider = new ethers.providers.Web3Provider(ethereum);
      //   const signer = provider.getSigner();
      //   console.log(signer);
      alert("must connect");
      return;
    }
    const myAccount = await ethereum.request({ method: "eth_requestAccounts" });
    console.log(myAccount);
    getNFTs(myAccount[0]);
  },

  createNFT: async (uri) => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const ContractNFT = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const myAccount = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log(myAccount);

        const contractTxn = await ContractNFT.createCollectible(uri);
        await contractTxn.wait();
      }
    } catch (e) {
      console.log(e);
    }
  },
  minNFT: () => {},
  CreateMarketPlace: () => {},
};
