import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactInfoProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setErrorMessage('Please fill out all fields.');
      return;
    }
    if (!validateEmail(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitted(true);
    setErrorMessage('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsSubmitted(false);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-custom-black py-12 flex items-center">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-5xl text-gre mb-4 font-extrabold">Contact Us</h1>
          <p className="text-custom-gray">We would love to hear from you!</p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-10 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
        >
          <ContactInfo icon={<Mail className="h-8 w-8 text-custom-green" />} title="Email" content="contact@example.com" />
          <ContactInfo icon={<Phone className="h-8 w-8 text-custom-green" />} title="Phone" content="+123 456 7890" />
          <ContactInfo icon={<MapPin className="h-8 w-8 text-custom-green" />} title="Location" content="123 Business Rd, Suite 456" />
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="space-y-6 bg-gray-800 p-8 rounded-xl shadow-lg"
        >
          {isSubmitted && <p className="text-green-600 font-semibold">Thank you! Your message has been sent.</p>}
          {errorMessage && <p className="text-red-600 font-semibold">{errorMessage}</p>}

          <motion.input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-custom-green"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-custom-green"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-custom-green"
            whileFocus={{ scale: 1.02 }}
          />
          <motion.textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-custom-green h-32 resize-none"
            whileFocus={{ scale: 1.02 }}
          />

          <motion.button
            type="submit"
            className="flex items-center justify-center w-full bg-custom-green text-white font-semibold p-4 rounded-lg hover:bg-green-700 transition duration-200"
            whileHover={{ scale: 1.05 }}
          >
            <Send className="h-5 w-5 mr-2" />
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, content }) => (
  <motion.div
    className="flex items-start space-x-3 bg-gray-800/50 p-6 rounded-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.8 }}
    whileHover={{ scale: 1.05, boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.3)' }}
  >
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-gray-400 text-xl font-medium">{title}</h3>
      <p className="text-custom-green">{content}</p>
    </div>
  </motion.div>
);

export default ContactPage;
