import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Receipt, ArrowDownLeft, ArrowUpRight, Pickaxe, Gift } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { getTableName, supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

interface Transaction {
  id: string;
  type: "purchase" | "deposit" | "withdrawal" | "referral_bonus";
  description: string;
  amount: number;
  currency: string;
  status: string;
  date: string;
}

const TransactionHistory = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [{ data: purchases }, { data: deposits }, { data: withdrawals }, { data: referrals }] =
        await Promise.all([
          supabase.from(getTableName("user_purchases")).select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
          supabase.from(getTableName("deposits")).select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
          supabase.from(getTableName("withdrawals")).select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
          supabase.from(getTableName("referrals")).select("*").eq("referred_id", user.id).order("created_at", { ascending: false }),
        ]);

      const txs: Transaction[] = [];

      (purchases ?? []).forEach((p) =>
        txs.push({
          id: p.id,
          type: "purchase",
          description: `${p.plan_name} (${p.duration_days}d)`,
          amount: -p.plan_price,
          currency: p.plan_type?.toUpperCase() === "USDT" ? "USDT" : "USD",
          status: p.status,
          date: p.created_at,
        })
      );

      (deposits ?? []).forEach((d) =>
        txs.push({
          id: d.id,
          type: "deposit",
          description: `Deposit ${d.currency.toUpperCase()}`,
          amount: d.amount,
          currency: d.currency.toUpperCase(),
          status: d.status,
          date: d.created_at,
        })
      );

      (withdrawals ?? []).forEach((w) =>
        txs.push({
          id: w.id,
          type: "withdrawal",
          description: `Withdraw to ${w.wallet_address.slice(0, 8)}...`,
          amount: -w.amount,
          currency: w.currency.toUpperCase(),
          status: w.status,
          date: w.created_at,
        })
      );

      (referrals ?? []).forEach((r) =>
        txs.push({
          id: r.id,
          type: "referral_bonus",
          description: "Referral bonus",
          amount: r.bonus_amount,
          currency: "USDT",
          status: r.status,
          date: r.created_at,
        })
      );

      txs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setTransactions(txs);
      setLoading(false);
    };
    load();
  }, [user]);

  const filtered = filter === "all" ? transactions : transactions.filter((t) => t.type === filter);

  const iconMap = {
    purchase: <Pickaxe className="h-4 w-4 text-primary" />,
    deposit: <ArrowDownLeft className="h-4 w-4 text-green-400" />,
    withdrawal: <ArrowUpRight className="h-4 w-4 text-red-400" />,
    referral_bonus: <Gift className="h-4 w-4 text-yellow-400" />,
  };

  const statusColor = (s: string) => {
    if (s === "active" || s === "approved" || s === "credited") return "bg-green-500/20 text-green-400 border-green-500/30";
    if (s === "pending") return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    if (s === "expired" || s === "rejected") return "bg-red-500/20 text-red-400 border-red-500/30";
    return "bg-muted text-muted-foreground";
  };

  const filters = [
    { key: "all", label: "All" },
    { key: "purchase", label: "Purchases" },
    { key: "deposit", label: "Deposits" },
    { key: "withdrawal", label: "Withdrawals" },
    { key: "referral_bonus", label: "Bonuses" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transaction History</h1>
          <p className="text-muted-foreground text-sm mt-1">All account activity including purchases, deposits & withdrawals</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${
                filter === f.key
                  ? "bg-primary/20 text-primary border-primary/30"
                  : "bg-card text-muted-foreground border-border hover:border-primary/20"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-4 sm:p-6">
          {loading ? (
            <p className="text-muted-foreground text-center py-8">Loading...</p>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <Receipt className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No transactions found.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filtered.map((tx) => (
                <div key={tx.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    {iconMap[tx.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(tx.date).toLocaleDateString()} {new Date(tx.date).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-mono font-semibold ${tx.amount >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {tx.amount >= 0 ? "+" : ""}
                      {tx.currency === "BTC" ? `₿${Math.abs(tx.amount).toFixed(6)}` : `$${Math.abs(tx.amount).toFixed(2)}`}
                    </p>
                    <Badge variant="outline" className={`text-[10px] ${statusColor(tx.status)}`}>
                      {tx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default TransactionHistory;
