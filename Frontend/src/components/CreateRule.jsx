import React, { useState } from 'react';

const LeftAlignedRuleBuilder = () => {
  const [ruleString, setRuleString] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ruleString.trim()) {
      setError('Please enter your rule first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setResponse({ success: true });
      setRuleString('');
      setStep(3); // Move to the confirmation step
    } catch (err) {
      setError('Failed to save rule');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setRuleString('');
    setError(null);
    setResponse(null);
    setStep(1); // Reset to the first step
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ruleString);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center"> {/* Moderate gradient background */}
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-6">
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-6">
            <div className={`w-8 h-8 rounded-full ${step >= 1 ? 'bg-green-500' : 'bg-gray-300'} text-white flex items-center justify-center`}>1</div>
            <div className={`flex-grow h-1 ${step >= 2 ? 'bg-green-500' : 'bg-gray-300'} mx-2`} />
            <div className={`w-8 h-8 rounded-full ${step >= 2 ? 'bg-green-500' : 'bg-gray-300'} text-white flex items-center justify-center`}>2</div>
            <div className={`flex-grow h-1 ${step >= 3 ? 'bg-green-500' : 'bg-gray-300'} mx-2`} />
            <div className={`w-8 h-8 rounded-full ${step >= 3 ? 'bg-green-500' : 'bg-gray-300'} text-white flex items-center justify-center`}>3</div>
          </div>

          {/* Step 1: Rule Input */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                Step 1: Describe Your Rule
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={ruleString}
                  onChange={(e) => setRuleString(e.target.value)}
                  className="w-full h-32 border-2 border-purple-300 rounded p-3 text-gray-800 focus:ring-2 focus:ring-purple-500"
                  placeholder="Type your rule here..."
                  disabled={isLoading}
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    {isLoading ? 'Processing...' : 'Next'}
                  </button>
                </div>
              </form>
            </>
          )}

          {/* Step 2: Copy and Confirm */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                Step 2: Review and Copy
              </h2>
              <div className="bg-gray-100 p-4 rounded mb-4">
                <p className="text-gray-700">{ruleString}</p>
              </div>
              <button
                type="button"
                onClick={handleCopy}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
              >
                Copy to Clipboard
              </button>
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Confirm
                </button>
              </div>
            </>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                Step 3: Success!
              </h2>
              <p className="text-green-600">
                Your rule has been successfully created and copied to the clipboard.
              </p>
              <button
                type="button"
                onClick={handleClear}
                className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
              >
                Create Another Rule
              </button>
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-500 p-3 rounded text-white">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftAlignedRuleBuilder;
