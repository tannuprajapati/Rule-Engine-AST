import React, { useState } from 'react';

const ModernCombineRules = () => {
  const [ruleStrings, setRuleStrings] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const simulateCombineRules = async (rulesArray) => {
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate validation and combining
    if (rulesArray.length < 2) {
      throw new Error('At least two rules are required for combining');
    }
    
    return {
      success: true,
      combinedAST: true,
      message: 'Rules combined successfully'
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
      setError(null);
    } catch (err) {
      console.error('Error combining rules:', err);
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
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(ruleStrings);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-2xl mx-auto mt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400">
            Rule Combiner
          </h1>
          <p className="text-gray-400 mt-2">
            Combine multiple rules into one
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-slate-800 rounded p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Header */}
            <div className="flex justify-between items-center">
              <label className="text-white font-medium">
                Rules to Combine
              </label>
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

            {/* Textarea */}
            <div className="relative">
              <textarea
                value={ruleStrings}
                onChange={(e) => setRuleStrings(e.target.value)}
                className="w-full h-40 bg-slate-700 rounded p-4 text-white resize-none focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter your rules here, one per line..."
                disabled={isLoading}
              />
              <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                {ruleStrings.split('\n').filter(rule => rule.trim()).length} rules
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-2 rounded font-medium disabled:bg-purple-400 hover:bg-purple-700 transition-colors"
            >
              {isLoading ? 'Processing...' : 'Combine Rules'}
            </button>
          </form>

          {/* Messages */}
          {error && (
            <div className="mt-4 bg-red-900 p-3 rounded text-red-400">
              {error}
            </div>
          )}
          {response && response.success && (
            <div className="mt-4 bg-green-900 p-3 rounded text-green-400">
              Rules combined successfully!
            </div>
          )}

          {/* Tips */}
          <div className="mt-8 bg-slate-700 rounded p-4">
            <h3 className="text-lg font-medium text-white mb-4">
              Tips for Combining Rules
            </h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• Enter each rule on a new line</li>
              <li>• Ensure rules are in the correct format</li>
              <li>• Remove any duplicate rules</li>
              <li>• Verify rules are compatible before combining</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernCombineRules;
