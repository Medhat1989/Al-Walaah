import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Lock, Mail, ArrowLeft, Loader2, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithEmail, signInWithGoogle, db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isArabic = i18n.language === 'ar';

  const ensureUserDoc = async (user: any) => {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      // Create user doc as employee by default, 
      // rules will allow alwalahalwalah10@gmail.com to be admin anyway
      await setDoc(userRef, {
        email: user.email,
        role: user.email === 'alwalahalwalah10@gmail.com' ? 'admin' : 'employee',
        name: user.displayName || user.email.split('@')[0],
        createdAt: new Date().toISOString()
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await loginWithEmail(email, password);
      await ensureUserDoc(result.user);
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      setError(t('login.error'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      await ensureUserDoc(result.user);
      navigate('/admin');
    } catch (err) {
      console.error(err);
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-6 relative overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-safety-red/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-security-blue/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors">
            <ArrowLeft size={20} className={isArabic ? 'rotate-180' : ''} />
            {t('quotation.back')}
          </Link>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-xs font-bold bg-black/5 border border-black/5 px-3 py-2 rounded-xl hover:bg-black/10 transition-all text-slate-700"
          >
            <Globe size={14} />
            {isArabic ? 'English' : 'العربية'}
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass p-8 md:p-10 rounded-[32px] shadow-xl border border-black/5"
        >
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-safety-red rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-safety-red/20 text-white">
              <Lock size={32} />
            </div>
            <h1 className="text-3xl font-display font-bold text-slate-900 text-center">{t('login.title')}</h1>
            <p className="text-slate-400 text-center mt-2">{t('login.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('login.email')}</label>
              <div className="relative">
                <Mail className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-4' : 'left-4'} text-slate-300`} size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-black/5 border border-black/5 rounded-2xl py-4 ${isArabic ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-slate-900 focus:outline-none focus:border-safety-red transition-colors placeholder:text-slate-300`}
                  placeholder="alwalah@gmail.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t('login.password')}</label>
              <div className="relative">
                <Lock className={`absolute top-1/2 -translate-y-1/2 ${isArabic ? 'right-4' : 'left-4'} text-slate-300`} size={20} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-black/5 border border-black/5 rounded-2xl py-4 ${isArabic ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-slate-900 focus:outline-none focus:border-safety-red transition-colors placeholder:text-slate-300`}
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
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin" /> : t('login.submit')}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#f8f9fa] px-2 text-slate-400">{t('login.or')}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-black/5 border border-black/5 text-slate-700 py-4 rounded-2xl font-bold hover:bg-black/10 transition-all flex items-center justify-center gap-3"
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
