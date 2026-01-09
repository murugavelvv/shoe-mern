// Razorpay configuration
export const RAZORPAY_KEY_ID = 'rzp_test_RNh0qZpmrPFLcI';
export const RAZORPAY_KEY_SECRET = 'gyWUUP337T6kY15UMB2EDjKR';

// Load Razorpay script dynamically
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Payment options interface
export interface PaymentOptions {
  amount: number;
  currency: string;
  order_id?: string;
  name: string;
  description: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: any) => void;
  modal: {
    ondismiss: () => void;
  };
}

// Create Razorpay payment
export const createRazorpayPayment = async (options: PaymentOptions) => {
  const isLoaded = await loadRazorpayScript();
  
  if (!isLoaded) {
    throw new Error('Failed to load Razorpay script');
  }

  const razorpay = (window as any).Razorpay;
  
  if (!razorpay) {
    throw new Error('Razorpay not available');
  }

  const paymentOptions = {
    key: RAZORPAY_KEY_ID,
    amount: options.amount,
    currency: options.currency,
    name: options.name,
    description: options.description,
    order_id: options.order_id,
    prefill: options.prefill,
    theme: options.theme,
    handler: options.handler,
    modal: options.modal,
  };

  const payment = new razorpay(paymentOptions);
  payment.open();
};

// Format amount for Razorpay (amount in paise)
export const formatAmount = (amount: number): number => {
  return Math.round(amount * 100);
};
