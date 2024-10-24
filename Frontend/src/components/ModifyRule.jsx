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
    <div className="min-h-screen bg-gradient-to-b from-teal-800 to-blue-900 p-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 mt-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Modify Rule</h1>
        <p className="text-center text-gray-600 mb-6">Change existing rules with updated parameters</p>

        {/* Main Form */}
        <form onSubmit={handleModifyRule} className="space-y-4">
          {/* Rule ID Input */}
          <div className="space-y-2">
            <label className="text-gray-800 font-medium">Rule ID</label>
            <input
              type="text"
              value={ruleId}
              onChange={(e) => setRuleId(e.target.value)}
              className="w-full bg-gray-100 rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-teal-500"
              placeholder="Enter rule ID"
            />
          </div>

          {/* New Rule String Input */}
          <div className="space-y-2">
            <label className="text-gray-800 font-medium">New Rule String</label>
            <textarea
              value={newRuleString}
              onChange={(e) => setNewRuleString(e.target.value)}
              className="w-full bg-gray-100 rounded-lg p-3 border border-gray-300 focus:ring-2 focus:ring-teal-500"
              placeholder="Enter new rule string"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-600 text-white py-2.5 rounded-lg font-medium disabled:bg-teal-400 hover:bg-teal-700 transition-colors mt-6"
          >
            {isLoading ? 'Modifying...' : 'Modify Rule'}
          </button>
        </form>

        {/* Messages */}
        {error && (
          <div className="mt-4 bg-red-900 p-3 rounded-lg text-red-400 text-center">
            {error}
          </div>
        )}
        {response && (
          <div className="mt-4 bg-green-900 p-3 rounded-lg text-green-400 text-center">
            Rule modified successfully!
          </div>
        )}

        {/* Tips */}
        <div className="mt-6 bg-gray-100 rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Modification Tips</h3>
          <ul className="text-gray-600 space-y-1 text-sm">
            <li>• Ensure the Rule ID is correct</li>
            <li>• Double-check the new rule string syntax</li>
            <li>• Use appropriate operators and conditions</li>
            <li>• Test the modified rule after submission</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModifyRule;
