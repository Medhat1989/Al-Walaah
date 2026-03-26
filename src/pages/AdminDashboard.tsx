import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth, logout } from '../firebase';
import { Plus, Search, FileText, Edit, Trash2, LogOut, Download } from 'lucide-react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import QuotationForm from '../components/QuotationForm';
import { generateQuotationPDF } from '../services/pdfService';

const AdminDashboard = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [quotations, setQuotations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuotation, setCurrentQuotation] = useState<any>(null);

  useEffect(() => {
    const q = query(collection(db, 'quotations'), orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuotations(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async (data: any) => {
    try {
      if (currentQuotation?.id) {
        await updateDoc(doc(db, 'quotations', currentQuotation.id), data);
      } else {
        await addDoc(collection(db, 'quotations'), {
          ...data,
          createdAt: new Date().toISOString()
        });
      }
      setIsEditing(false);
      setCurrentQuotation(null);
    } catch (error) {
      console.error("Error saving quotation:", error);
      alert(t('quotation.saveError'));
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm(t('quotation.confirmDelete'))) {
      try {
        await deleteDoc(doc(db, 'quotations', id));
      } catch (error) {
        console.error("Error deleting quotation:", error);
        alert(t('quotation.deleteError'));
      }
    }
  };

  const filteredQuotations = quotations.filter(q => 
    q.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.quotationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6" dir={isArabic ? 'rtl' : 'ltr'}>
        <QuotationForm 
          initialData={currentQuotation}
          onSave={handleSave}
          onCancel={() => {
            setIsEditing(false);
            setCurrentQuotation(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Sidebar/Header */}
      <nav className="bg-black text-white px-8 py-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-safety-red rounded-xl flex items-center justify-center">
            <FileText size={24} />
          </div>
          <h1 className="text-xl font-bold">{t('quotation.adminTitle')}</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-sm text-white/50">
            {t('quotation.loggedInAs')} <span className="text-white font-medium">{auth.currentUser?.email}</span>
          </div>
          <button 
            onClick={() => logout()}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <LogOut size={18} /> {t('quotation.logout')}
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-black">{t('quotation.quotations')}</h2>
            <p className="text-gray-500">{t('quotation.manageDesc')}</p>
          </div>
          <button 
            onClick={() => {
              setCurrentQuotation(null);
              setIsEditing(true);
            }}
            className="flex items-center gap-2 bg-safety-red text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-safety-red/20 hover:scale-105 transition-all"
          >
            <Plus size={20} /> {t('quotation.createNew')}
          </button>
        </div>

        <div className="bg-white rounded-[32px] shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className={`absolute ${isArabic ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400`} size={20} />
              <input 
                type="text" 
                placeholder={t('quotation.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full bg-gray-50 rounded-2xl ${isArabic ? 'pr-12 pl-6' : 'pl-12 pr-6'} py-4 focus:outline-none focus:ring-2 focus:ring-safety-red/20 transition-all text-black`}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 text-xs font-bold uppercase tracking-widest text-gray-900">
                  <th className={`px-8 py-4 ${isArabic ? 'text-right' : 'text-left'}`}>{t('quotation.date')}</th>
                  <th className={`px-8 py-4 ${isArabic ? 'text-right' : 'text-left'}`}>{t('quotation.quotationNum')}</th>
                  <th className={`px-8 py-4 ${isArabic ? 'text-right' : 'text-left'}`}>{t('quotation.clientProject')}</th>
                  <th className={`px-8 py-4 ${isArabic ? 'text-right' : 'text-left'}`}>{t('quotation.amount')}</th>
                  <th className={`px-8 py-4 ${isArabic ? 'text-right' : 'text-left'}`}>{t('quotation.status')}</th>
                  <th className={`px-8 py-4 ${isArabic ? 'text-left' : 'text-right'}`}>{t('quotation.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-12 text-center text-gray-400">{t('quotation.loading')}</td>
                  </tr>
                ) : filteredQuotations.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-12 text-center text-gray-400">{t('quotation.noFound')}</td>
                  </tr>
                ) : (
                  filteredQuotations.map((q) => (
                    <tr key={q.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className={`px-8 py-6 text-sm ${isArabic ? 'text-right' : 'text-left'}`}>{format(new Date(q.date), 'MMM dd, yyyy')}</td>
                      <td className={`px-8 py-6 font-mono font-bold text-safety-red ${isArabic ? 'text-right' : 'text-left'}`}>{q.quotationNumber}</td>
                      <td className={`px-8 py-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                        <div className="font-bold">{q.clientName}</div>
                        <div className="text-xs text-gray-400">{q.projectName}</div>
                      </td>
                      <td className={`px-8 py-6 font-bold ${isArabic ? 'text-right' : 'text-left'}`}>{q.totalAmount.toLocaleString()} SAR</td>
                      <td className={`px-8 py-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          q.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                          q.status === 'sent' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {q.status}
                        </span>
                      </td>
                      <td className={`px-8 py-6 ${isArabic ? 'text-left' : 'text-right'}`}>
                        <div className={`flex items-center ${isArabic ? 'justify-start' : 'justify-end'} gap-2 opacity-0 group-hover:opacity-100 transition-opacity`}>
                          <button 
                            onClick={() => generateQuotationPDF(q)}
                            className="p-2 text-gray-400 hover:text-black transition-colors"
                            title={t('quotation.download')}
                          >
                            <Download size={18} />
                          </button>
                          <button 
                            onClick={() => {
                              setCurrentQuotation(q);
                              setIsEditing(true);
                            }}
                            className="p-2 text-gray-400 hover:text-safety-red transition-colors"
                            title={t('quotation.edit')}
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(q.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            title={t('quotation.delete')}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
