import { GraduationCap, Zap, Shield } from 'lucide-react';

export default function Hero() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <GraduationCap className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              MarkWise
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            Upload your student or candidate answers. Get instant AI-powered marks, 
            feedback, and corrections using Google Gemini. No login required. Try the beta now.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Analysis</h3>
            <p className="text-gray-600 text-sm">Get comprehensive feedback in seconds using Google Gemini AI</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Scoring</h3>
            <p className="text-gray-600 text-sm">Accurate scoring out of 10 with detailed mistake identification</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Login Required</h3>
            <p className="text-gray-600 text-sm">Start evaluating immediately without any registration hassle</p>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Perfect for teachers, recruiters, and trainers • Powered by Google Gemini AI
        </div>
      </div>
    </div>
  );
}