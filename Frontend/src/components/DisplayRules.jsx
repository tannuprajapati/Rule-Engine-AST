import React, { useState, useEffect } from 'react';

const ModernDisplayRules = () => {
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
            Available Rules
          </h1>
          <p className="text-gray-400 mt-2">
            Here are the rules currently defined in the system
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-slate-800 rounded p-6">
          {/* Rules List */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-purple-400">Loading rules...</p>
              </div>
            ) : error ? (
              <div className="bg-red-900/20 border border-red-500/20 p-4 rounded text-red-400">
                {error}
              </div>
            ) : (
              <div className="space-y-4">
                {rules.length > 0 ? (
                  rules.map((rule) => (
                    <div 
                      key={rule._id} 
                      className="bg-slate-700 rounded p-4 hover:bg-slate-600 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300">Rule ID: </span>
                        <span className="text-purple-400 font-medium">{rule._id}</span>
                      </div>
                      <div className="bg-slate-800 rounded p-3 font-mono text-sm">
                        <pre className="text-gray-300 whitespace-pre-wrap">{rule.ruleString}</pre>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    No rules available
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-slate-700 rounded p-4">
            <h3 className="text-lg font-medium text-white mb-4">
              Understanding Rules
            </h3>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li>• Each rule has a unique ID for tracking</li>
              <li>• Rule strings define conditions for evaluation</li>
              <li>• Rules can combine multiple conditions with AND/OR operators</li>
              <li>• Review rules carefully before using them in evaluations</li>
            </ul>
          </div>

          {/* Additional Actions */}
          <div className="mt-6 pt-6 border-t border-slate-600">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-purple-600 text-white py-2 rounded font-medium hover:bg-purple-700 transition-colors"
            >
              Refresh Rules
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDisplayRules;
