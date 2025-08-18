import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Gift, Sparkles, Star, CreditCard, Loader, X } from 'lucide-react';

const GiftCard = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  
  const paypalRef = useRef(null);
  const modalRef = useRef(null);

  const amounts = [25, 50, 100, 200, 500];

  // PayPal SDK loading with Canadian settings
  useEffect(() => {
    if (window.paypal) {
      setPaypalLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=AThUUsAIJHKFSjurstprLlTSA1NgCva6rMWLiFd4HloJaTR21GapewVyF7rs1_zwlHx0muhSZ2R8yyg_&currency=CAD&locale=en_CA`;
    script.onload = () => setPaypalLoaded(true);
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Re-render PayPal buttons when modal opens and amount/quantity changes
  useEffect(() => {
    if (paypalLoaded && paypalRef.current && showPaymentModal) {
      renderPayPalButtons();
    }
  }, [selectedAmount, quantity, paypalLoaded, showPaymentModal]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setShowPaymentModal(false);
      }
    };

    if (showPaymentModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showPaymentModal]);

  const handleQuantityChange = (action) => {
    if (action === 'increment') {
      setQuantity(prev => prev + 1);
    } else if (action === 'decrement' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAmountChange = (amount) => {
    setSelectedAmount(amount);
  };

  const renderPayPalButtons = () => {
    if (!window.paypal || !paypalRef.current) return;

    // Clear existing buttons
    paypalRef.current.innerHTML = '';

    const totalPrice = selectedAmount * quantity;
    
    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'blue',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: totalPrice.toString(),
              currency_code: 'CAD'
            },
            description: `Gift Card - $${selectedAmount} CAD x ${quantity}`
          }],
          application_context: {
            shipping_preference: 'NO_SHIPPING'
          }
        });
      },
      onApprove: async (data, actions) => {
        try {
          setIsProcessing(true);
          const details = await actions.order.capture();
          console.log('Payment completed:', details);
          setPaymentStatus('success');
          setQuantity(1);
          
          // Keep modal open to show success message
          setTimeout(() => {
            setShowPaymentModal(false);
            setPaymentStatus(null);
          }, 3000);
        } catch (error) {
          console.error('Payment capture error:', error);
          setPaymentStatus('error');
        } finally {
          setIsProcessing(false);
        }
      },
      onError: (err) => {
        console.error('PayPal Error:', err);
        setPaymentStatus('error');
        setIsProcessing(false);
      },
      onCancel: (data) => {
        console.log('Payment cancelled:', data);
        setIsProcessing(false);
      }
    }).render(paypalRef.current);
  };

  const openPaymentModal = () => {
    setShowPaymentModal(true);
    setPaymentStatus(null);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setPaymentStatus(null);
    setIsProcessing(false);
  };

  // Close modal when clicking outside
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closePaymentModal();
    }
  };

  const totalPrice = selectedAmount * quantity;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-100 p-4">
      <div className="max-w-2xl mx-auto pt-32">
        <div 
          className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 ${
            isHovered ? 'scale-102 shadow-xl' : ''
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Decorative Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400 opacity-5"></div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sky-200 to-transparent rounded-full -translate-y-16 translate-x-16 opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-sky-100 to-transparent rounded-full translate-y-12 -translate-x-12 opacity-30"></div>

          <div className="relative z-10 p-8">
            {/* Gift Card Visual - Centered at top */}
            <div className="flex flex-col items-center justify-center space-y-4 mb-6">
              {/* Floating Sparkles */}
              <div className="relative">
                <Sparkles className="absolute -top-3 -left-3 text-sky-400 w-4 h-4 animate-pulse" />
                <Sparkles className="absolute -bottom-1 -right-1 text-sky-300 w-3 h-3 animate-pulse delay-300" />
                
                {/* Gift Card Design - Made smaller */}
                <div className="relative w-48 h-32 bg-white rounded-xl shadow-lg transform rotate-2 hover:rotate-0 transition-transform duration-300 border border-sky-200">
                  <div className="absolute inset-1 bg-white rounded-lg border border-gray-100">
                    <div className="p-3 h-full flex flex-col justify-between">
                      {/* Logo placeholder */}
                      <div className="flex justify-center">
                        <div className="text-sky-400 font-bold text-sm">ACTION CAR</div>
                      </div>
                      
                      {/* Gift Card Text */}
                      <div className="text-center">
                        <h3 className="text-sky-400 text-sm font-bold mb-1">GIFT CARD</h3>
                        <div className="text-sky-500 text-base font-semibold">
                          ${selectedAmount}.00 CAD
                        </div>
                      </div>
                      
                      {/* Decorative Pattern */}
                      <div className="flex justify-center space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} className="w-1.5 h-1.5 text-sky-500 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gift Icon */}
              <div className="bg-gradient-to-r from-sky-100 to-sky-50 p-2 rounded-full">
                <Gift className="w-5 h-5 text-sky-600" />
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent mb-2">
                  Perfect Gift Card
                </h1>
                <p className="text-sky-500 text-sm leading-relaxed">
                  Give the gift of choice with our premium gift cards. Perfect for any occasion and redeemable across all our services.
                </p>
              </div>

              {/* Amount Selection */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-sky-500 text-center">Select Amount</h3>
                <div className="grid grid-cols-5 gap-2">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => handleAmountChange(amount)}
                      className={`relative p-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                        selectedAmount === amount
                          ? 'bg-gradient-to-r from-sky-400 to-sky-500 text-white shadow-lg scale-105'
                          : 'bg-gray-100 text-sky-500 hover:bg-sky-50 hover:scale-105'
                      }`}
                    >
                      ${amount}
                      {selectedAmount === amount && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <Star className="w-1.5 h-1.5 text-sky-600 fill-current" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-sky-500 text-center">Quantity</h3>
                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange('decrement')}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-sky-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center font-bold text-lg transition-colors duration-200"
                  >
                    -
                  </button>
                  <div className="bg-sky-50 px-6 py-3 rounded-lg">
                    <span className="text-xl font-semibold text-sky-600">
                      {quantity}
                    </span>
                  </div>
                  <button
                    onClick={() => handleQuantityChange('increment')}
                    className="w-10 h-10 rounded-full bg-gray-200 hover:bg-sky-100 flex items-center justify-center font-bold text-lg transition-colors duration-200"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gradient-to-r from-sky-50 to-white p-4 rounded-xl border border-sky-100">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-sky-500">Total Price:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
                    ${totalPrice}.00 CAD
                  </span>
                </div>
              </div>

              {/* Purchase Button */}
              <button
                onClick={openPaymentModal}
                className="w-full bg-gradient-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-lg">Purchase Gift Card - ${totalPrice}.00 CAD</span>
              </button>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 pt-3">
                <div className="flex items-center space-x-2 text-sky-500 text-sm">
                  <div className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0"></div>
                  <span>No Expiration Date</span>
                </div>
                <div className="flex items-center space-x-2 text-sky-500 text-sm">
                  <div className="w-2 h-2 bg-sky-400 rounded-full flex-shrink-0"></div>
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-sky-500 text-sm">
                  <div className="w-2 h-2 bg-sky-600 rounded-full flex-shrink-0"></div>
                  <span>Easy to Redeem</span>
                </div>
                <div className="flex items-center space-x-2 text-sky-500 text-sm">
                  <div className="w-2 h-2 bg-sky-300 rounded-full flex-shrink-0"></div>
                  <span>Perfect for Gifting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleModalBackdropClick}
        >
          <div 
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Complete Payment</h2>
              <button
                onClick={closePaymentModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="bg-sky-50 p-4 rounded-xl">
                <h3 className="font-semibold text-sky-700 mb-3">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Gift Card Amount:</span>
                    <span className="font-semibold">${selectedAmount}.00 CAD</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity:</span>
                    <span className="font-semibold">{quantity}</span>
                  </div>
                  <div className="border-t border-sky-200 pt-2 mt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total:</span>
                      <span className="text-xl font-bold text-sky-600">${totalPrice}.00 CAD</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              {paymentStatus && (
                <div className={`p-4 rounded-xl ${
                  paymentStatus === 'success' 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {paymentStatus === 'success' ? (
                    <div className="flex items-center space-x-2">
                      <span className="text-green-600">✅</span>
                      <span>Payment successful! Your gift card will be delivered via email.</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="text-red-600">❌</span>
                      <span>Payment failed. Please try again.</span>
                    </div>
                  )}
                </div>
              )}

              {/* PayPal Payment Section */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Payment Method</h3>
                
                {!paypalLoaded ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader className="w-8 h-8 animate-spin text-sky-500" />
                    <span className="ml-3 text-gray-600">Loading PayPal...</span>
                  </div>
                ) : (
                  <div>
                    {/* PayPal Buttons Container */}
                    <div ref={paypalRef} className="min-h-[100px]"></div>
                    
                    {isProcessing && (
                      <div className="flex items-center justify-center py-4">
                        <Loader className="w-6 h-6 animate-spin text-sky-500" />
                        <span className="ml-3 text-gray-600">Processing payment...</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Security Notice */}
              <div className="text-xs text-gray-500 text-center">
                <p>🔒 Your payment is secured by PayPal's advanced encryption</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftCard;