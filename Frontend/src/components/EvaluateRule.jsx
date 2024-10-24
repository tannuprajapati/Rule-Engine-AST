import React, { useState } from 'react';

const ModernEvaluateRule = () => {
  const [formData, setFormData] = useState({
    age: '',
    salary: '',
    department: '',
    experience: ''
  });
  const [selectedRule, setSelectedRule] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate available rules
  const sampleRules = [
    { _id: '1', ruleString: 'Age > 25 AND Department = "IT"' },
    { _id: '2', ruleString: 'Salary > 50000 AND Experience > 5' },
    { _id: '3', ruleString: 'Department = "HR" AND Experience > 3' }
  ];

  const simulateEvaluation = async (ruleId, data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate rule evaluation logic
    const isEligible = data.age > 25 && data.salary > 50000;
    
    return {
      success: true,
      result: isEligible
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRule) {
      setError('Please select a rule first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = {
        age: parseInt(formData.age),
        salary: parseInt(formData.salary),
        department: formData.department,
        experience: parseInt(formData.experience)
      };

      const result = await simulateEvaluation(selectedRule, data);
      setResponse(result);
    } catch (err) {
      setError('Failed to evaluate rule');
      setResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-800 to-purple-800 p-4 flex items-center justify-center">
      <div className="max-w-sm w-full bg-white rounded-lg shadow-lg p-6 mt-8">
        {/* Header */}
        <h1 className="text-xl font-bold text-gray-800 text-center mb-2">Rule Evaluator</h1>
        <p className="text-gray-600 text-center mb-4">Test your rules with different parameters</p>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Rule Selection */}
          <div className="space-y-1">
            <label className="text-gray-800 font-medium">Select Rule</label>
            <select
              value={selectedRule}
              onChange={(e) => setSelectedRule(e.target.value)}
              className="w-full bg-gray-200 rounded p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Choose a rule...</option>
              {sampleRules.map((rule) => (
                <option key={rule._id} value={rule._id}>
                  {rule.ruleString}
                </option>
              ))}
            </select>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 gap-3">
            {['age', 'salary', 'department', 'experience'].map((field) => (
              <div key={field} className="space-y-1">
                <label className="text-gray-800 font-medium capitalize">{field}</label>
                <input
                  type={field === 'department' ? 'text' : 'number'}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="w-full bg-gray-200 rounded p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 text-white py-2 rounded font-medium disabled:bg-indigo-400 hover:bg-indigo-700 transition-colors"
          >
            {isLoading ? 'Evaluating...' : 'Evaluate Rule'}
          </button>
        </form>

        {/* Messages */}
        {error && (
          <div className="mt-3 bg-red-500 p-2 rounded text-white text-center">
            {error}
          </div>
        )}
        {response && (
          <div className="mt-3 bg-green-500 p-2 rounded text-white text-center">
            {response.result ? 'You are eligible!' : 'You are not eligible.'}
          </div>
        )}

        {/* Tips */}
        <div className="mt-4 bg-gray-100 rounded p-3">
          <h3 className="text-lg font-medium text-gray-800 mb-1">Evaluation Tips</h3>
          <ul className="text-gray-600 space-y-1 text-sm">
            <li>• Select a rule before entering parameters</li>
            <li>• Ensure all required fields are filled</li>
            <li>• Use appropriate number formats</li>
            <li>• Double-check department spelling</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModernEvaluateRule;
