import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

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

    console.log('Form submitted:', formData);
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
    <div className="min-h-screen bg-custom-black py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl text-gre font-bold mb-4">Contact Us</h1>
          <p className="text-custom-gray mb-20">We would love to hear from you!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <ContactInfo icon={<Mail className="h-8 w-8 text-custom-green" />} title="Email" content="contact@example.com" />
          <ContactInfo icon={<Phone className="h-8 w-8 text-custom-green" />} title="Phone" content="+123 456 7890" />
          <ContactInfo icon={<MapPin className="h-8 w-8 text-custom-green" />} title="Location" content="123 Business Rd, Suite 456" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-8 rounded-lg shadow-md">
          {isSubmitted && <p className="text-green-600 font-semibold">Thank you! Your message has been sent.</p>}
          {errorMessage && <p className="text-red-600 font-semibold">{errorMessage}</p>}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="placeholder-gray-200 w-full p-4 rounded-lg bg-gray-500 focus:border-green-600"  
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="placeholder-gray-200 w-full p-4 rounded-lg bg-gray-500 focus:border-green-600"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="placeholder-gray-200 w-full p-4 rounded-lg bg-gray-500 focus:border-green-600"
          />
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className="placeholder-gray-200 w-full p-4 rounded-lg bg-gray-500 focus:border-green-600 h-32 resize-none"
          />

          <button
            type="submit"
            className="flex items-center justify-center w-full bg-green-600 text-white font-semibold p-4 rounded-lg hover:bg-green-700 transition-colors duration-200"
          >
            <Send className="h-5 w-5 mr-2" />
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

const ContactInfo: React.FC<ContactInfoProps> = ({ icon, title, content }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0">{icon}</div>
    <div>
      <h3 className="text-gray-400 text-xl font-medium">{title}</h3>
      <p className="text-custom-green">{content}</p>
    </div>
  </div>
);

export default ContactPage;
