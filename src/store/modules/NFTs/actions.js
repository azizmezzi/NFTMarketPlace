// export default {
//   createNFT(context, data) {
//     const NFTData = {
//       id: "c3",
//       firstName: data.first,
//       lastName: data.last,
//       description: data.description,
//       hourlyRate: data.rate,
//       areas: data.areas,
//     };
//     console.log({ NFTData });
//     context.commit("createNFT", NFTData);
//   },
// };

// import getWeb3 from "../../../util/getWeb3.js";
import { ethers } from "ethers";
// import axios from "axios";
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
    const name = await ContractNFT.name();
    const symbol = await ContractNFT.symbol();
    const amt = await ethers.utils.formatUnits(count);
    const counting = amt * Math.pow(10, 18);
    const NFTData = [];
    console.log(name, symbol);
    for (let i = 1; i <= counting; i++) {
      const uri = await ContractNFT.tokenURI(i);
      // axios.get(uri).then((response) => console.log({ response }));
      NFTData.push({
        id: i,
        name: "NFT collection",
        areas: ["frontend", "backend", "career"],
        description: "metadata nft",
        uri,
      });
    }
    return NFTData;
  }
};

export default {
  connectWallet: async (context) => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("must connect");
      return;
    }
    const myAccount = await ethereum.request({ method: "eth_requestAccounts" });
    const NFTData = await getNFTs(myAccount[0]);
    context.commit("connectWallet", { NFTData, account: myAccount[0] });
  },

  spinnerLaunch(context) {
    context.commit("spinnerLaunch");
  },

  createNFT: async (context, uri) => {
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
        context.commit("createNFT", {
          id: "c1",
          name: "NFT collection",
          areas: ["frontend", "backend", "career"],
          description: "metadata nft",
          uri,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },
  minNFT: () => {},
  CreateMarketPlace: () => {},
};
