# MarkWise - AI-Powered Auto-Evaluation Platform

A professional, world-class web platform for teachers, recruiters, and trainers to analyze student or candidate answers using Google Gemini AI.

## 🚀 Features

- **Clean, Professional UI**: White background, modern design, fully mobile responsive
- **No Login Required**: Start evaluating immediately without registration
- **AI-Powered Analysis**: Uses Google Gemini AI for intelligent answer evaluation
- **Comprehensive Feedback**: Provides scores out of 10, detailed feedback, mistakes, and strengths
- **PDF Support**: Upload PDF files with text extraction capabilities
- **Advanced Rubric**: Optional advanced marking logic for detailed evaluation
- **Mobile-First Design**: Optimized for all device sizes with excellent UX

## 🛠️ Setup Instructions

### 1. Get Your Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

## 🧠 How It Works

1. **Input**: Users provide a question, ideal answer, and student answer
2. **Analysis**: Google Gemini AI compares and evaluates the answers
3. **Results**: Platform displays score, feedback, mistakes, and strengths
4. **Reset**: Users can evaluate new answers (no data persistence)

## 🎯 Use Cases

- **Teachers**: Grade student assignments and provide feedback
- **Recruiters**: Evaluate candidate responses in assessments
- **Trainers**: Assess trainee understanding and knowledge retention

## 🔧 Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **AI**: Google Gemini Pro API
- **Icons**: Lucide React
- **File Processing**: PDF text extraction utilities

## 📱 Responsive Design

- Mobile-first approach with breakpoints for all screen sizes
- Clean typography with proper contrast ratios
- Generous spacing using 8px grid system
- Professional color scheme with accessibility in mind

## 🔒 Privacy & Security

- No user data storage or persistence
- Temporary evaluation results (cleared on refresh)
- Secure API communication with Google Gemini
- No login or personal information required

## 🚀 Deployment

The application is ready for deployment to any static hosting service:

```bash
npm run build
```

## 📄 License

© 2025 markwise.itatmoz.com - Powered by IT Atmoz