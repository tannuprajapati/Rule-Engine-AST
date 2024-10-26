import React, { useState } from 'react';

const ModernRuleBuilder = () => {
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
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-2xl mx-auto mt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400">
            Rule Builder
          </h1>
          <p className="text-gray-400 mt-2">
            Create and manage your rules step by step
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-slate-800 rounded p-6">
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-6">
            <div className={`w-8 h-8 rounded-full ${step >= 1 ? 'bg-purple-600' : 'bg-slate-700'} text-white flex items-center justify-center`}>1</div>
            <div className={`flex-grow h-1 ${step >= 2 ? 'bg-purple-600' : 'bg-slate-700'} mx-2`} />
            <div className={`w-8 h-8 rounded-full ${step >= 2 ? 'bg-purple-600' : 'bg-slate-700'} text-white flex items-center justify-center`}>2</div>
            <div className={`flex-grow h-1 ${step >= 3 ? 'bg-purple-600' : 'bg-slate-700'} mx-2`} />
            <div className={`w-8 h-8 rounded-full ${step >= 3 ? 'bg-purple-600' : 'bg-slate-700'} text-white flex items-center justify-center`}>3</div>
          </div>

          {/* Step 1: Rule Input */}
          {step === 1 && (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-white font-medium">Step 1: Describe Your Rule</h2>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="bg-slate-700 px-3 py-1 rounded text-white text-sm hover:bg-slate-600 transition-colors"
                  >
                    Copy
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="bg-slate-700 px-3 py-1 rounded text-white text-sm hover:bg-slate-600 transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                  value={ruleString}
                  onChange={(e) => setRuleString(e.target.value)}
                  className="w-full h-40 bg-slate-700 rounded p-4 text-white resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  placeholder="Type your rule here..."
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 text-white py-2 rounded font-medium disabled:bg-purple-400 hover:bg-purple-700 transition-colors"
                >
                  {isLoading ? 'Processing...' : 'Next'}
                </button>
              </form>
            </>
          )}

          {/* Step 2: Review */}
          {step === 2 && (
            <>
              <h2 className="text-white font-medium mb-4">Step 2: Review and Copy</h2>
              <div className="bg-slate-700 p-4 rounded mb-4">
                <p className="text-gray-300">{ruleString}</p>
              </div>
              <div className="flex justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-slate-700 text-white py-2 rounded font-medium hover:bg-slate-600 transition-colors"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 bg-purple-600 text-white py-2 rounded font-medium hover:bg-purple-700 transition-colors"
                >
                  Confirm
                </button>
              </div>
            </>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <>
              <h2 className="text-white font-medium mb-4">Step 3: Success!</h2>
              <div className="bg-green-900/20 border border-green-500/20 p-4 rounded mb-6">
                <p className="text-green-400">
                  Your rule has been successfully created and saved.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClear}
                className="w-full bg-purple-600 text-white py-2 rounded font-medium hover:bg-purple-700 transition-colors"
              >
                Create Another Rule
              </button>
            </>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 bg-red-900/20 border border-red-500/20 p-3 rounded text-red-400">
              {error}
            </div>
          )}

          {/* Tips */}
          <div className="mt-8 bg-slate-700 rounded p-4">
            <h3 className="text-lg font-medium text-white mb-4">
              Tips for Creating Rules
            </h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• Use clear and concise language</li>
              <li>• Follow the correct rule syntax</li>
              <li>• Review carefully before confirming</li>
              <li>• Make sure rules are complete</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernRuleBuilder;
