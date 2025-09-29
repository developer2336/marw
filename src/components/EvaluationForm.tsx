import { useState, useRef } from 'react';
import { Upload, FileText, Loader2, AlertCircle } from 'lucide-react';
import { EvaluationRequest } from '../types';
import { extractTextFromPDF, isValidPDF } from '../utils/pdfExtractor';

interface Props {
  onSubmit: (request: EvaluationRequest) => void;
  isLoading: boolean;
  error: string | null;
}

export default function EvaluationForm({ onSubmit, isLoading, error }: Props) {
  const [formData, setFormData] = useState({
    question: '',
    idealAnswer: '',
    studentAnswer: '',
    useAdvancedRubric: false,
  });
  
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (file: File) => {
    if (!isValidPDF(file)) {
      setUploadStatus('Please upload a valid PDF file (max 10MB)');
      return;
    }

    setUploadStatus('Processing PDF...');
    try {
      const extractedText = await extractTextFromPDF(file);
      handleInputChange('studentAnswer', extractedText);
      setUploadStatus('PDF processed successfully');
      setTimeout(() => setUploadStatus(''), 3000);
    } catch (error) {
      setUploadStatus('Failed to process PDF. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.question.trim() || !formData.idealAnswer.trim() || !formData.studentAnswer.trim()) {
      return;
    }

    onSubmit(formData);
  };

  const isFormValid = formData.question.trim() && formData.idealAnswer.trim() && formData.studentAnswer.trim();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white">Evaluate Answer</h2>
          <p className="text-blue-100 mt-2">Fill in the form below to get instant AI-powered feedback</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-800">Error</h4>
                <p className="text-red-700 mt-1">{error}</p>
                {error.includes('API key') && (
                  <p className="text-red-600 text-sm mt-2">
                    Please ensure your VITE_GEMINI_API_KEY is properly configured in your .env file.
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="question" className="block text-sm font-semibold text-gray-900">
              Question <span className="text-red-500">*</span>
            </label>
            <textarea
              id="question"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
              placeholder="Enter the question that was asked..."
              value={formData.question}
              onChange={(e) => handleInputChange('question', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="idealAnswer" className="block text-sm font-semibold text-gray-900">
              Ideal Answer <span className="text-red-500">*</span>
            </label>
            <textarea
              id="idealAnswer"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
              placeholder="Enter the ideal/expected answer..."
              value={formData.idealAnswer}
              onChange={(e) => handleInputChange('idealAnswer', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="studentAnswer" className="block text-sm font-semibold text-gray-900">
              Student Answer <span className="text-red-500">*</span>
            </label>
            
            <div className="space-y-4">
              <textarea
                id="studentAnswer"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-y"
                placeholder="Enter the student's answer or upload a PDF below..."
                value={formData.studentAnswer}
                onChange={(e) => handleInputChange('studentAnswer', e.target.value)}
                required
              />

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                  className="hidden"
                />
                
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-sm text-gray-600 mb-2">
                  Or upload a PDF file (max 10MB)
                </p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </button>
                
                {uploadStatus && (
                  <p className="mt-2 text-sm text-blue-600">{uploadStatus}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="useAdvancedRubric"
              type="checkbox"
              checked={formData.useAdvancedRubric}
              onChange={(e) => handleInputChange('useAdvancedRubric', e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="useAdvancedRubric" className="ml-3 text-sm text-gray-700">
              Use advanced marking logic (detailed rubric criteria)
            </label>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Analyzing Answer...
                </>
              ) : (
                'Evaluate Answer'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}