// SPDX-License-Identifier: MIT
pragma solidity  0.8.23;

contract Day1{
    string public outstring = "helloworld";

    function update(string memory stringupadte) public {
        outstring = stringupadte;
    }
}
