import { useState } from 'react';
import { useContractWrite } from 'wagmi'; 
import { MinterHelper as contractAddress } from '../contracts/contracts-address.json'; 
import { parseEther } from 'viem';
import abi from '../contracts/MinterHelper.json'
import './Header.css'

function Header() {
  const [amount, setAmount] = useState(0);
  const [canisterDepositAddress, setCanisterDepositAddress] = useState("0x0a80000000001000010101000000000000000000000000000000000000000000");

  const { isLoading, write } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "deposit",
    value: parseEther(amount.toString()),
    args: [canisterDepositAddress]
  });

  const changeAmountHandler = (e) => {
    let amount = e.target.valueAsNumber;
    if (Number.isNaN(amount) || amount < 0) amount = 0;
    setAmount(amount);
  };

  const changeAddressHandler = (e) => {
    setCanisterDepositAddress(e.target.value);
  };

  return (
    <div className='container'>
      <h1 className='title'>ckSepoliaETH Tester</h1>
      <div className='form'>
        <input 
          type="text" 
          value={canisterDepositAddress} 
          onChange={changeAddressHandler} 
          placeholder="Canister Deposit Address" 
          disabled={isLoading}
          className='input'
        />
        <input 
          type="number" 
          value={amount} 
          onChange={changeAmountHandler} 
          placeholder="Amount" 
          disabled={isLoading}
          className='input'
        />
        <button onClick={() => write()} disabled={isLoading} className='button'>
          {isLoading ? 'Processing...' : 'Deposit'}
        </button>
        {isLoading && <div className="loading-indicator">Loading...</div>}
      </div>
    </div>
  );
}

export default Header;