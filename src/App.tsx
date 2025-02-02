import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

interface PredictionResult {
  probability: number;
  isHighRisk: boolean;
}

function App() {
  const [formData, setFormData] = useState({
    viewingHours: '',
    avgDuration: '',
    downloads: '',
    accountAge: '',
    monthlyCharges: '',
    totalCharges: '',
  });
  
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const probability = Math.random();
      setPrediction({
        probability: probability,
        isHighRisk: probability > 0.5
      });
      setLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Customer Churn Predictor
            </h1>
            <p className="text-lg text-gray-600">
              Enter customer data to predict the likelihood of churn
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Viewing Hours */}
                <div>
                  <label htmlFor="viewingHours" className="block text-sm font-medium text-gray-700">
                    Viewing Hours per Week
                  </label>
                  <input
                    type="number"
                    name="viewingHours"
                    id="viewingHours"
                    value={formData.viewingHours}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Average Duration */}
                <div>
                  <label htmlFor="avgDuration" className="block text-sm font-medium text-gray-700">
                    Average Viewing Duration (minutes)
                  </label>
                  <input
                    type="number"
                    name="avgDuration"
                    id="avgDuration"
                    value={formData.avgDuration}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Downloads */}
                <div>
                  <label htmlFor="downloads" className="block text-sm font-medium text-gray-700">
                    Content Downloads per Month
                  </label>
                  <input
                    type="number"
                    name="downloads"
                    id="downloads"
                    value={formData.downloads}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Account Age */}
                <div>
                  <label htmlFor="accountAge" className="block text-sm font-medium text-gray-700">
                    Account Age (months)
                  </label>
                  <input
                    type="number"
                    name="accountAge"
                    id="accountAge"
                    value={formData.accountAge}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Monthly Charges */}
                <div>
                  <label htmlFor="monthlyCharges" className="block text-sm font-medium text-gray-700">
                    Monthly Charges ($)
                  </label>
                  <input
                    type="number"
                    name="monthlyCharges"
                    id="monthlyCharges"
                    value={formData.monthlyCharges}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Total Charges */}
                <div>
                  <label htmlFor="totalCharges" className="block text-sm font-medium text-gray-700">
                    Total Charges ($)
                  </label>
                  <input
                    type="number"
                    name="totalCharges"
                    id="totalCharges"
                    value={formData.totalCharges}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Analyzing...' : 'Predict Churn Risk'}
                </button>
              </div>
            </form>

            {/* Prediction Result */}
            {prediction && (
              <div className="mt-8">
                <div className={`rounded-lg p-6 ${
                  prediction.isHighRisk 
                    ? 'bg-red-50 border border-red-200' 
                    : 'bg-green-50 border border-green-200'
                }`}>
                  <div className="flex items-center">
                    {prediction.isHighRisk ? (
                      <XCircle className="h-8 w-8 text-red-500" />
                    ) : (
                      <CheckCircle2 className="h-8 w-8 text-green-500" />
                    )}
                    <div className="ml-4">
                      <h3 className={`text-lg font-semibold ${
                        prediction.isHighRisk ? 'text-red-800' : 'text-green-800'
                      }`}>
                        {prediction.isHighRisk ? 'High Risk of Churn' : 'Low Risk of Churn'}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600">
                        Churn Probability: {(prediction.probability * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  
                  {prediction.isHighRisk && (
                    <div className="mt-4 flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                      <p className="ml-2 text-sm text-red-700">
                        Recommended Actions:
                        <ul className="list-disc ml-5 mt-2">
                          <li>Reach out to the customer for feedback</li>
                          <li>Consider offering a personalized retention package</li>
                          <li>Review pricing and service usage patterns</li>
                        </ul>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
// import React, { useState } from 'react';
// import axios from 'axios';
// import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

// interface PredictionResult {
//   probability: number;
//   isHighRisk: boolean;
// }

// function App() {
//   const [formData, setFormData] = useState({
//     viewingHours: '',
//     avgDuration: '',
//     downloads: '',
//     accountAge: '',
//     monthlyCharges: '',
//     totalCharges: '',
//   });
  
//   const [prediction, setPrediction] = useState<PredictionResult | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/predict', formData);
//       setPrediction({
//         probability: response.data.prediction,
//         isHighRisk: response.data.prediction > 0.5
//       });
//     } catch (error) {
//       console.error('Error fetching prediction:', error);
//     }
    
//     setLoading(false);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-10">
//             <h1 className="text-4xl font-bold text-gray-900 mb-4">Customer Churn Predictor</h1>
//             <p className="text-lg text-gray-600">Enter customer data to predict the likelihood of churn</p>
//           </div>

//           <div className="bg-white rounded-xl shadow-xl p-6 md:p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {Object.keys(formData).map((key) => (
//                   <div key={key}>
//                     <label htmlFor={key} className="block text-sm font-medium text-gray-700">
//                       {key.replace(/([A-Z])/g, ' $1').trim()} (numeric)
//                     </label>
//                     <input
//                       type="number"
//                       name={key}
//                       id={key}
//                       value={formData[key as keyof typeof formData]}
//                       onChange={handleInputChange}
//                       className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                       required
//                     />
//                   </div>
//                 ))}
//               </div>
//               <div className="flex justify-center">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//                 >
//                   {loading ? 'Analyzing...' : 'Predict Churn Risk'}
//                 </button>
//               </div>
//             </form>

//             {prediction && (
//               <div className="mt-8">
//                 <div className={`rounded-lg p-6 ${prediction.isHighRisk ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
//                   <div className="flex items-center">
//                     {prediction.isHighRisk ? (
//                       <XCircle className="h-8 w-8 text-red-500" />
//                     ) : (
//                       <CheckCircle2 className="h-8 w-8 text-green-500" />
//                     )}
//                     <div className="ml-4">
//                       <h3 className={`text-lg font-semibold ${prediction.isHighRisk ? 'text-red-800' : 'text-green-800'}`}>
//                         {prediction.isHighRisk ? 'High Risk of Churn' : 'Low Risk of Churn'}
//                       </h3>
//                       <p className="mt-1 text-sm text-gray-600">Churn Probability: {(prediction.probability * 100).toFixed(1)}%</p>
//                     </div>
//                   </div>
//                   {prediction.isHighRisk && (
//                     <div className="mt-4 flex items-start">
//                       <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
//                       <p className="ml-2 text-sm text-red-700">
//                         Recommended Actions:
//                         <ul className="list-disc ml-5 mt-2">
//                           <li>Reach out to the customer for feedback</li>
//                           <li>Consider offering a personalized retention package</li>
//                           <li>Review pricing and service usage patterns</li>
//                         </ul>
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
