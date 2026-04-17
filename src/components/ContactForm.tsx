import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import emailIcon from '../assets/images/logo/picture/email.png';
import githubIcon from '../assets/images/logo/picture/github.png';
import linkedinIcon from '../assets/images/logo/picture/linkedin.png';
import facebookIcon from '../assets/images/logo/picture/facebook.png';

export default function ContactForm() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init('CpsxAG905nKwjQQjO');
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formState.name || !formState.email || !formState.message) {
      setStatus('error');
      setMessage('Please fill in all fields');
      return;
    }

    setLoading(true);
    setStatus('loading');

    try {
      await emailjs.send('service_q04fi8c', 'template_gjlz14m', {
        to_email: 'markandreyperez@gmail.com',
        from_name: formState.name,
        from_email: formState.email,
        message: formState.message,
      });

      setStatus('success');
      setMessage('Message sent successfully! I will get back to you soon.');
      setFormState({ name: '', email: '', message: '' });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Failed to send message. Please try again or email me directly.');
      console.error('EmailJS error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            value={formState.name}
            onChange={(event) => setFormState({ ...formState, name: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
            placeholder="Your name"
            type="text"
            disabled={loading}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            value={formState.email}
            onChange={(event) => setFormState({ ...formState, email: event.target.value })}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
            placeholder="Your email"
            type="email"
            disabled={loading}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-800 dark:text-slate-200" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            value={formState.message}
            onChange={(event) => setFormState({ ...formState, message: event.target.value })}
            className="h-36 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
            placeholder="Send a quick note"
            disabled={loading}
          />
        </div>
        {message && (
          <div
            className={`rounded-2xl p-4 text-sm font-medium ${
              status === 'success'
                ? 'border border-green-300 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-900/30 dark:text-green-200'
                : 'border border-red-300 bg-red-50 text-red-800 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200'
            }`}
          >
            {message}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  );
}
