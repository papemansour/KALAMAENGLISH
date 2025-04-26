import React, { useState } from 'react';
import { Globe, Check } from 'lucide-react';

interface PackFeature {
  name: string;
  included: boolean;
}

interface PricingPack {
  name: string;
  description: string;
  priceEUR: number;
  originalPriceEUR: number;
  priceCFA: number;
  hours: number;
  isPopular?: boolean;
  level: string;
  features: PackFeature[];
}

const pricingPacks: PricingPack[] = [
  {
    name: "English Essentials",
    description: "Pack idéal pour débuter votre apprentissage de l'anglais",
    priceEUR: 59.99,
    originalPriceEUR: 66.66,
    priceCFA: 20000,
    hours: 14,
    level: "Beginner",
    features: [
      { name: "14h de cours par mois", included: true },
      { name: "1ère séance gratuite", included: true },
      { name: "Vocabulaire de base", included: true },
      { name: "Exercices interactifs", included: true }
    ]
  },
  {
    name: "English Proficiency",
    description: "Pour une progression régulière et efficace",
    priceEUR: 79.99,
    originalPriceEUR: 88.88,
    priceCFA: 35000,
    hours: 18,
    level: "Intermediate",
    features: [
      { name: "18h de cours par mois", included: true },
      { name: "1ère séance gratuite", included: true },
      { name: "Grammaire avancée", included: true },
      { name: "Conversation pratique", included: true }
    ],
    isPopular: true
  },
  {
    name: "Fluent English Mastery",
    description: "Pour une maîtrise complète de l'anglais",
    priceEUR: 99.99,
    originalPriceEUR: 111.11,
    priceCFA: 50000,
    hours: 24,
    level: "Advanced",
    features: [
      { name: "24h de cours par mois", included: true },
      { name: "1ère séance gratuite", included: true },
      { name: "Programme personnalisé", included: true },
      { name: "Coaching individuel", included: true }
    ]
  }
];

export function PricingPacks() {
  const [showCFA, setShowCFA] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const handleLevelSelect = (level: string | null) => {
    if (level === null) {
      const testSection = document.getElementById('test-your-level');
      if (testSection) {
        testSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setSelectedLevel(level);
    }
  };

  const selectedPack = selectedLevel ? pricingPacks.find(pack => pack.level === selectedLevel) : null;

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">LEVELS & PRICES</h2>

        <div className="max-w-2xl mx-auto mb-12">
          <p className="text-center text-teal-600 font-semibold text-xl mb-6">
            Cliquer sur votre niveau pour connaître les tarifs
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
              <button
                key={level}
                onClick={() => handleLevelSelect(level)}
                className={`p-4 rounded-lg transition-colors text-lg font-medium ${
                  selectedLevel === level 
                    ? 'bg-teal-600 text-white' 
                    : 'bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-50'
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="text-center text-gray-600 mb-4 p-4 bg-gray-50 rounded-lg">
            <p>Vous ne connaissez pas votre niveau ?</p>
            <p>Cliquer sur Je ne connais pas mon niveau</p>
          </div>

          <div className="p-4 rounded-lg border-2 border-teal-600 bg-white hover:bg-teal-50 transition-colors">
            <button
              onClick={() => handleLevelSelect(null)}
              className="w-full text-lg font-medium text-teal-600"
            >
              Je ne connais pas mon niveau - Faire le test
            </button>
          </div>
        </div>

        {selectedPack && (
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowCFA(!showCFA)}
                className="flex items-center gap-2 bg-teal-100 text-teal-800 px-4 py-2 rounded-full hover:bg-teal-200 transition-colors"
              >
                <Globe size={20} />
                {showCFA ? "Afficher en EUR" : "Afficher en FCFA"}
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {selectedPack.isPopular && (
                <div className="bg-teal-500 text-white text-center py-1 text-sm">
                  Plus populaire
                </div>
              )}
              <div className="p-8">
                <h4 className="text-2xl font-bold mb-2">{selectedPack.name}</h4>
                <p className="text-gray-600 mb-6">{selectedPack.description}</p>
                
                <div className="flex items-center gap-3 mb-8">
                  <span className="text-4xl font-bold text-teal-600">
                    {showCFA 
                      ? `${selectedPack.priceCFA.toLocaleString()} FCFA`
                      : `${selectedPack.priceEUR.toFixed(2)} €`
                    }
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {showCFA 
                      ? `${(selectedPack.priceCFA * 1.1).toLocaleString()} FCFA`
                      : `${selectedPack.originalPriceEUR.toFixed(2)} €`
                    }
                  </span>
                  <span className="text-sm font-semibold text-green-500">-10%</span>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-8">
                  <h5 className="font-semibold mb-4">Ce qui est inclus :</h5>
                  <ul className="space-y-4">
                    {selectedPack.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-teal-500" />
                        <span className="text-gray-700">{feature.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}