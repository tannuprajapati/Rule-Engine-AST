import React, { useState, useEffect } from 'react';

const GetAllRules = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const simulateGetAllRules = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate fetching rules
    const sampleRules = [
      { _id: '1', ruleString: 'Age > 25 AND Department = "IT"' },
      { _id: '2', ruleString: 'Salary > 50000 AND Experience > 5' },
      { _id: '3', ruleString: 'Department = "HR" AND Experience > 3' },
      { _id: '4', ruleString: 'Age < 30 AND Salary < 40000' }
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
        const fetchedRules = await simulateGetAllRules();
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
      <div className="max-w-4xl mx-auto mt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400">
            All Rules
          </h1>
          <p className="text-gray-400 mt-2">
            View all rules in the system
          </p>
        </div>

        {/* Rules Table */}
        <div className="bg-slate-800 rounded-lg overflow-hidden">
          {loading ? (
            <p className="text-white text-center p-4">Loading rules...</p>
          ) : error ? (
            <p className="text-red-400 text-center p-4">{error}</p>
          ) : rules.length === 0 ? (
            <p className="text-gray-400 text-center p-4">No rules found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-700">
                <thead className="bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">Rule ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-purple-400 uppercase tracking-wider">Rule String</th>
                  </tr>
                </thead>
                <tbody className="bg-slate-800 divide-y divide-slate-700">
                  {rules.map((rule) => (
                    <tr key={rule._id} className="hover:bg-slate-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{rule._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{rule.ruleString}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-slate-700 rounded p-4">
          <h3 className="text-lg font-medium text-white mb-4">
            Understanding the Rules Table
          </h3>
          <ul className="text-gray-400 space-y-2 text-sm">
            <li>• Each row represents a single rule in the system</li>
            <li>• The Rule ID is a unique identifier for each rule</li>
            <li>• The Rule String defines the conditions for the rule</li>
            <li>• Hover over a row to highlight it for easier reading</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GetAllRules;