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
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-2xl mx-auto mt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400">
            Rule Evaluator
          </h1>
          <p className="text-gray-400 mt-2">
            Test your rules with different parameters
          </p>
        </div>

        {/* Main Form */}
        <div className="bg-slate-800 rounded p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rule Selection */}
            <div className="space-y-2">
              <label className="text-white font-medium">
                Select Rule
              </label>
              <select
                value={selectedRule}
                onChange={(e) => setSelectedRule(e.target.value)}
                className="w-full bg-slate-700 rounded p-2.5 text-white border-none focus:ring-2 focus:ring-purple-500"
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-white font-medium">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 rounded p-2.5 text-white border-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter age"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Salary</label>
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 rounded p-2.5 text-white border-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter salary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Department</label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 rounded p-2.5 text-white border-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter department"
                />
              </div>

              <div className="space-y-2">
                <label className="text-white font-medium">Experience</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full bg-slate-700 rounded p-2.5 text-white border-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Years of experience"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-purple-600 text-white py-2.5 rounded font-medium disabled:bg-purple-400 hover:bg-purple-700 transition-colors mt-6"
            >
              {isLoading ? 'Evaluating...' : 'Evaluate Rule'}
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
              {response.result ? 'You are eligible!' : 'You are not eligible.'}
            </div>
          )}

          {/* Tips */}
          <div className="mt-8 bg-slate-700 rounded p-4">
            <h3 className="text-lg font-medium text-white mb-4">
              Evaluation Tips
            </h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• Select a rule before entering parameters</li>
              <li>• Ensure all required fields are filled</li>
              <li>• Use appropriate number formats</li>
              <li>• Double-check department spelling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernEvaluateRule;