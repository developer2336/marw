import { useState } from 'react';
import Hero from './components/Hero';
import EvaluationForm from './components/EvaluationForm';
import ResultsDisplay from './components/ResultsDisplay';
import Footer from './components/Footer';
import { evaluateAnswer } from './services/geminiService';
import { EvaluationRequest, EvaluationResult } from './types';

function App() {
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEvaluation = async (request: EvaluationRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const evaluationResult = await evaluateAnswer(request);
      setResult(evaluationResult);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      
      {result ? (
        <ResultsDisplay result={result} onReset={handleReset} />
      ) : (
        <EvaluationForm 
          onSubmit={handleEvaluation}
          isLoading={isLoading}
          error={error}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;