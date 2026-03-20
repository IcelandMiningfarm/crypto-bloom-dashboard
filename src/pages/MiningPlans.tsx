import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Check, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import DashboardLayout from "@/components/DashboardLayout";

const plans = [
  { name: "Starter", price: 100, hashrate: 10, daily: 0.00015, duration: "365 days", popular: false },
  { name: "Pro", price: 500, hashrate: 50, daily: 0.00085, duration: "365 days", popular: true },
  { name: "Elite", price: 1000, hashrate: 120, daily: 0.002, duration: "365 days", popular: false },
  { name: "Enterprise", price: 5000, hashrate: 700, daily: 0.012, duration: "365 days", popular: false },
];

const MiningPlans = () => {
  const [investment, setInvestment] = useState(500);

  const estimatedDaily = (investment * 0.0017) / 100;
  const estimatedMonthly = estimatedDaily * 30;
  const estimatedYearly = estimatedDaily * 365;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Mining Plans</h1>
          <p className="text-muted-foreground text-sm mt-1">Choose a plan that fits your goals</p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-6 relative ${plan.popular ? "border-primary/50 glow-primary" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 gradient-primary rounded-full text-xs font-semibold text-primary-foreground">
                  Most Popular
                </div>
              )}
              <h3 className="text-lg font-bold text-foreground mb-1">{plan.name}</h3>
              <div className="text-3xl font-bold text-foreground mb-1">
                <span className="text-accent">${plan.price}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-5">{plan.duration}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-foreground">{plan.hashrate} TH/s</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">~{plan.daily} BTC/day</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">24/7 uptime</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Auto payout</span>
                </div>
              </div>

              <Button className={`w-full ${plan.popular ? "gradient-primary text-primary-foreground glow-primary" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                Purchase Plan
              </Button>
            </motion.div>
          ))}
        </div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Calculator className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">ROI Calculator</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-sm text-muted-foreground">Investment Amount (USD)</label>
              <Input
                type="number"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="bg-secondary border-border font-mono text-lg"
              />
              <Slider
                value={[investment]}
                onValueChange={(v) => setInvestment(v[0])}
                min={100}
                max={10000}
                step={100}
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground">Drag to adjust investment</p>
            </div>

            <div className="space-y-4">
              <div className="glass-card p-4 bg-secondary/50">
                <p className="text-xs text-muted-foreground mb-1">Estimated Daily</p>
                <p className="text-lg font-mono font-bold text-primary">{estimatedDaily.toFixed(6)} BTC</p>
              </div>
              <div className="glass-card p-4 bg-secondary/50">
                <p className="text-xs text-muted-foreground mb-1">Estimated Monthly</p>
                <p className="text-lg font-mono font-bold text-accent">{estimatedMonthly.toFixed(5)} BTC</p>
              </div>
              <div className="glass-card p-4 bg-secondary/50">
                <p className="text-xs text-muted-foreground mb-1">Estimated Yearly</p>
                <p className="text-lg font-mono font-bold text-foreground">{estimatedYearly.toFixed(4)} BTC</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default MiningPlans;
