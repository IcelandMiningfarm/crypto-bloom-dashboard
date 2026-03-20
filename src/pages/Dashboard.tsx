import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bitcoin, DollarSign, TrendingUp, Zap, ArrowUpRight, ArrowDownRight,
  Wallet, Activity, BarChart3, Clock
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import DashboardLayout from "@/components/DashboardLayout";

const generateChartData = () => {
  const data = [];
  for (let i = 0; i < 30; i++) {
    data.push({
      day: `Day ${i + 1}`,
      earnings: +(Math.random() * 0.005 + 0.002).toFixed(5),
      hashrate: +(Math.random() * 20 + 80).toFixed(1),
    });
  }
  return data;
};

const AnimatedNumber = ({ value, prefix = "", suffix = "", decimals = 2 }: {
  value: number; prefix?: string; suffix?: string; decimals?: number;
}) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className="font-mono tabular-nums">
      {prefix}{display.toFixed(decimals)}{suffix}
    </span>
  );
};

const Dashboard = () => {
  const chartData = generateChartData();

  const stats = [
    {
      label: "BTC Balance",
      value: 0.04521,
      prefix: "₿ ",
      decimals: 5,
      icon: Bitcoin,
      change: "+2.4%",
      positive: true,
      glowClass: "glow-accent",
    },
    {
      label: "USD Value",
      value: 2847.32,
      prefix: "$",
      decimals: 2,
      icon: DollarSign,
      change: "+5.1%",
      positive: true,
      glowClass: "",
    },
    {
      label: "Mining Power",
      value: 95.4,
      suffix: " TH/s",
      decimals: 1,
      icon: Zap,
      change: "Active",
      positive: true,
      glowClass: "glow-primary",
    },
    {
      label: "Daily Earnings",
      value: 0.00152,
      prefix: "₿ ",
      decimals: 5,
      icon: TrendingUp,
      change: "+0.8%",
      positive: true,
      glowClass: "",
    },
  ];

  const recentActivity = [
    { type: "Mining Reward", amount: "+0.00012 BTC", time: "2 min ago", icon: Zap },
    { type: "Deposit", amount: "+0.05 BTC", time: "1 hour ago", icon: ArrowDownRight },
    { type: "Plan Upgrade", amount: "-$500", time: "3 hours ago", icon: ArrowUpRight },
    { type: "Mining Reward", amount: "+0.00011 BTC", time: "5 hours ago", icon: Zap },
    { type: "Withdrawal", amount: "-0.02 BTC", time: "1 day ago", icon: Wallet },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Welcome back, Miner</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`glass-card p-5 hover:border-primary/30 transition-all ${stat.glowClass}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-muted-foreground text-sm">{stat.label}</span>
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground glow-text-primary">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <div className="flex items-center mt-2 text-xs">
                {stat.positive ? (
                  <ArrowUpRight className="h-3 w-3 text-primary mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-destructive mr-1" />
                )}
                <span className={stat.positive ? "text-primary" : "text-destructive"}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Earnings Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-foreground font-semibold">Earnings Overview</h3>
                <p className="text-muted-foreground text-xs mt-0.5">Last 30 days</p>
              </div>
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(160, 84%, 44%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(220, 18%, 10%)",
                    border: "1px solid hsl(220, 14%, 18%)",
                    borderRadius: "8px",
                    color: "hsl(210, 20%, 95%)",
                  }}
                />
                <Area type="monotone" dataKey="earnings" stroke="hsl(160, 84%, 44%)" fill="url(#earningsGradient)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground font-semibold">Recent Activity</h3>
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{item.type}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                  <span className={`text-xs font-mono ${item.amount.startsWith('+') ? 'text-primary' : 'text-accent'}`}>
                    {item.amount}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Hashrate Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-foreground font-semibold">Hashrate Performance</h3>
              <p className="text-muted-foreground text-xs mt-0.5">Mining power over time</p>
            </div>
            <Zap className="h-5 w-5 text-accent" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <XAxis dataKey="day" tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 18%, 10%)",
                  border: "1px solid hsl(220, 14%, 18%)",
                  borderRadius: "8px",
                  color: "hsl(210, 20%, 95%)",
                }}
              />
              <Line type="monotone" dataKey="hashrate" stroke="hsl(32, 95%, 55%)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
