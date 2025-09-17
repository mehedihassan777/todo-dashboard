import React from "react";
import { post } from "@/services/http";
import { isAxiosError } from "axios";
import { getCookie } from "@/utils/cookie";
interface ReferralItem {
  id: number;
  referralStatusText: string;
  referredCustomerName: string;
  referredCustomerContanctInfo: string;
  referredBy: string;
  referrerId: number;
  referrerType: number;
  referredOn: string;
  schemeName: string;
  projectValue: number;
  leadStatus: number;
  leadStatusText: string;
  rewardValue: number;
  totalCount: number;
  referralStatus: number;
  stageName: string;
  payoutStatusText: string;
}
enum ReferralStatus {
  Active = 1,
  Won = 2,
  Lost = 3,
}
const statusColors: Record<number, string> = {
  [ReferralStatus.Won]: "bg-[#00C17B]",
  [ReferralStatus.Active]: "bg-[#666]/60",
  [ReferralStatus.Lost]: "bg-[#ff3f41]",
};

const DashboardTable: React.FC = () => {
  const [data, setData] = React.useState<ReferralItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const ut = getCookie("ut");
        const payload = {
          itemsPerPage: 10,
          pageNo: 1,
          searchText: "",
          sortColumn: 1,
          sortOrder: 1,
          userType: ut,
        };
        const response = await post<{ data: ReferralItem[] }>(
          "referral/list",
          payload
        );
        setData(response.data.data || []);
      } catch (err: unknown) {
        if (isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to load referrals");
        } else {
          setError("Failed to load referrals");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="table-responsive overflow-x-auto">
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : (
        <table className="app-table mt-6 w-5xl lg:w-full">
          <thead>
            <tr>
              <th className="w-24">Ref . No</th>
              <th>Status</th>
              <th>
                Referred <br /> Customer Name
              </th>
              <th>Referred On</th>
              <th>Scheme</th>
              <th>Project Value (€)</th>
              <th>Project Stage</th>
              <th>Reward Value (€)</th>
              <th>Payout Status</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center py-8">
                  No referrals found.
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td className="px-4 py-3">REF-{item.id}</td>
                  <td>
                    <span
                      className={`rounded-sm px-2 py-1 text-xs font-medium text-white ${
                        statusColors[item.referralStatus]
                      }`}
                    >
                      {item.referralStatusText}
                    </span>
                  </td>
                  {/* <td className="px-4 py-3">{item.referralStatusText}</td> */}
                  <td className="px-4 py-3">{item.referredCustomerName}</td>
                  <td className="px-4 py-3">
                    {new Date(item.referredOn).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{item.schemeName}</td>
                  <td className="px-4 py-3">€{item.projectValue}</td>
                  <td className="px-4 py-3">{item.stageName}</td>

                  <td className="px-4 py-3">€{item.rewardValue}</td>                  npx playwright install
                  <td className="px-4 py-3">{item.payoutStatusText}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DashboardTable;
