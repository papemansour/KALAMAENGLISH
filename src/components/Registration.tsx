import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Calendar, Plus, X } from 'lucide-react';

interface Schedule {
  day: string;
  time: string;
}

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  level: string | null;
  schedules: Schedule[];
}

const initialFormData: RegistrationFormData = {
  firstName: '',
  lastName: '',
  email: '',
  level: null,
  schedules: [{ day: '', time: '' }]
};

const timeSlots = Array.from({ length: 13 }, (_, i) => {
  const hour = i + 8;
  return `${hour}:00`;
});

const days = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi'
];

export function Registration() {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.level || !formData.email) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (formData.schedules.some(s => !s.day || !s.time)) {
      toast.error('Veuillez sélectionner tous les créneaux horaires');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Veuillez entrer une adresse email valide');
      return;
    }

    // Save student data to localStorage for admin access
    const students = JSON.parse(localStorage.getItem('students') || '[]');
    const newStudent = {
      id: Date.now().toString(),
      ...formData,
      registrationDate: new Date().toLocaleDateString('fr-FR')
    };
    localStorage.setItem('students', JSON.stringify([...students, newStudent]));

    // Reset form
    setFormData(initialFormData);

    // Scroll to pricing section
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }

    toast.success('Inscription réussie !');
  };

  const handleLevelTest = () => {
    const testSection = document.getElementById('test-your-level');
    if (testSection) {
      testSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const addSchedule = () => {
    setFormData({
      ...formData,
      schedules: [...formData.schedules, { day: '', time: '' }]
    });
  };

  const removeSchedule = (index: number) => {
    if (formData.schedules.length === 1) {
      toast.error('Au moins un créneau horaire est requis');
      return;
    }
    const newSchedules = formData.schedules.filter((_, i) => i !== index);
    setFormData({ ...formData, schedules: newSchedules });
  };

  const updateSchedule = (index: number, field: keyof Schedule, value: string) => {
    const newSchedules = formData.schedules.map((schedule, i) => {
      if (i === index) {
        return { ...schedule, [field]: value };
      }
      return schedule;
    });
    setFormData({ ...formData, schedules: newSchedules });
  };

  return (
    <section id="registration" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pas encore de ticket pour l'aventure ?
          </h2>
          <p className="text-xl text-gray-600">
            Inscrivez-vous pour commencer votre aventure avec KALAMA ENGLISH
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium mb-2 text-gray-900">
                Prénom
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-lg font-medium mb-2 text-gray-900">
                Nom
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium mb-2 text-gray-900">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2 text-gray-900">
              Niveau
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData({ ...formData, level })}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    formData.level === level 
                      ? 'bg-teal-600 text-white border-teal-600' 
                      : 'bg-white border-gray-200 text-gray-700 hover:border-teal-600'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleLevelTest}
              className="mt-2 text-teal-600 hover:text-teal-700 text-sm"
            >
              Je ne connais pas mon niveau - Faire le test
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-lg font-medium text-gray-900">
                Créneaux horaires
              </label>
              <button
                type="button"
                onClick={addSchedule}
                className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-700"
              >
                <Plus size={16} />
                Ajouter un créneau
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.schedules.map((schedule, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <select
                      value={schedule.day}
                      onChange={(e) => updateSchedule(index, 'day', e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-700"
                      required
                    >
                      <option value="">Sélectionnez un jour</option>
                      {days.map((day) => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>

                    <select
                      value={schedule.time}
                      onChange={(e) => updateSchedule(index, 'time', e.target.value)}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-700"
                      required
                    >
                      <option value="">Sélectionnez une heure</option>
                      {timeSlots.map((time) => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                  
                  {formData.schedules.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSchedule(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      title="Supprimer ce créneau"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-4 rounded-lg hover:bg-teal-700 transition-colors font-semibold text-lg"
          >
            S'inscrire
          </button>
        </form>
      </div>
    </section>
  );
}