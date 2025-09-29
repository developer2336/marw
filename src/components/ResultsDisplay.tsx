import { CheckCircle, XCircle, Star, TrendingUp } from 'lucide-react';
import { EvaluationResult } from '../types';

interface Props {
  result: EvaluationResult;
  onReset: () => void;
}

export default function ResultsDisplay({ result, onReset }: Props) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 6) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 8) return <CheckCircle className="h-6 w-6 text-green-600" />;
    if (score >= 6) return <Star className="h-6 w-6 text-yellow-600" />;
    return <XCircle className="h-6 w-6 text-red-600" />;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <TrendingUp className="h-6 w-6 mr-3" />
            Evaluation Results
          </h2>
          <p className="text-green-100 mt-2">AI-powered analysis completed</p>
        </div>

        <div className="p-8">
          {/* Score Section */}
          <div className="mb-8">
            <div className={`inline-flex items-center px-6 py-4 rounded-xl border-2 ${getScoreColor(result.score)}`}>
              {getScoreIcon(result.score)}
              <div className="ml-4">
                <div className="text-sm font-medium opacity-75">Overall Score</div>
                <div className="text-3xl font-bold">{result.score}/10</div>
              </div>
            </div>
          </div>

          {/* Feedback Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <CheckCircle className="h-5 w-5 text-blue-600 mr-2" />
              Feedback
            </h3>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
              <p className="text-gray-800 leading-relaxed">{result.feedback}</p>
            </div>
          </div>

          {/* Mistakes Section */}
          {result.mistakes.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <XCircle className="h-5 w-5 text-red-600 mr-2" />
                Key Mistakes
              </h3>
              <div className="space-y-3">
                {result.mistakes.map((mistake, index) => (
                  <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-red-100 rounded-full p-1 mr-3 mt-0.5">
                        <span className="text-red-600 text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="text-red-800">{mistake}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Strengths Section */}
          {result.strengths.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Star className="h-5 w-5 text-green-600 mr-2" />
                Strengths
              </h3>
              <div className="space-y-3">
                {result.strengths.map((strength, index) => (
                  <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <p className="text-green-800">{strength}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={onReset}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              Evaluate Another Answer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}