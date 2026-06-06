import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { BookOpen, FileText, Brain, BarChart3, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

const features = [
  {
    icon: FileText,
    title: 'Assignment Generator',
    description: 'Generate plagiarism-free assignments with AI assistance',
  },
  {
    icon: BookOpen,
    title: 'Study Notes',
    description: 'Create concise, comprehensive study notes automatically',
  },
  {
    icon: Brain,
    title: 'Q&A Generator',
    description: 'Generate answers for 2-mark, 5-mark, and 10-mark questions',
  },
  {
    icon: BarChart3,
    title: 'Paper Analysis',
    description: 'Upload past papers and get topic analysis and insights',
  },
];

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center animate-fadeInUp">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-gradient">
            Your AI College Copilot
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Generate assignments, study notes, and practice questions instantly with AI.
            Get ahead in your academics with intelligent assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated && (
              <>
                <Link href="/auth/signup" className="btn btn-primary px-8 py-3 text-lg">
                  Get Started Free
                  <ArrowRight size={20} />
                </Link>
                <Link href="/auth/login" className="btn btn-secondary px-8 py-3 text-lg">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
        <div className="grid-responsive">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="card-hover"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 100}ms both`,
                }}
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-primary-600 dark:text-primary-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-primary-600 rounded-2xl p-8 sm:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-primary-100 mb-8 text-lg">
              Join thousands of students already using AI College Copilot
            </p>
            <Link href="/auth/signup" className="btn bg-white text-primary-600 hover:bg-slate-100 px-8 py-3 text-lg font-semibold">
              Create Free Account
              <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-slate-600 dark:text-slate-400">
          <p>&copy; 2024 AI College Copilot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
