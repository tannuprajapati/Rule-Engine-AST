import React, { useState } from 'react';

const ModifyRule = () => {
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
    } catch (err) {
      setError('Failed to modify rule');
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-2xl mx-auto mt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400">
            Rule Modifier
          </h1>
          <p className="text-gray-400 mt-2">
            Modify existing rules with new parameters
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-slate-800 rounded p-6">
          <form onSubmit={handleModifyRule} className="space-y-4">
            {/* Rule ID Input */}
            <div className="space-y-2">
              <label className="text-white font-medium">Rule ID</label>
              <input
                type="text"
                value={ruleId}
                onChange={(e) => setRuleId(e.target.value)}
                className="w-full bg-slate-700 rounded p-2.5 text-white border-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter rule ID"
              />
            </div>

            {/* New Rule String Input */}
            <div className="space-y-2">
              <label className="text-white font-medium">New Rule String</label>
              <textarea
                value={newRuleString}
                onChange={(e) => setNewRuleString(e.target.value)}
                className="w-full bg-slate-700 rounded p-2.5 text-white border-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter new rule string"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-2.5 rounded font-medium disabled:bg-purple-400 hover:bg-purple-700 transition-colors mt-6"
            >
              {isLoading ? 'Modifying...' : 'Modify Rule'}
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
              Rule modified successfully!
            </div>
          )}

          {/* Tips */}
          <div className="mt-8 bg-slate-700 rounded p-4">
            <h3 className="text-lg font-medium text-white mb-4">
              Modification Tips
            </h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• Ensure the Rule ID is correct</li>
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

export default ModifyRule;