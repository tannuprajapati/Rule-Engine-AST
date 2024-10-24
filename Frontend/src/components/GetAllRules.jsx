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
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-indigo-700 p-4 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl p-6 mt-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">All Rules</h1>
        <p className="text-center text-gray-600 mb-6">View all rules in the system</p>

        {/* Rules Table */}
        <div className="bg-gray-50 rounded-lg overflow-hidden">
          {loading ? (
            <p className="text-gray-700 text-center p-4">Loading rules...</p>
          ) : error ? (
            <p className="text-red-600 text-center p-4">{error}</p>
          ) : rules.length === 0 ? (
            <p className="text-gray-600 text-center p-4">No rules found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Rule ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Rule String</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-300">
                  {rules.map((rule) => (
                    <tr key={rule._id} className="hover:bg-gray-100 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{rule._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{rule.ruleString}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-gray-100 rounded-lg p-4 shadow-md">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Understanding the Rules Table</h3>
          <ul className="text-gray-600 space-y-1 text-sm">
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
