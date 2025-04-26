import React, { useState } from 'react';
import { GraduationCap, X } from 'lucide-react';

interface LegalModalProps {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
}

function LegalModal({ title, content, onClose }: LegalModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="prose prose-lg max-w-none">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    content: React.ReactNode;
  } | null>(null);

  const handleLegalClick = (type: string) => {
    switch (type) {
      case 'legal':
        setModalContent({
          title: 'Mentions Légales',
          content: (
            <div className="space-y-6">
              <section>
                <h3 className="text-xl font-bold mb-4">1. Informations légales</h3>
                <p>
                  KALAMA ENGLISH est une plateforme d'apprentissage de l'anglais en ligne, créée et gérée par :
                </p>
                <ul className="list-disc ml-6 mt-2">
                  <li>Mouhamadou Mansour DIAGNE</li>
                  <li>Email : info.kalamaenglish@gmail.com</li>
                  <li>Adresse : Dakar, Sénégal</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">2. Propriété intellectuelle</h3>
                <p>
                  L'ensemble du contenu de ce site (textes, images, vidéos, etc.) est protégé par les lois relatives 
                  à la propriété intellectuelle. Toute reproduction ou représentation, intégrale ou partielle, par quelque 
                  procédé que ce soit, faite sans le consentement de KALAMA ENGLISH est illicite.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">3. Protection des données personnelles</h3>
                <p>
                  Conformément à la loi n°2008-12 du 25 janvier 2008 portant sur la protection des données à caractère 
                  personnel, vous disposez d'un droit d'accès, de rectification et de suppression des données vous concernant.
                </p>
                <p className="mt-2">
                  Les informations collectées sont destinées uniquement à l'amélioration de nos services et ne seront 
                  en aucun cas transmises à des tiers sans votre consentement.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">4. Conditions d'utilisation</h3>
                <p>
                  L'utilisation de la plateforme KALAMA ENGLISH implique l'acceptation pleine et entière des conditions 
                  générales d'utilisation décrites ci-dessus. Ces conditions d'utilisation peuvent être modifiées à tout moment.
                </p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">5. Responsabilité</h3>
                <p>
                  KALAMA ENGLISH met tout en œuvre pour offrir aux utilisateurs des informations et outils disponibles et 
                  vérifiés, mais ne saurait être tenue pour responsable des erreurs, d'une absence de disponibilité des 
                  informations, ou de la présence de virus sur son site.
                </p>
              </section>
            </div>
          ),
        });
        break;
    }
    setShowModal(true);
  };

  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-8 w-8 text-teal-600" />
              <h3 className="text-xl font-bold">KALAMA ENGLISH</h3>
            </div>
            <p className="text-gray-600">
              Votre partenaire de confiance pour l'apprentissage de l'anglais en ligne.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Informations légales</h4>
            <button 
              onClick={() => handleLegalClick('legal')}
              className="text-gray-600 hover:text-teal-600 transition-colors"
            >
              Mentions légales
            </button>
          </div>
        </div>

        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">
              © 2024 KALAMA ENGLISH. Tous droits réservés.
            </p>
            <p className="text-gray-600">
              Créé et développé par Mouhamadou Mansour DIAGNE
            </p>
          </div>
        </div>
      </div>

      {showModal && modalContent && (
        <LegalModal
          title={modalContent.title}
          content={modalContent.content}
          onClose={() => setShowModal(false)}
        />
      )}
    </footer>
  );
}