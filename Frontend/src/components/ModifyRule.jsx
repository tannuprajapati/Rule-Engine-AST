import React, { useState } from 'react';

const ModernModifyRule = () => {
  const [ruleId, setRuleId] = useState('');
  const [newRuleString, setNewRuleString] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const simulateModifyRule = async (ruleId, newRuleString) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate rule modification logic
    const success = Math.random() > 0.2; // 80% success rate
    
    if (success) {
      return {
        success: true,
        ruleString: newRuleString
      };
    } else {
      throw new Error('Failed to modify rule');
    }
  };

  const handleModifyRule = async (e) => {
    e.preventDefault();
    if (!ruleId || !newRuleString) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await simulateModifyRule(ruleId, newRuleString);
      setResponse(result);
      setRuleId('');
      setNewRuleString('');
    } catch (err) {
      setError('Failed to modify rule');
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setRuleId('');
    setNewRuleString('');
    setError(null);
    setResponse(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-2xl mx-auto mt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400">
            Modify Rule
          </h1>
          <p className="text-gray-400 mt-2">
            Update existing rules with new parameters
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-slate-800 rounded p-6">
          {/* Form Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-medium">Rule Details</h2>
            <button
              type="button"
              onClick={handleClear}
              className="bg-slate-700 px-3 py-1 rounded text-white text-sm hover:bg-slate-600 transition-colors"
            >
              Clear Form
            </button>
          </div>

          {/* Main Form */}
          <form onSubmit={handleModifyRule} className="space-y-6">
            {/* Rule ID Input */}
            <div className="space-y-2">
              <label className="text-gray-300 font-medium block">
                Rule ID
              </label>
              <input
                type="text"
                value={ruleId}
                onChange={(e) => setRuleId(e.target.value)}
                className="w-full bg-slate-700 rounded p-3 text-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter rule ID"
              />
            </div>

            {/* New Rule String Input */}
            <div className="space-y-2">
              <label className="text-gray-300 font-medium block">
                New Rule String
              </label>
              <textarea
                value={newRuleString}
                onChange={(e) => setNewRuleString(e.target.value)}
                className="w-full bg-slate-700 rounded p-3 text-white resize-none h-32 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                placeholder="Enter new rule string"
              />
            </div>

            {/* Messages */}
            {error && (
              <div className="bg-red-900/20 border border-red-500/20 p-3 rounded text-red-400">
                {error}
              </div>
            )}
            {response && (
              <div className="bg-green-900/20 border border-green-500/20 p-3 rounded text-green-400">
                Rule modified successfully!
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-2 rounded font-medium disabled:bg-purple-400 hover:bg-purple-700 transition-colors"
            >
              {isLoading ? 'Modifying...' : 'Modify Rule'}
            </button>
          </form>

          {/* Tips */}
          <div className="mt-8 bg-slate-700 rounded p-4">
            <h3 className="text-lg font-medium text-white mb-4">
              Modification Tips
            </h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• Ensure the Rule ID exists in the system</li>
              <li>• Double-check the new rule string syntax</li>
              <li>• Use appropriate operators and conditions</li>
              <li>• Test the modified rule after submission</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernModifyRule;
