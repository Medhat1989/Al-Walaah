import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Lock, Mail, ArrowLeft, Loader2, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithEmail, signInWithGoogle } from '../firebase';

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isArabic = i18n.language === 'ar';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await loginWithEmail(email, password);
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      setError(t('login.error'));
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-safety-red/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-security-blue/10 blur-[120px] rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <ArrowLeft size={20} className={isArabic ? 'rotate-180' : ''} />
            {t('quotation.back')}
          </Link>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-xs font-bold bg-white/5 border border-white/10 px-3 py-2 rounded-xl hover:bg-white/10 transition-all text-white"
          >
            <Globe size={14} />
            {isArabic ? 'English' : 'العربية'}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass p-8 md:p-10 rounded-[32px] border border-white/10 shadow-2xl"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-safety-red rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-safety-red/20">
              <Lock size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-display font-bold text-white text-center">{t('login.title')}</h1>
            <p className="text-white/40 text-center mt-2">{t('login.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 px-1">{t('login.email')}</label>
              <div className="relative">
                <Mail className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-4' : 'left-4'} text-white/20`} size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 ${isArabic ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white focus:outline-none focus:border-safety-red transition-colors`}
                  placeholder="alwalah@gmail.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-white/40 px-1">{t('login.password')}</label>
              <div className="relative">
                <Lock className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-4' : 'left-4'} text-white/20`} size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4 ${isArabic ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-white focus:outline-none focus:border-safety-red transition-colors`}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm p-4 rounded-xl text-center"
              >
                {error}
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black py-5 rounded-2xl font-bold text-lg hover:bg-white/90 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : t('login.submit')}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black px-2 text-white/40">{t('login.or')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                try {
                  await signInWithGoogle();
                  navigate('/admin');
                } catch (err) {
                  console.error(err);
                }
              }}
              className="w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            >
              <Globe size={20} />
              {t('login.google')}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
