import React, { useState, FormEvent } from 'react';
import { Mail, MapPin, Loader2, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from 'react-hot-toast';
import { emailConfig } from '../config/email';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  message: '',
};

export function Contact() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'info.kalamaenglish@gmail.com',
        },
        emailConfig.publicKey
      );

      toast.success('Message envoyé avec succès!');
      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      console.error('Email error:', error);
      toast.error('Échec de l\'envoi du message. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <Toaster position="top-center" />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Contactez-nous</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Restons en contact</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="text-teal-600" />
                <span>info.kalamaenglish@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-teal-600" />
                <span>PARIS / ONLINE</span>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Votre email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Votre message"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Envoyer le message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}