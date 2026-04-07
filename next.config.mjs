const tableKeys = [
  "DEPOSITS",
  "EARNINGS_HISTORY",
  "PROFILES",
  "REFERRALS",
  "USER_BALANCES",
  "USER_PURCHASES",
  "USER_ROLES",
  "WITHDRAWALS",
];

const supabaseTableEnv = Object.fromEntries(
  tableKeys.map((key) => [
    `SUPABASE_TABLE_${key}`,
    process.env[`SUPABASE_TABLE_${key}`] ?? "",
  ]),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL ?? "",
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY ?? "",
    ...supabaseTableEnv,
  },
};

export default nextConfig;
