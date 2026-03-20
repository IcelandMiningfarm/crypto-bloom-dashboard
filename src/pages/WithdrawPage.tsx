import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpFromLine, Clock, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/DashboardLayout";

const withdrawHistory = [
  { id: "WD001", amount: "0.02 BTC", status: "Completed", date: "2026-03-17", address: "bc1q...8h3k" },
  { id: "WD002", amount: "0.01 BTC", status: "Pending", date: "2026-03-19", address: "bc1q...9m2j" },
  { id: "WD003", amount: "200 USDT", status: "Rejected", date: "2026-03-14", address: "TN3k...7a" },
];

const WithdrawPage = () => {
  const [amount, setAmount] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Withdraw</h1>
          <p className="text-muted-foreground text-sm mt-1">Request a withdrawal from your balance</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Withdrawal Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <ArrowUpFromLine className="h-5 w-5 text-primary" />
              <h3 className="text-foreground font-semibold">Request Withdrawal</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Wallet Address</label>
                <Input placeholder="Enter your BTC wallet address" className="bg-secondary border-border font-mono text-xs" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Amount (BTC)</label>
                <Input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="bg-secondary border-border font-mono"
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Available: 0.04521 BTC</span>
                <button onClick={() => setAmount("0.04521")} className="text-primary hover:underline">Max</button>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Network Fee</span><span className="font-mono">0.0001 BTC</span>
                </div>
                <div className="flex justify-between text-xs text-foreground font-medium">
                  <span>You Receive</span>
                  <span className="font-mono">{amount ? (parseFloat(amount) - 0.0001).toFixed(5) : "0.00000"} BTC</span>
                </div>
              </div>
              <Button className="w-full gradient-primary text-primary-foreground glow-primary">
                Submit Withdrawal
              </Button>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
            <h3 className="text-foreground font-semibold mb-4">Withdrawal Info</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-sm text-foreground font-medium">Processing Time</p>
                <p className="text-xs text-muted-foreground mt-1">Withdrawals are processed within 24 hours after admin approval.</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/5 border border-accent/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <AlertTriangle className="h-3.5 w-3.5 text-accent" />
                  <p className="text-sm text-foreground font-medium">Minimum Withdrawal</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">0.005 BTC or 50 USDT</p>
              </div>
              <div className="p-4 rounded-lg bg-secondary/50">
                <p className="text-sm text-foreground font-medium">Network Fees</p>
                <p className="text-xs text-muted-foreground mt-1">BTC: 0.0001 BTC · USDT (TRC20): 1 USDT</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* History */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <h3 className="text-foreground font-semibold mb-4">Withdrawal History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-muted-foreground border-b border-border">
                  <th className="text-left py-3 font-medium">ID</th>
                  <th className="text-left py-3 font-medium">Amount</th>
                  <th className="text-left py-3 font-medium">Address</th>
                  <th className="text-left py-3 font-medium">Status</th>
                  <th className="text-left py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {withdrawHistory.map((tx) => (
                  <tr key={tx.id} className="border-b border-border/50">
                    <td className="py-3 font-mono text-foreground">{tx.id}</td>
                    <td className="py-3 font-mono text-foreground">{tx.amount}</td>
                    <td className="py-3 font-mono text-muted-foreground">{tx.address}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
                        tx.status === "Completed" ? "bg-primary/10 text-primary" :
                        tx.status === "Pending" ? "bg-accent/10 text-accent" :
                        "bg-destructive/10 text-destructive"
                      }`}>
                        {tx.status === "Completed" ? <CheckCircle2 className="h-3 w-3" /> :
                         tx.status === "Pending" ? <Clock className="h-3 w-3" /> :
                         <XCircle className="h-3 w-3" />}
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default WithdrawPage;
