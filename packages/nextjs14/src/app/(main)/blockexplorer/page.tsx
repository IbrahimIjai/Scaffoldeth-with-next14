"use client"
import { useEffect } from "react";
import type { NextPage } from "next";
import { hardhat } from "viem/chains";
import { PaginationButton } from "~~/components/blockexplorer/PaginationButton";
import { SearchBar } from "~~/components/blockexplorer/SearchBar";
import { TransactionsTable } from "~~/components/blockexplorer/TransactionsTable";
import { useFetchBlocks } from "~~/hooks/scaffold-eth";
import { getTargetNetwork, notification } from "~~/utils/scaffold-eth";

const Blockexplorer: NextPage = () => {
  const { blocks, transactionReceipts, currentPage, totalBlocks, setCurrentPage, error } = useFetchBlocks();

  useEffect(() => {
    if (getTargetNetwork().id === hardhat.id && error) {
      notification.error(
        <>
          <p className="mt-0 mb-1 font-bold">Cannot connect to local provider</p>
          <p className="m-0">
            - Did you forget to run <code className="text-base italic font-bold bg-base-300">yarn chain</code> ?
          </p>
          <p className="mt-1 break-normal">
            - Or you can change <code className="text-base italic font-bold bg-base-300">targetNetwork</code> in{" "}
            <code className="text-base italic font-bold bg-base-300">scaffold.config.ts</code>
          </p>
        </>,
      );
    }

    if (getTargetNetwork().id !== hardhat.id) {
      notification.error(
        <>
          <p className="mt-0 mb-1 font-bold">
            <code className="text-base italic font-bold bg-base-300"> targeNetwork </code> is not localhost
          </p>
          <p className="m-0">
            - You are on <code className="text-base italic font-bold bg-base-300">{getTargetNetwork().name}</code> .This
            block explorer is only for <code className="text-base italic font-bold bg-base-300">localhost</code>.
          </p>
          <p className="mt-1 break-normal">
            - You can use{" "}
            <a className="text-accent" href={getTargetNetwork().blockExplorers?.default.url}>
              {getTargetNetwork().blockExplorers?.default.name}
            </a>{" "}
            instead
          </p>
        </>,
      );
    }
  }, [error]);

  return (
    <div className="container mx-auto my-10">
      <SearchBar />
      <TransactionsTable blocks={blocks} transactionReceipts={transactionReceipts} />
      <PaginationButton currentPage={currentPage} totalItems={Number(totalBlocks)} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Blockexplorer;
