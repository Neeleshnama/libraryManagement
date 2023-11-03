import React, { useState, useEffect } from 'react';
//import Web3 from 'web3';
import LibraryManagementContract from '../Library.json';
import '../bookcard.css';
function Librarydashboard() {
    const booksData = [
        {
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            yearOfPublish: 1925,
        },
        {   id:0,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            yearOfPublish: 1960,
        },
        {    id:1,
            title: "1984",
            author: "George Orwell",
            yearOfPublish: 1949,
        },
        {    id:2,
            title: "Pride and Prejudice",
            author: "Jane Austen",
            yearOfPublish: 1813,
        },
        {    id:3,
            title: "The Hobbit",
            author: "J.R.R. Tolkien",
            yearOfPublish: 1937,
        },
        {    id:4,
            title: "The Catcher in the Rye",
            author: "J.D. Salinger",
            yearOfPublish: 1951,
        },
    ];
    // you need to input the books at time of deployment by owner only
    
    
    
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [availableBooks, setAvailableBooks] = useState([]);

 
    async function loadBlockchainData() {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(LibraryManagementContract.address, LibraryManagementContract.abi, signer)
        // //create an NFT Token
         let books= await contract.getAvailableBooks();
         books.wait();
         
           setAvailableBooks(books);
          
      }
    

    loadBlockchainData();
 
  async function handleBorrow(id) {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
     let contract = new ethers.Contract(LibraryManagementContract.address, LibraryManagementContract.abi, signer)
    // //create an NFT Token
     await contract.borrowBook(id);
     console.log('book sucessfully borrowed');
   
};

  return (
    <div className="App">
      <h1>Available Books</h1>
      <ul>
        {availableBooks.map((book, index) => (
            <div class="book-card">
            <h2 class="book-title">{book.title}</h2>
            <p class="book-author">Author:{book.author}</p>
            <p class="book-year">Year of Publish:{book.yearOfPublish}</p>
            <button style={{backgroundColor:'red',color:'white'}} onClick={ handleBorrow(book.id)}>Borrow</button>
        </div>
       
        ))}
      </ul>
    </div>
  );
}

export default Librarydashboard;
