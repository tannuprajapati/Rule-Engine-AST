import React, { useState } from 'react';

const ModernCombineRules = () => {
  const [ruleStrings, setRuleStrings] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const simulateCombineRules = async (rulesArray) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (rulesArray.length < 2) {
      throw new Error('At least two rules are required for combining');
    }

    return {
      success: true,
      combinedAST: true,
      message: 'Rules combined successfully',
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ruleStrings.trim()) {
      setError('Please enter your rules first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const rulesArray = ruleStrings.split('\n').filter((rule) => rule.trim() !== '');
      const result = await simulateCombineRules(rulesArray);
      setResponse(result);
      setStep(2);
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to combine rules');
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setRuleStrings('');
    setError(null);
    setResponse(null);
    setStep(1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ruleStrings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-800 to-blue-900 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-8">
        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-6">
          <div className={`w-8 h-8 rounded-full ${step >= 1 ? 'bg-teal-500' : 'bg-gray-300'} text-white flex items-center justify-center`}>1</div>
          <div className={`flex-grow h-1 ${step >= 2 ? 'bg-teal-500' : 'bg-gray-300'} mx-2`} />
          <div className={`w-8 h-8 rounded-full ${step >= 2 ? 'bg-teal-500' : 'bg-gray-300'} text-white flex items-center justify-center`}>2</div>
        </div>

        {/* Step 1: Input Rules */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-teal-600 mb-4">Step 1: Enter Your Rules</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={ruleStrings}
                onChange={(e) => setRuleStrings(e.target.value)}
                className="w-full h-32 border-2 border-teal-300 rounded-lg p-4 text-gray-800 focus:ring-2 focus:ring-teal-500"
                placeholder="Enter your rules here, one per line..."
                disabled={isLoading}
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Clear
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  {isLoading ? 'Processing...' : 'Combine Rules'}
                </button>
              </div>
            </form>
            {error && (
              <div className="mt-4 bg-red-500 p-3 rounded-lg text-white text-center">
                {error}
              </div>
            )}
          </>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && response && response.success && (
          <>
            <h2 className="text-2xl font-bold text-teal-600 mb-4">Step 2: Success!</h2>
            <p className="text-gray-700">{response.message}</p>
            <div className="mt-6 flex justify-between">
              <button
                type="button"
                onClick={handleClear}
                className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Create Another Rule
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Copy Rules
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModernCombineRules;
