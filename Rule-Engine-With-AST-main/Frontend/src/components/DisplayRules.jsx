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
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-2xl mx-auto mt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400">
            Display Rules
          </h1>
          <p className="text-gray-400 mt-2">
            View all available rules in the system
          </p>
        </div>

        {/* Rules List */}
        <div className="bg-slate-800 rounded p-6">
          {loading ? (
            <p className="text-white text-center">Loading rules...</p>
          ) : error ? (
            <p className="text-red-400 text-center">{error}</p>
          ) : (
            <ul className="space-y-4">
              {rules.length > 0 ? (
                rules.map((rule) => (
                  <li key={rule._id} className="bg-slate-700 rounded p-4">
                    <p className="text-white font-medium mb-2">Rule ID: {rule._id}</p>
                    <pre className="text-gray-300 whitespace-pre-wrap">{rule.ruleString}</pre>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 text-center">No rules available</li>
              )}
            </ul>
          )}

          {/* Tips */}
          <div className="mt-8 bg-slate-700 rounded p-4">
            <h3 className="text-lg font-medium text-white mb-4">
              Understanding Rules
            </h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• Each rule has a unique ID</li>
              <li>• Rule strings define conditions for evaluation</li>
              <li>• Rules can combine multiple conditions with AND/OR operators</li>
              <li>• Review rules carefully before using them in evaluations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayRules;