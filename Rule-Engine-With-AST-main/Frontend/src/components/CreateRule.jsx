import React, { useState } from 'react';

const ModernRuleBuilder = () => {
  const [ruleString, setRuleString] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResponse({ success: true });
      setRuleString('');
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
            Rule Creator
          </h1>
          <p className="text-gray-400 mt-2">
            Create your custom rules
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-slate-800 rounded p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Header */}
            <div className="flex justify-between items-center">
              <label className="text-white font-medium">
                Rule Description
              </label>
              <div className="space-x-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="bg-slate-700 px-3 py-1 rounded text-white text-sm"
                >
                  Copy
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="bg-slate-700 px-3 py-1 rounded text-white text-sm"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Textarea */}
            <div className="relative">
              <textarea
                value={ruleString}
                onChange={(e) => setRuleString(e.target.value)}
                className="w-full h-40 bg-slate-700 rounded p-4 text-white resize-none"
                placeholder="Type your rule here..."
                disabled={isLoading}
              />
              <div className="absolute bottom-2 right-2 text-sm text-gray-400">
                {ruleString.length} chars
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-2 rounded font-medium disabled:bg-purple-400"
            >
              {isLoading ? 'Processing...' : 'Create Rule'}
            </button>
          </form>

          {/* Messages */}
          {error && (
            <div className="mt-4 bg-red-900 p-3 rounded text-red-400">
              {error}
            </div>
          )}
          {response && (
            <div className="mt-4 bg-green-900 p-3 rounded text-green-400">
              Rule created successfully!
            </div>
          )}

          {/* Tips */}
          <div className="mt-8 bg-slate-700 rounded p-4">
            <h3 className="text-lg font-medium text-white mb-4">
              Tips
            </h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• Keep your rules clear and specific</li>
              <li>• Include necessary conditions</li>
              <li>• Use simple language</li>
              <li>• Review before submitting</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernRuleBuilder;