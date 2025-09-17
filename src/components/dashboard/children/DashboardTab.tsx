"use client";

import React, { useState } from "react";

const TABS = [
  { id: 1, name: "Dashboard", value: "dashboard" },
  { id: 1, name: "Referrals", value: "referrals" },
];

interface DashboardTabProps {
  loadingStats?: boolean;
  statsError?: string | null;
}

interface RefHighlight {
  totalEarnedRewards: number;
  totalPendingAmount: number;
  totalClaimedAmount: number;
  totalReferrals: number;
}
const DashboardTab: React.FC<DashboardTabProps> = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [refHighlight, setRefHighlight] = useState<RefHighlight | null>(null);

  return (
    <div className="container mx-auto px-4 lg:p-0 lg:mb-24 mb-12">
      <div className="flex gap-2 my-6 lg:my-10">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            className={`px-6 py-3 font-normal text-base rounded-3xl transition-colors duration-200 focus:outline-none cursor-pointer w-full sm:w-auto ${
              activeTab === tab.value
                ? "bg-white text-[#0D0D0D] font-semibold shadow-[0_0_11px_0_rgba(13,13,13,0.20)]"
                : "text-[#204971]/70 hover:bg-white"
            }`}
            onClick={() => setActiveTab(tab.value)}
            type="button"
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="mt-6">
        {activeTab === "dashboard" && (
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="block">
                <svg
                  className="animate-bounce"
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 32 32"
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="16"
                    fill="#08A742"
                    fillOpacity="0.15"
                  />
                  <circle cx="16" cy="16" r="8" fill="#08A742" />
                </svg>
              </span>
              <h2 className="text-2xl font-bold text-[#0D0D0D] animate-fade-in">
                Welcome to your Dashboard!
              </h2>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4 lg:gap-6 sm:mt-6 mt-4">
              {/* item */}
              <div className="referral-highligh-item rounded-xl p-4  flex gap-4 border border-[#0D0D0D]/15 bg-[#FAFFFC]">
                <div className="flex items-center gap-3">
                  <div className="">
                    <div className="lg:w-20 w-18 lg:h-20 h-18 rounded-full flex place-content-center bg-[#E7FEEF] text-[#08A742]">
                      <svg width="28" viewBox="0 0 28 32" fill="currentColor">
                        <use href="/images/sprite.svg#svg-euro"></use>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-xl font-normal text-[#0D0D0D]">
                      Rewards Earned
                    </h6>
                    <h2 className="text-4xl text-[#0D0D0D] my-1">
                      <span className="text-xl text-[#0D0D0D]/40">€</span>
                      {refHighlight?.totalEarnedRewards ?? 120}
                    </h2>
                    <p className="text-base font-normal text-[#08A742]">
                      Nice work! Keep sharing to earn more.
                    </p>
                  </div>
                </div>
              </div>
              {/* item */}
              <div className="referral-highligh-item rounded-xl p-4  flex gap-4 border border-[#0D0D0D]/15 bg-[#FBFAFF]">
                <div className="flex items-center gap-3">
                  <div className="">
                    <div className="lg:w-20 w-18 lg:h-20 h-18 rounded-full flex place-content-center bg-[#EDE8FC] text-[#16044D]">
                      <svg width="33" viewBox="0 0 33 32" fill="currentColor">
                        <use href="/images/sprite.svg#svg-gift-box"></use>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-xl font-normal text-[#0D0D0D]">
                      Total Referrals
                    </h6>
                    <h2 className="text-4xl text-[#0D0D0D] my-1">
                      {refHighlight?.totalReferrals ?? 8}
                    </h2>
                    <p className="text-base font-normal text-[#16044D]">
                      €{refHighlight?.totalPendingAmount ?? 50} is on the way -
                      just a few steps to go!
                    </p>
                  </div>
                </div>
              </div>
              {/* item */}
              <div className="referral-highligh-item rounded-xl p-4  flex gap-4 border border-[#0D0D0D]/15 bg-[#F7F7F7]">
                <div className="flex items-center gap-3">
                  <div className="">
                    <div className="lg:w-20 w-18 lg:h-20 h-18 rounded-full flex place-content-center bg-[#ECECEC] text-[#0D0D0D]">
                      <svg width="33" viewBox="0 0 33 26" fill="currentColor">
                        <use href="/images/sprite.svg#svg-card-pending"></use>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-xl font-normal text-[#0D0D0D]">
                      Pending Payout
                    </h6>
                    <h2 className="text-4xl text-[#0D0D0D] my-1">
                      <span className="text-xl text-[#0D0D0D]/40">€</span>
                      {refHighlight?.totalPendingAmount ?? 50}
                    </h2>
                    <p className="text-base font-normal text-[#0D0D0D]">
                      €{refHighlight?.totalClaimedAmount ?? 70} already claimed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "referrals" && (
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="block">
                <svg
                  className="animate-bounce"
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 32 32"
                >
                  <circle
                    cx="16"
                    cy="16"
                    r="16"
                    fill="#08A742"
                    fillOpacity="0.15"
                  />
                  <circle cx="16" cy="16" r="8" fill="#08A742" />
                </svg>
              </span>
              <h2 className="text-2xl font-bold text-[#0D0D0D] animate-fade-in">
                Your Rewards Status
              </h2>
            </div>
            <div className="p-4 lg:px-6 pb-2 border border-[#D2D1D4] rounded-2xl">
              <h4 className="md:text-xl text-base font-semibold mb-2 md:mb-0 text-[#0D0D0D]">
                Rewards Summary
              </h4>

              <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-x-4 lg:gap-x-12">
                {/* Item */}
                <div className="referral-summary py-4 flex gap-4 border-b border-[#0D0D0D]/15">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex place-content-center bg-[#EC8D6915] text-[#EC8D69]">
                      <svg width="18" viewBox="0 0 28 32" fill="currentColor">
                        <use href="/images/sprite.svg#svg-euro"></use>
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-normal">Rewards Earned</p>
                      <h2 className="!text-2xl text-[#0D0D0D] mt-1 leading-6">
                        5
                      </h2>
                    </div>
                  </div>
                </div>
                {/* Item */}
                <div className="referral-summary py-4 flex gap-4 border-b border-[#0D0D0D]/15">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex place-content-center bg-[#EDE8FC] text-[#8B73D6]">
                      <svg width="18" viewBox="0 0 33 32" fill="currentColor">
                        <use href="/images/sprite.svg#svg-gift-box"></use>
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-normal">Total Referrals</p>
                      <h2 className="!text-2xl text-[#0D0D0D] mt-1 leading-6">
                        12
                      </h2>
                    </div>
                  </div>
                </div>
                {/* Item */}
                <div className="referral-summary py-4 flex gap-4 border-b border-[#0D0D0D]/15">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex place-content-center bg-[#08A8FF15] text-[#08A8FF]">
                      <svg width="21" viewBox="0 0 21 20" fill="currentColor">
                        <use href="/images/sprite.svg#svg-check-circle"></use>
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-normal">Pending Payout</p>
                      <h2 className="!text-2xl text-[#0D0D0D] mt-1 leading-6">
                        3
                      </h2>
                    </div>
                  </div>
                </div>
                {/* Item */}
                <div className="referral-summary py-4 flex gap-4 border-b lg:border-0 border-[#0D0D0D]/15">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex place-content-center bg-[#FAD22315] text-[#DFB80C]">
                      <svg width="20" viewBox="0 0 20 21" fill="currentColor">
                        <use href="/images/sprite.svg#svg-time-pending"></use>
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-normal">
                        Pending Referral Amount
                      </p>
                      <h2 className="!text-2xl text-[#0D0D0D] mt-1 leading-6">
                        7
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Item */}
                <div className="referral-summary py-4 flex gap-4 border-b md:border-0 border-[#0D0D0D]/15">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex place-content-center bg-[#FF505015] text-[#FF4D74]">
                      <svg width="25" viewBox="0 0 25 17" fill="currentColor">
                        <use href="/images/sprite.svg#svg-lost"></use>
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-normal">Lost</p>
                      <h2 className="!text-2xl text-[#0D0D0D] mt-1 leading-6">
                        2
                      </h2>
                    </div>
                  </div>
                </div>
                {/* Item */}
                <div className="referral-summary py-4 flex gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex place-content-center bg-[#08A74215] text-[#08A742]">
                      <svg width="25" viewBox="0 0 33 26" fill="currentColor">
                        <use href="/images/sprite.svg#svg-card-pending"></use>
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-normal">Already Claimed</p>
                      <h2 className="!text-2xl text-[#0D0D0D] mt-1 leading-6">
                        4
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            {/* <DashboardTable /> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardTab;
