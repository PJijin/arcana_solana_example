"use client";
import { AuthProvider } from '@arcana/auth'; //From npm

import { useEffect, useState } from 'react';

const MyComponent = () => {
  const [provider, setProvider] = useState<any>(null);
  const [auth, setAuth] = useState<any>(null);
  const [from, setFrom] = useState('');
  const [request, setRequest] = useState('');
  const [result, setResult] = useState('');
  const [account, setAccount] = useState('');

  useEffect(() => {
    const auth = new AuthProvider("xar_test_7fdc8f17b0900f0638dd7e415e387d10a12befba");
    setAuth(auth);
    setProvider(auth.provider)
  }, []);



  const logout = async () => {
    console.log("Requesting logout");
    try {
      await auth.logout();
      setAccount("-");
    } catch (e) {
      console.log({ e });
    }
  };

  const getAccounts = async () => {
    console.log("Requesting accounts");
    try {
      setRequest("getAccounts");
      const accounts = await provider.request({
        method: "getAccounts",
        params: [''],
      });
      console.log({ accounts });
      const fromAccount = accounts[0];
      setFrom(fromAccount);
      provider.publicKey = new window.solanaWeb3.PublicKey(fromAccount);
      setAccount(fromAccount);
      setResult(fromAccount);
    } catch (e) {
      console.error(e);
      setResult(e);
    }
  };

  const sign = async () => {
    console.log("Requesting signature");
    setRequest("signMessage");
    const message = `To avoid digital dognappers, sign below to authenticate with CryptoCorgis`;
    const encodedMessage = new TextEncoder().encode(message);

    try {
      const signature = await solanaP.signMessage(encodedMessage, "hex");
      window.solanaSig = signature;
      setResult(JSON.stringify(signature, null, 2));
      console.log(signature);
    } catch (e) {
      console.error(e);
      setResult(e);
    }
  };

  const connect = async () => {
    console.log("Requesting connect wallet");
    setRequest("connect_wallet");
    try {
      const connectedProvider = await auth.connect();
      console.log({ connectedProvider });
      await getAccounts();
    } catch (error) {
      console.log(error);
    }
  };

  const signTransaction = async () => {
    try {
      setRequest("signTransaction");
      console.log(provider);
      const pk = new window.solanaWeb3.PublicKey(
        (
          await provider.request({
            method: "getAccounts",
            params: [],
          })
        )[0],
      );
      const connection = new window.solanaWeb3.Connection(
        window.solanaWeb3.clusterApiUrl("testnet"),
      );
      let minRent = await connection.getMinimumBalanceForRentExemption(0);
      let blockhash = await connection
        .getLatestBlockhash()
        .then((res) => res.blockhash);

      const payer = solanaP; // Arcana Solana API

      const instructions = [
        window.solanaWeb3.SystemProgram.transfer({
          fromPubkey: pk,
          toPubkey: pk,
          lamports: minRent,
        }),
      ];
      const messageV0 = new window.solanaWeb3.TransactionMessage({
        payerKey: pk,
        recentBlockhash: blockhash,
        instructions,
      }).compileToV0Message();
      let transaction = new window.solanaWeb3.VersionedTransaction(messageV0);

      const signature = await payer.signTransaction(transaction);
      console.log(signature);
      setResult(JSON.stringify(signature, null, 2));
    } catch (e) {
      console.error(e);
      setResult(e);
    }
  };

  const signAndSendTransaction = async () => {
    try {
      setRequest("signAndSendTransaction");

      const pk = new window.solanaWeb3.PublicKey(
        (
          await provider.request({
            method: "getAccounts",
            params: [],
          })
        )[0],
      );
      const connection = new window.solanaWeb3.Connection(
        window.solanaWeb3.clusterApiUrl("testnet"),
      );
      let minRent = await connection.getMinimumBalanceForRentExemption(0);
      let blockhash = await connection
        .getLatestBlockhash()
        .then((res) => res.blockhash);

      const payer = solanaP; // Arcana Solana API

      const instructions = [
        window.solanaWeb3.SystemProgram.transfer({
          fromPubkey: pk,
          toPubkey: pk,
          lamports: minRent,
        }),
      ];

      const messageV0 = new window.solanaWeb3.TransactionMessage({
        payerKey: pk,
        recentBlockhash: blockhash,
        instructions,
      }).compileToV0Message();
      let transaction = new window.solanaWeb3.VersionedTransaction(messageV0);

      const transactionSent = await payer.signAndSendTransaction(transaction);

      console.log({ transactionSent });
      setResult(JSON.stringify(transactionSent, null, 2));
    } catch (e) {
      console.error(e);
      setResult(e);
    }
  };

  const signAllTransactions = async () => {
    try {
      setRequest("signAllTransactions");

      const pk = new window.solanaWeb3.PublicKey(
        (
          await provider.request({
            method: "getAccounts",
            params: [],
          })
        )[0],
      );
      const connection = new window.solanaWeb3.Connection(
        window.solanaWeb3.clusterApiUrl("testnet"),
      );
      let minRent = await connection.getMinimumBalanceForRentExemption(0);
      let blockhash = await connection
        .getLatestBlockhash()
        .then((res) => res.blockhash);

      const payer = solanaP; // Arcana Solana API

      const instructions = [
        window.solanaWeb3.SystemProgram.transfer({
          fromPubkey: pk,
          toPubkey: pk,
          lamports: minRent,
        }),
      ];

      const messageV0 = new window.solanaWeb3.TransactionMessage({
        payerKey: pk,
        recentBlockhash: blockhash,
        instructions,
      }).compileToV0Message();
      let transaction = new window.solanaWeb3.VersionedTransaction(messageV0);

      const transactionSent = await payer.signAllTransactions([
        transaction,
        transaction,
        transaction,
      ]);

      console.log({ transactionSent });
      setResult(JSON.stringify(transactionSent, null, 2));
    } catch (e) {
      console.error(e);
      setResult(e);
    }
  };


  return (
    <>
      <div className="mx-auto max-w-screen-xl px-1 md:px-4 sm:px-6 relative ">

        <div className="flex items-center justify-between  mt-20 ">
          <h1 className="text-3xl font-semibold">Arcana Solana API</h1>
          <a href="https://docs.arcana.network/quick-start/solana-quick-start" target='_BLANK' className='text-gray-400 hover:text-gray-900'>
            Docs
          </a>
        </div>
        <div className='rounded-lg bg-white shadow-sm'>
          <div className="grid grid-cols-3 gap-5 mt-10 p-10">
            <div className='flex flex-col space-y-3'>
              <button className="bg-[#f3f4f6] rounded-md py-2" onClick={connect}>Connect</button>
              <button className="bg-[#f3f4f6] rounded-md py-2" onClick={getAccounts}>Get Accounts</button>
              <button className="bg-[#f3f4f6] rounded-md py-2" onClick={sign}>Sign Message</button>
              <button className="bg-[#f3f4f6] rounded-md py-2" onClick={signAndSendTransaction}>
                Sign & Send Transaction
              </button>
              <button className="bg-[#f3f4f6] rounded-md py-2" onClick={signTransaction}>
                Sign Transaction
              </button>
              <button className="bg-[#f3f4f6] rounded-md py-2" onClick={signAllTransactions}>
                Sign All Transactions
              </button>
              <button className="bg-[#f3f4f6] rounded-md py-2" onClick={logout}>Logout</button>
            </div>
            <section>
              <h2 className="section-heading">STATUS</h2>
              <div className="pill">
                <span className="sub-heading">Current account: </span>
                <span className="sub-value" id="account">{account ?? '-'}</span>
                <br />
              </div>
              <div className="pill">
                <span className="sub-heading">REQ: </span>
                <span className="sub-value" id="request">{request}</span>
                <br />
              </div>
              <div className="pill">
                <span className="sub-heading">RESULT: </span>
                <pre className="sub-value" id="result">{JSON.stringify(result)}</pre>
                <br />
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default MyComponent;
