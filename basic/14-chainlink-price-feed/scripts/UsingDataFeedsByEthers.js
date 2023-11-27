require('dotenv').config();

const { ethers } = require('ethers'); // for nodejs only
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_ID}`);
const aggregatorV3InterfaceABI = require('@chainlink/contracts/abi/v0.8/AggregatorV3Interface.json');

const addr = '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e';
const addr_sepolia="0x694AA1769357215DE4FAC081bf1f309aDC325306";
const priceFeed = new ethers.Contract(addr_sepolia, aggregatorV3InterfaceABI, provider);

async function test() {
  const roundData = await priceFeed.latestRoundData();
  console.log('Latest Round Data', roundData);
  const price = roundData[1];
  const decimal = await priceFeed.decimals();
  // 精度是8位
  console.log('decimal = ', decimal);

  console.log("eth's price = ", price.toNumber() / 10 ** decimal + 'USD');
}

test();
