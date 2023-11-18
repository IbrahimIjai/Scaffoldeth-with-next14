"use client"
import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { Faucet } from "~~/components/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const isLocalNetwork = getTargetNetwork().id === hardhat.id;

  return (
    <div className="min-h-0 px-1 py-5 mb-11 lg:mb-0">
      <div>
        <div className="fixed bottom-0 left-0 z-10 flex items-center justify-between w-full p-4 pointer-events-none">
          <div className="flex flex-col gap-2 pointer-events-auto md:flex-row">
            {nativeCurrencyPrice > 0 && (
              <div>
                <div className="gap-1 font-normal normal-case cursor-auto btn btn-primary btn-sm">
                  <CurrencyDollarIcon className="w-4 h-4" />
                  <span>{nativeCurrencyPrice}</span>
                </div>
              </div>
            )}
            {isLocalNetwork && (
              <>
                <Faucet />
                <Link href="/blockexplorer" passHref className="gap-1 font-normal normal-case btn btn-primary btn-sm">
                  <MagnifyingGlassIcon className="w-4 h-4" />
                  <span>Block Explorer</span>
                </Link>
              </>
            )}
          </div>
          <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        </div>
      </div>
      <div className="w-full">
        <ul className="w-full menu menu-horizontal">
          <div className="flex items-center justify-center w-full gap-2 text-sm">
            <div className="text-center">
              <a href="https://github.com/scaffold-eth/se-2" target="_blank" rel="noreferrer" className="link">
                Fork me
              </a>
            </div>
            <span>·</span>
            <div className="flex items-center justify-center gap-2">
              <p className="m-0 text-center">
                Built with <HeartIcon className="inline-block w-4 h-4" /> at
              </p>
              <a
                className="flex items-center justify-center gap-1"
                href="https://buidlguidl.com/"
                target="_blank"
                rel="noreferrer"
              >
                <BuidlGuidlLogo className="w-3 h-5 pb-1" />
                <span className="link">BuidlGuidl</span>
              </a>
            </div>
            <span>·</span>
            <div className="text-center">
              <a href="https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA" target="_blank" rel="noreferrer" className="link">
                Support
              </a>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};
