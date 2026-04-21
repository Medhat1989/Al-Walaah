import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Send, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

const ServiceRequest = () => {
  const { t, i18n } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="liquid-glass p-12 rounded-[40px] max-w-lg w-full text-center"
        >
          <div className="w-20 h-20 bg-safety-red/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} className="text-safety-red" />
          </div>
          <h2 className="font-display text-4xl font-bold mb-4 text-slate-900">Request Received</h2>
          <p className="text-slate-500 mb-8">
            Thank you for choosing Alwaalah. Our technical team will review your request and contact you within 24 hours.
          </p>
          <Link to="/">
            <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:scale-105 transition-transform">
              {t('request.back')}
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-40 md:pt-48 pb-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className={`absolute top-1/4 ${i18n.language === 'ar' ? '-right-20' : '-left-20'} w-96 h-96 bg-safety-red/5 blur-[120px] rounded-full`} />
      <div className={`absolute bottom-1/4 ${i18n.language === 'ar' ? '-left-20' : '-right-20'} w-96 h-96 bg-security-blue/5 blur-[120px] rounded-full`} />

      <div className="max-w-4xl mx-auto relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 mb-12 transition-colors group">
          <ArrowLeft size={20} className={`transition-transform ${i18n.language === 'ar' ? 'rotate-180 group-hover:translate-x-1' : 'group-hover:-translate-x-1'}`} />
          {t('request.back')}
        </Link>

        <div className="mb-12 text-slate-900">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            {t('request.title')} <br />
            <span className="text-gradient-red">{t('request.subtitle')}</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl">
            {t('request.description')}
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="liquid-glass p-8 md:p-12 rounded-[40px] shadow-xl border border-black/5"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className={`text-xs font-bold uppercase tracking-widest text-slate-400 ${i18n.language === 'ar' ? 'mr-1' : 'ml-1'}`}>{t('request.form.company')}</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-black/5 border border-black/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-safety-red transition-colors text-slate-900 placeholder:text-slate-300" 
                  placeholder={t('request.form.placeholders.company')} 
                />
              </div>
              <div className="space-y-3">
                <label className={`text-xs font-bold uppercase tracking-widest text-slate-400 ${i18n.language === 'ar' ? 'mr-1' : 'ml-1'}`}>{t('request.form.contactPerson')}</label>
                <input 
                  required
                  type="text" 
                  className="w-full bg-black/5 border border-black/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-safety-red transition-colors text-slate-900 placeholder:text-slate-300" 
                  placeholder={t('request.form.placeholders.name')} 
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className={`text-xs font-bold uppercase tracking-widest text-slate-400 ${i18n.language === 'ar' ? 'mr-1' : 'ml-1'}`}>{t('request.form.email')}</label>
                <input 
                  required
                  type="email" 
                  className="w-full bg-black/5 border border-black/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-safety-red transition-colors text-slate-900 placeholder:text-slate-300" 
                  placeholder={t('request.form.placeholders.email')} 
                />
              </div>
              <div className="space-y-3">
                <label className={`text-xs font-bold uppercase tracking-widest text-slate-400 ${i18n.language === 'ar' ? 'mr-1' : 'ml-1'}`}>{t('request.form.phone')}</label>
                <input 
                  required
                  type="tel" 
                  className="w-full bg-black/5 border border-black/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-safety-red transition-colors text-slate-900 placeholder:text-slate-300" 
                  placeholder={t('request.form.placeholders.phone')} 
                  dir="ltr"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className={`text-xs font-bold uppercase tracking-widest text-slate-400 ${i18n.language === 'ar' ? 'mr-1' : 'ml-1'}`}>{t('request.form.serviceType')}</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  t('services.items.alarm.title'),
                  t('services.items.surveillance.title'),
                  t('services.items.permits.title'),
                  t('services.items.extinguishing.title'),
                  t('services.items.alarm.title'),
                  t('services.items.integration.title')
                ].map((service, idx) => (
                  <label key={`${service}-${idx}`} className="relative flex items-center gap-3 p-4 bg-black/5 border border-black/5 rounded-2xl cursor-pointer hover:bg-black/10 transition-colors text-slate-900">
                    <input type="checkbox" className="w-5 h-5 rounded-lg accent-safety-red" />
                    <span className="text-sm font-medium">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className={`text-xs font-bold uppercase tracking-widest text-slate-400 ${i18n.language === 'ar' ? 'mr-1' : 'ml-1'}`}>{t('request.form.details')}</label>
              <textarea 
                required
                rows={5} 
                className="w-full bg-black/5 border border-black/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-safety-red transition-colors text-slate-900 resize-none placeholder:text-slate-300" 
                placeholder={t('request.form.placeholders.details')}
              ></textarea>
            </div>

            <div className="flex items-center gap-4 p-6 bg-safety-red/5 border border-safety-red/10 rounded-2xl">
              <Shield className="text-safety-red shrink-0" size={24} />
              <p className="text-xs text-slate-500 leading-relaxed">
                {i18n.language === 'ar' 
                  ? 'من خلال تقديم هذا الطلب، فإنك توافق على سياسة الخصوصية الخاصة بنا. بياناتك مؤمنة بتشفير من الدرجة المؤسسية ولن يتم استخدامها إلا لمعالجة طلب الخدمة الخاص بك.'
                  : 'By submitting this request, you agree to our privacy policy. Your data is secured with enterprise-grade encryption and will only be used to process your service request.'}
              </p>
            </div>

            <button 
              type="submit"
              className="w-full bg-slate-900 text-white py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all active:scale-[0.98] shadow-xl shadow-black/10"
            >
              {t('request.form.submit')} <Send size={22} className={i18n.language === 'ar' ? 'rotate-180' : ''} />
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceRequest;
