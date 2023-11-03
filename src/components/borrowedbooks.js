import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import LibraryManagementContract from '../Library.json';
import '../bookcard.css';

import Navbar from './navconnection';

export default function Profile () {
    const [data, updateData] = useState([]);
   

    async function getborrowed() {
        const ethers = require("ethers");
        let sumPrice = 0;
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();

        //Pull the deployed contract instance
        let contract = new ethers.Contract(LibraryManagementContract.address, LibraryManagementContract.abi, signer)
        // updating the part to fetch bid amount
        
      
        let borrowedbooks = await contract.getBorrowedBooks();

        updateData(borrowedbooks);
        
        }
        async function handlereturn(id) {
            const ethers = require("ethers");
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            //Pull the deployed contract instance
             let contract = new ethers.Contract(LibraryManagementContract.address, LibraryManagementContract.abi, signer)
            // //create an NFT Token
             await contract.returnBook(id);
             console.log('book returned borrowed');
           
        };

        


getborrowed();


        return (
            <div>
              <Navbar/>
              <h2>Your Borrowed Books</h2>
              <ul>
                {data.map((book, index) => (
                    <>
                   <div class="book-card">
                   <h2 class="book-title">{book.title}</h2>
                   <p class="book-author">Author:{book.author}</p>
                   <p class="book-year">Year of Publish:{book.yearOfPublish}</p>
                   <button style={{backgroundColor:'red',color:'white'}} onClick={ handleBorrow(book.id)}>Borrow</button>
               </div>
               <button style={{backgroundColor:'red',color:'white'}} onClick={ handlereturn(book.id)}>return</button>

                  <div className="mt-10 text-xl">
                  {data.length == 0 ? "Oops, No books to display (Are you logged in?)":""}
              </div>
              </>
                ))}
              </ul>
            </div>
          );
        
    }