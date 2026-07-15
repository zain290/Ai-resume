export const AGENCY_DATA = {
  name: 'RezFix',
  tagline: 'AI-powered resume analyzer that scores your resume against job descriptions using the Google XYZ formula.',
  website: 'rezfix.zemz.pro',

  contact: {
    email: 'hello@rezfix.zemz.pro',
  },

  overview: {
    positioning: 'RezFix is an AI-powered resume analyzer that scores your resume against job descriptions and gives actionable improvements instantly.',
    approach: 'Paste a job description, upload your resume, and get a detailed score with specific recommendations based on the Google XYZ formula.',
    philosophy: 'We believe every job seeker deserves a fair chance. AI should help level the playing field, not gatekeep opportunities.',
  },

  services: [
    {
      name: 'Resume Analysis',
      description: 'Score your resume against any job description with detailed actionable feedback.',
      deliverables: [
        'ATS compatibility scoring',
        'Google XYZ formula analysis',
        'Keyword gap detection',
        'Section-by-section feedback',
        'Actionable improvement tips',
      ],
      pricing: 'Free to use.',
    },
  ],

  process: [
    'Paste a job description or target role.',
    'Upload or paste your resume.',
    'Get an instant AI-powered score with specific recommendations.',
  ],

  products: [
    {
      name: 'RezFix Web',
      status: 'Live',
      description: 'Web-based resume analysis tool. Score your resume, get feedback, and land more interviews.',
    },
  ],

  portfolio: [],

  faqs: [
    {
      q: 'How does the scoring work?',
      a: 'RezFix uses AI to compare your resume against the job description, scoring it on relevance, keywords, and format.',
    },
    {
      q: 'What is the Google XYZ formula?',
      a: 'The Google XYZ formula (Accomplished X by doing Y as measured by Z) is a framework for writing impactful resume bullet points.',
    },
    {
      q: 'Is my data private?',
      a: 'Yes. Your resume and job description are processed securely and not stored permanently.',
    },
    {
      q: 'Is it free?',
      a: 'Yes, RezFix is completely free to use.',
    },
  ],

  guardrails: {
    pricing: 'If someone asks about pricing, tell them RezFix is completely free.',
    outOfScope: 'If someone asks about anything unrelated to RezFix or resume analysis, politely decline to answer.',
  },

  agentPersonality: 'Friendly, concise, and helpful. Never invent facts. Never answer unrelated questions.',
};

export const CHAT_SUGGESTIONS = {
  initial: [
    'How does RezFix work?',
    'What is the Google XYZ formula?',
    'Is my data private?',
  ],
  followUp: [
    'Is it free?',
    'How does the scoring work?',
    'What file types are supported?',
    'Can I improve my score?',
    'How do I contact support?',
    'What makes a good resume?',
  ],
};

export const OPENING_MESSAGE =
  `Hi, I'm the ${AGENCY_DATA.name} assistant.\n` +
  `I can help with features, scoring, privacy, and general questions about the resume analyzer.`;
