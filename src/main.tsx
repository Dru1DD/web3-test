import { useWeb3Modal } from '@web3modal/wagmi/react'
import {useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import {contractABI} from "./contracts/test";

export const Main = () => {
    const { open } = useWeb3Modal()
    const { address } = useAccount();

    const { config } = usePrepareContractWrite({
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        abi: contractABI,
        functionName: 'approve',
        account: address,
        args: ['0x9f9A1f45DeAaCAC32859a69bdEE02Dec35839460', 1000000000000],
    })
    const { data, isLoading, isSuccess, write } = useContractWrite(config)

    console.log("Data", data);

    return (
            <div className="w-[100wh] h-[100vh] flex justify-center items-center flex-col bg-gray-700 border-2">
                <h1 className="font-bold text-white ">Web3Test</h1>
                {address && <h2 className={"text-white"}>{address}</h2>}
                <button className={"p-5 rounded-lg text-white bg-purple-800"} onClick={() => open()}>Connect</button>

                { address ? (
                    <div className={"mt-5"}>
                        <button className={"p-5 rounded-lg text-white bg-purple-800"} onClick={() => write?.()}>Feed</button>
                        {isLoading && <div className={"text-white"}>Check Wallet</div>}
                        {isSuccess && <div className={"text-white"}>Transaction: {JSON.stringify(data)}</div>}
                    </div>
                ) : <h1>Connect firstly wallet</h1>}
            </div>

    )
}