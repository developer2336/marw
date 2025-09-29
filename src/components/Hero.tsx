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
            Upload student or candidate answers. Get real-time marks, intelligent feedback,
            and instant corrections – powered by our in-house AI engine. No login required.
            Try the beta now.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Analysis</h3>
            <p className="text-gray-600 text-sm">
              Our custom-built AI model reviews and responds in seconds – no human needed.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <GraduationCap className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Scoring</h3>
            <p className="text-gray-600 text-sm">
              Automatic marking out of 10, with precise breakdown of where students went wrong.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-full shadow-md mb-4">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Login Required</h3>
            <p className="text-gray-600 text-sm">
              Start using MarkWise instantly. No signups, no delays – just upload and go.
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Built by <span className="font-medium text-gray-800">IT Atmoz</span> • Empowering educators, recruiters, and trainers with AI-first tools
        </div>
      </div>
    </div>
  );
}
