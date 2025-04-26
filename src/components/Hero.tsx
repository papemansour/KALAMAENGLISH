import React from 'react';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function Hero() {
  const { t } = useTranslation();

  const handleStartLearning = () => {
    const studentSpaceElement = document.getElementById('student-space');
    if (studentSpaceElement) {
      studentSpaceElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=2070&auto=format&fit=crop"
          alt={t('hero.imageAlt')}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-3xl">
          <div className="mb-8">
            <blockquote className="text-xl md:text-3xl italic text-gray-200 mb-4">
              "To have another language is to possess a second soul."
            </blockquote>
            <p className="text-gray-400">‒ Charlemagne</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold text-teal-400 mb-2">95%</div>
              <p className="text-gray-200">Success Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold text-teal-400 mb-2">+200</div>
              <p className="text-gray-200">Hours of Content</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl font-bold text-teal-400 mb-2">24/7</div>
              <p className="text-gray-200">Learning Access</p>
            </div>
          </div>

          <p className="text-lg sm:text-xl text-gray-200 mb-8">
            Rejoignez KALAMA ENGLISH, la plateforme idéale pour apprendre l'anglais en ligne à votre rythme ! Que vous préfériez des cours en soirée, le week-end ou à tout autre moment qui vous convient, nous vous offrons un cadre convivial et professionnel pour améliorer votre niveau d'anglais. Profitez d'un apprentissage personnalisé entre particuliers et faites progresser vos compétences linguistiques de manière flexible et agréable !
          </p>

          <button
            onClick={handleStartLearning}
            className="inline-flex items-center px-6 py-3 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition duration-300 text-lg"
          >
            <Play className="mr-2" size={24} />
            Commencer à apprendre
          </button>
        </div>
      </div>
    </section>
  );
}