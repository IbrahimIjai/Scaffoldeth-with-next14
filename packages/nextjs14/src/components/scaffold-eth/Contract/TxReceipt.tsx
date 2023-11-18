"use client"
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { TransactionReceipt } from "viem";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { displayTxResult } from "~~/components/scaffold-eth";

export const TxReceipt = (
  txResult: string | number | bigint | Record<string, any> | TransactionReceipt | undefined,
) => {
  const [txResultCopied, setTxResultCopied] = useState(false);

  return (
    <div className="flex min-h-0 py-0 text-sm rounded-3xl peer-checked:rounded-b-none bg-secondary">
      <div className="pl-2 mt-1">
        {txResultCopied ? (
          <CheckCircleIcon
            className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
            aria-hidden="true"
          />
        ) : (
          <CopyToClipboard
            text={displayTxResult(txResult) as string}
            onCopy={() => {
              setTxResultCopied(true);
              setTimeout(() => {
                setTxResultCopied(false);
              }, 800);
            }}
          >
            <DocumentDuplicateIcon
              className="ml-1.5 text-xl font-normal text-sky-600 h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
          </CopyToClipboard>
        )}
      </div>
      <div className="flex-wrap collapse collapse-arrow">
        <input type="checkbox" className="min-h-0 peer" />
        <div className="collapse-title text-sm min-h-0 py-1.5 pl-1">
          <strong>Transaction Receipt</strong>
        </div>
        <div className="overflow-auto rounded-t-none collapse-content bg-secondary rounded-3xl">
          <pre className="pt-4 text-xs">{displayTxResult(txResult)}</pre>
        </div>
      </div>
    </div>
  );
};
