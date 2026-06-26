import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    emailjs.init('CpsxAG905nKwjQQjO');
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
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

  const inputClass =
    'w-full rounded border border-slate-200/80 bg-white/60 px-4 py-3.5 text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:ring-4 focus:ring-brand-500/10 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100 dark:focus:border-brand-400 dark:focus:bg-slate-900 dark:focus:ring-brand-500/20';

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="glass-card p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-6">
        <h3 className="font-display text-xl font-bold text-slate-950 dark:text-white">Send a message</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">I'll respond within 24 hours.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            value={formState.name}
            onChange={(event) => setFormState({ ...formState, name: event.target.value })}
            className={inputClass}
            placeholder="Your name"
            type="text"
            disabled={loading}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            value={formState.email}
            onChange={(event) => setFormState({ ...formState, email: event.target.value })}
            className={inputClass}
            placeholder="you@email.com"
            type="email"
            disabled={loading}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            value={formState.message}
            onChange={(event) => setFormState({ ...formState, message: event.target.value })}
            className={`${inputClass} h-36 resize-none`}
            placeholder="Tell me about your project..."
            disabled={loading}
          />
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded p-4 text-sm font-medium ${
              status === 'success'
                ? 'border border-emerald-300/60 bg-emerald-50 text-emerald-800 dark:border-emerald-700/40 dark:bg-emerald-900/20 dark:text-emerald-200'
                : 'border border-red-300/60 bg-red-50 text-red-800 dark:border-red-700/40 dark:bg-red-900/20 dark:text-red-200'
            }`}
          >
            {message}
          </motion.div>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message →'
          )}
        </button>
      </div>
    </motion.form>
  );
}
