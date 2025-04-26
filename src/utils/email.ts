import emailjs from '@emailjs/browser';
import { emailConfig } from '../config/email';

export const sendEmail = async (
  templateParams: Record<string, unknown>
): Promise<void> => {
  try {
    const { serviceId, templateId, publicKey } = emailConfig;
    
    if (!serviceId || !templateId || !publicKey) {
      throw new Error('Missing email configuration. Please check your EmailJS settings.');
    }

    await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Failed to send email. Please check your email configuration.');
  }
};

export const sendWelcomeEmail = async (email: string) => {
  const templateParams = {
    to_email: email,
    subject: 'Welcome to KALAMA ENGLISH!',
    message: `
Bonjour,
Nous sommes ravis de vous souhaiter la bienvenue sur KALAMA ENGLISH ! 🎉
Votre inscription à nos cours d'anglais marque le début d'un voyage passionnant vers la maîtrise de la langue.

Ce qui vous attend :
✅ Des leçons interactives adaptées à votre niveau.
✅ Des professeurs expérimentés pour vous guider.
✅ Des exercices pratiques pour progresser rapidement.
✅ Un accès 24/7 à notre plateforme.

Prochaines étapes :

Connectez-vous à votre espace personnel

Explorez nos modules de cours et choisissez votre premier sujet.

Rejoignez une classe virtuelle ou travaillez à votre rythme.

Besoin d'aide ? Contactez notre équipe à ${emailConfig.adminEmail} ou via le chat en direct sur la plateforme.

À très vite sur KALAMA ENGLISH !

L'équipe KALAMA ENGLISH

---

Dear,

We are thrilled to welcome you to KALAMA ENGLISH! 🎉
Your enrollment in our English courses marks the beginning of an exciting journey toward language mastery.

What to expect :
✅ Interactive lessons tailored to your level.
✅ Experienced teachers to guide you.
✅ Practical exercises for rapid progress.
✅ 24/7 access to our platform.

Next steps :

Log in to your dashboard

Explore our course modules and choose your first topic.

Join a virtual class or learn at your own pace.

Need help? Contact our team at ${emailConfig.adminEmail} or via live chat on the platform.

See you soon on KALAMA ENGLISH!
Best regards,
The KALAMA ENGLISH Team
    `
  };

  try {
    await sendEmail(templateParams);
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    throw error;
  }
};