import {React, useEffect, useState} from "react";
import "./item.css";
import { useLocation } from "react-router";
import {  NftMarketplace_address, abi_marketplace } from "./../../constants";
import { ethers } from "ethers";
import { useMoralis } from "react-moralis";



const ProfileItem = () => {
 
  const {user} = useMoralis();
  const location = useLocation();
  const nft = location.state?.data;
  //console.log(nft);
  

  const [loanRepaid, setLoanRepaid] = useState()
  const [nftClaimed, setNftClaimed] = useState()
  const [timeRemaining, setTimeRemaining] = useState()

  useEffect(() => {
    isLoanRepaid()
    getTimeRemaining()
  }, []);




  async function getTimeRemaining() {
    if (window.ethereum) {
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      const signer = provider.getSigner();
      
      const marketplaceContract = new ethers.Contract(
        NftMarketplace_address,
        abi_marketplace,
        signer
      );

      const response = await marketplaceContract.getTimeRemaining(
        nft.token_address._value,
        nft.token_id
      );
      
      console.log(response.toString()/86400);
      setTimeRemaining(response.toString()/86400)
      
    } 
    
    else alert("Sorry no wallet found");
     
  }

  async function repay() {
    if (window.ethereum) {
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      const signer = provider.getSigner();
      
      const marketplaceContract = new ethers.Contract(
        NftMarketplace_address,
        abi_marketplace,
        signer
      );

      const response = await marketplaceContract.repayLoan(
        nft.token_address._value,
        nft.token_id,
        {
          value: ethers.utils.parseEther("0.007"),
        }
      )
      
      console.log(response);
      
    } 
    
    else alert("Sorry no wallet found");
     
  }

   async function isLoanRepaid()  {
    if (window.ethereum) {
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      const signer = provider.getSigner();
      
      const marketplaceContract = new ethers.Contract(
        NftMarketplace_address,
        abi_marketplace,
        signer
      );

      const response = await marketplaceContract.getLoanData(
        nft.token_address._value,
        nft.token_id,
      ).then(()=> {   
        
          if(response.state === 2 ) {
            setLoanRepaid(true)
          }
          console.log("Loan Repaid", loanRepaid);
        
        });
      
    
      
    } 
    
    else alert("Sorry no wallet found");
     
  }

  async function claimNFT()  {
    if (window.ethereum) {
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      const signer = provider.getSigner();
      
      const marketplaceContract = new ethers.Contract(
        NftMarketplace_address,
        abi_marketplace,
        signer
      );

      const response = await marketplaceContract.claimNFTbyBuyer(
        nft.token_address._value,
        nft.token_id,
      ).then(()=> { setNftClaimed(true)});
      
      console.log(response);
      
    } 
    
    else alert("Sorry no wallet found");
     
  }
 
  return (
    <div className="item section__padding">
        <div className="item-image">
        <img
            src={nft.metadata?.image.replace(
              "ipfs://",
              "https://ipfs.moralis.io:2053/ipfs/"
            )}
             alt=""
        />
        </div>
          <div className="item-content">
            <div className="item-content-title">
              <h1>{nft.metadata?.name} #{nft.token_id}</h1>
         
            </div>
            <div>
             <div className="item-content-detail">
            
              <p>{nft.metadata?.description}</p>
              </div>
            { !nftClaimed ? (
             <div>
              <div className="item-content-detail">
              <p>Owner: 0xB9e53abF5b0bAE6353076467F0505DebA8A98efa</p>
              <p>Time Remaining : {timeRemaining} Days</p>
              <p><span>*Note: Failure to pay full amount in the remaining time will result in default of the sale, which means you won't be able to claim your NFT.</span></p>
            </div>

            <div className="item-content-buy">  

             
              {
                loanRepaid? (
                  <button className="primary-btn" onClick={()=> claimNFT()}>
                    Claim NFT
                  </button>
                )
              : 
                (
                  <button className="primary-btn" onClick={()=>repay()} > 

                    Pay 0.007 ETH 

                  </button>
                )
              }
             </div>
             </div>
            
            ) 
            
            : 
            
            <div className="item-content-detail">
            <p>Owner: {user.attributes.ethAddress}</p>
            <p><span> Checout your NFT on testnet.opensea.io (Goerli) </span></p>
            </div>
            }

            </div>
          </div>
      </div>
  );
};

export default ProfileItem;
