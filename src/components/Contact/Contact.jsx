import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { sendContact } from '../../api';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      toast.error('Please fill in all fields!');
      return;
    }

    setLoading(true);
    try {
      const data = await sendContact(name, email, message);

      if (data.success) {
        toast.success('Message sent successfully! 🎉');
        setSubmitted(true);
      } else {
        toast.error(data.message || 'Failed to send message');
      }
    } catch (error) {
      toast.error('Server error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-16">
      <div className="max-w-5xl mx-auto flex gap-16 flex-wrap">

        <div className="flex-1 min-w-[260px]">
          <h1 className="text-4xl font-extrabold text-[#1a1a2e] mb-3">Get in Touch</h1>
          <p className="text-sm text-gray-400 leading-relaxed mb-10">
            Have a question or feedback about Safar Saathi? We'd love to hear from you.
          </p>

          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl">📧</span>
              <div>
                <p className="text-xs text-gray-400 mb-1">Email</p>
                <p className="text-sm font-semibold text-[#1a1a2e]">support@safarsaathi.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">📞</span>
              <div>
                <p className="text-xs text-gray-400 mb-1">Phone</p>
                <p className="text-sm font-semibold text-[#1a1a2e]">+91 98765 43210 , +91 9799931639</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">📍</span>
              <div>
                <p className="text-xs text-gray-400 mb-1">Address</p>
                <p className="text-sm font-semibold text-[#1a1a2e]">Udaipur, Rajasthan, India</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-2xl">🕐</span>
              <div>
                <p className="text-xs text-gray-400 mb-1">Working Hours</p>
                <p className="text-sm font-semibold text-[#1a1a2e]">Mon - Sat, 9AM to 6PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 min-w-[300px] bg-white rounded-2xl p-10 shadow-md self-start">
          {submitted ? (
            <div className="text-center py-10">
              <span className="text-5xl block mb-4">✅</span>
              <h3 className="text-2xl font-bold text-[#1a1a2e] mb-2">Message Sent!</h3>
              <p className="text-sm text-gray-400 mb-6">
                Thank you for reaching out. We'll get back to you soon.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="w-full py-3 bg-[#1a1a2e] text-white rounded-lg font-semibold hover:bg-[#f5a623] transition-colors cursor-pointer"
              >
                Send Another
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold text-[#1a1a2e] mb-6">Send us a Message</h2>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#f5a623] transition-colors"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#f5a623] transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#f5a623] transition-colors resize-vertical font-sans"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 bg-[#1a1a2e] text-white rounded-lg font-semibold hover:bg-[#f5a623] transition-colors cursor-pointer disabled:opacity-60"
              >
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;