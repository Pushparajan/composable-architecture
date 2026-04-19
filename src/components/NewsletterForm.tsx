import React, { useState } from 'react';

type NewsletterFormProps = {
  layout?: 'horizontal' | 'vertical';
  className?: string;
};

const NewsletterForm = ({
  layout = 'vertical',
  className = '',
}: NewsletterFormProps) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`text-green-600 font-medium ${className}`}>{message}</div>
    );
  }

  const isHorizontal = layout === 'horizontal';

  return (
    <form
      onSubmit={handleSubmit}
      className={`${isHorizontal ? 'flex gap-2' : 'space-y-3'} ${className}`}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email address"
        required
        className={`px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent ${
          isHorizontal ? 'flex-1' : 'w-full'
        }`}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-6 py-2 bg-accent text-white font-medium rounded-md hover:bg-accent/90 transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="text-red-500 text-sm mt-2">{message}</p>
      )}
    </form>
  );
};

export { NewsletterForm };
