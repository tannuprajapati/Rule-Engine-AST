import React, { useState, useEffect } from 'react';

const DisplayRules = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const simulateFetchRules = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate fetching rules
    const sampleRules = [
      { _id: '1', ruleString: 'Age > 25 AND Department = "IT"' },
      { _id: '2', ruleString: 'Salary > 50000 AND Experience > 5' },
      { _id: '3', ruleString: 'Department = "HR" AND Experience > 3' }
    ];
    
    if (Math.random() > 0.2) { // 80% success rate
      return sampleRules;
    } else {
      throw new Error('Failed to fetch rules');
    }
  };

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const fetchedRules = await simulateFetchRules();
        setRules(fetchedRules);
      } catch (error) {
        console.error('Error fetching rules:', error.message);
        setError('Failed to fetch rules');
      } finally {
        setLoading(false);
      }
    };
    fetchRules();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-purple-900 p-4 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 mt-8">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">Available Rules</h1>
        <p className="text-center text-gray-600 mb-6">Here are the rules currently defined in the system:</p>

        {/* Rules List */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-blue-600 text-center">Loading rules...</p>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : (
            <ul className="space-y-4">
              {rules.length > 0 ? (
                rules.map((rule) => (
                  <li key={rule._id} className="bg-gray-100 rounded-lg p-4 shadow hover:shadow-lg transition-shadow">
                    <p className="text-gray-800 font-medium">Rule ID: <span className="text-indigo-600">{rule._id}</span></p>
                    <pre className="text-gray-700 mt-2 whitespace-pre-wrap">{rule.ruleString}</pre>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-center">No rules available</li>
              )}
            </ul>
          )}
        </div>

        {/* Tips */}
        <div className="mt-6 bg-gray-50 rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Understanding Rules</h3>
          <ul className="text-gray-600 space-y-1 text-sm">
            <li>• Each rule has a unique ID</li>
            <li>• Rule strings define conditions for evaluation</li>
            <li>• Rules can combine multiple conditions with AND/OR operators</li>
            <li>• Review rules carefully before using them in evaluations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DisplayRules;
