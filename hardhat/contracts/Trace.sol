// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Trace {
    struct Product {
        string name;
        string farmer;
        string location;
        uint timestamp;
    }

    mapping(string => Product) public products;

    function addProduct(
        string memory _id,
        string memory _name,
        string memory _farmer,
        string memory _location
    ) public {
        Product memory newProduct = Product({
            name: _name,
            farmer: _farmer,
            location: _location,
            timestamp: block.timestamp
        });
        products[_id] = newProduct;
    }

    function getProduct(
        string memory _id
    ) public view returns (string memory, string memory, string memory, uint) {
        Product memory product = products[_id];
        return (
            product.name,
            product.farmer,
            product.location,
            product.timestamp
        );
    }
}
