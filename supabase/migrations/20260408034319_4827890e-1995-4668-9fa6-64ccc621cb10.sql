
-- Update referral bonus function to $50
CREATE OR REPLACE FUNCTION public.handle_referral_bonus()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  referrer_user_id uuid;
BEGIN
  IF NEW.referred_by IS NOT NULL AND NEW.referred_by != '' THEN
    SELECT user_id INTO referrer_user_id FROM public.profiles WHERE referral_code = NEW.referred_by;
    IF referrer_user_id IS NOT NULL THEN
      -- Credit referrer $50 USDT
      UPDATE public.user_balances SET usdt_balance = usdt_balance + 50, updated_at = now() WHERE user_id = referrer_user_id;
      -- Credit referred user $50 USDT
      UPDATE public.user_balances SET usdt_balance = usdt_balance + 50, updated_at = now() WHERE user_id = NEW.user_id;
      -- Record referral with $50 bonus
      INSERT INTO public.referrals (referrer_id, referred_id, bonus_amount) VALUES (referrer_user_id, NEW.user_id, 50);
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

-- Update default bonus amount
ALTER TABLE public.referrals ALTER COLUMN bonus_amount SET DEFAULT 50;
