const contractAddress = 'CONTRACT_ADDRESS';
const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_farmer",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "addProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_id",
        "type": "string"
      }
    ],
    "name": "getProduct",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "products",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "farmer",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "location",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { id, name, farmer, location } = req.body;
      const provider = ethers.getDefaultProvider();
      const signer = provider.getSigner();

      const contract = new ethers.Contract(contractAddress, abi, signer);
      const addProductTx = await contract.addProduct(id, name, farmer, location);
      await addProductTx.wait();

      res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding product' });
    }
  } else if (req.method === 'GET') {
    try {
      const { id } = req.query;
      const provider = ethers.getDefaultProvider();

      const contract = new ethers.Contract(contractAddress, abi, provider);
      const product = await contract.getProduct(id);

      res.status(200).json({
        name: product[0],
        farmer: product[1],
        location: product[2],
        timestamp: product[3],
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving product' });
    }
  } else {
    res.status(404).json({ message: 'Invalid request method' });
  }
}
