import { useState, useEffect, type FormEvent } from 'react';
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
    'w-full rounded border border-neutral-200 bg-white px-4 py-3.5 text-black outline-none transition-colors duration-200 placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black/10';

  return (
    <form onSubmit={handleSubmit} className="card p-8">
      <div className="mb-6">
        <h3 className="font-display text-xl font-bold text-black">Send a message</h3>
        <p className="mt-1 text-sm text-neutral-500">I'll respond within 24 hours.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-black" htmlFor="name">
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
          <label className="mb-2 block text-sm font-semibold text-black" htmlFor="email">
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
          <label className="mb-2 block text-sm font-semibold text-black" htmlFor="message">
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
          <div
            className={`rounded p-4 text-sm font-medium ${
              status === 'success'
                ? 'border border-neutral-300 bg-neutral-50 text-black'
                : 'border border-neutral-400 bg-neutral-100 text-black'
            }`}
          >
            {message}
          </div>
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
    </form>
  );
}
