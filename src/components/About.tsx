import React, { useState } from 'react';
import { Users, Trophy, User, X, GraduationCap, Star, Clock, BookOpen } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function About() {
  const { t } = useTranslation();
  const [showCreatorInfo, setShowCreatorInfo] = useState(false);

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <BookOpen className="w-12 h-12 text-teal-600" />
                </div>
                <h3 className="font-semibold mt-2 text-teal-600">{t('about.stats.courses')}</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <Users className="w-12 h-12 text-teal-600" />
                </div>
                <h3 className="font-semibold mt-2 text-teal-600">{t('about.stats.students')}</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="p-3 bg-teal-50 rounded-lg">
                  <Trophy className="w-12 h-12 text-teal-600" />
                </div>
                <h3 className="font-semibold mt-2 text-teal-600">{t('about.stats.levels')}</h3>
              </div>
            </div>

            <button
              onClick={() => setShowCreatorInfo(true)}
              className="mt-4 text-teal-600 hover:text-teal-700 font-medium"
            >
              En savoir plus sur KALAMA ENGLISH
            </button>
          </div>

          {/* Replace photo with engaging features */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Pourquoi choisir KALAMA ENGLISH ?</h3>
            
            <div className="grid gap-6">
              <div className="bg-teal-50 p-6 rounded-lg flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg">
                  <GraduationCap className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Apprentissage personnalisé</h4>
                  <p className="text-gray-600">Des cours adaptés à votre niveau et à vos objectifs spécifiques</p>
                </div>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg">
                  <Star className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Professeurs qualifiés</h4>
                  <p className="text-gray-600">Une équipe d'experts passionnés par l'enseignement de l'anglais</p>
                </div>
              </div>

              <div className="bg-teal-50 p-6 rounded-lg flex items-start gap-4">
                <div className="p-3 bg-white rounded-lg">
                  <Clock className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Flexibilité totale</h4>
                  <p className="text-gray-600">Apprenez à votre rythme avec des horaires adaptés à votre emploi du temps</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creator Info Modal */}
      {showCreatorInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold">À propos de KALAMA ENGLISH</h2>
              <button
                onClick={() => setShowCreatorInfo(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-teal-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">DIAGNE Mouhamadou Mansour</h3>
                  <p className="text-gray-600">Fondateur & Développeur</p>
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-600 mb-6">
                  KALAMA ENGLISH est le fruit de la vision et du travail de DIAGNE Mouhamadou Mansour, 
                  un passionné d'éducation et de technologie. En tant que développeur et enseignant, 
                  il a créé cette plateforme dans le but de rendre l'apprentissage de l'anglais plus 
                  accessible, interactif et efficace.
                </p>

                <p className="text-gray-600 mb-6">
                  La plateforme a été conçue avec une attention particulière portée à l'expérience 
                  utilisateur, combinant des méthodes d'enseignement éprouvées avec des technologies 
                  modernes. Chaque fonctionnalité a été pensée pour faciliter le parcours d'apprentissage 
                  des étudiants, qu'ils soient débutants ou avancés.
                </p>

                <p className="text-gray-600">
                  Notre mission est de créer un environnement d'apprentissage stimulant où chaque 
                  étudiant peut progresser à son rythme, soutenu par des outils pédagogiques innovants 
                  et un suivi personnalisé. KALAMA ENGLISH n'est pas qu'une simple plateforme 
                  d'apprentissage, c'est une communauté dédiée à la réussite de chacun de ses membres.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}