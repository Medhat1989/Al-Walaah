import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Download, Save, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { generateQuotationPDF } from '../services/pdfService';

interface QuotationItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface QuotationFormProps {
  initialData?: any;
  onSave: (data: any) => void;
  onCancel: () => void;
}

const QuotationForm: React.FC<QuotationFormProps> = ({ initialData, onSave, onCancel }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    date: format(new Date(), 'yyyy-MM-dd'),
    engineerName: '',
    clientName: '',
    clientPhone: '',
    projectName: '',
    quotationNumber: `QT-${format(new Date(), 'yyyy')}-${Math.floor(1000 + Math.random() * 9000)}`,
    referenceNumber: '',
    projectLocation: '',
    items: [{ description: '', quantity: 1, unitPrice: 0, total: 0 }],
    status: 'draft'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleItemChange = (index: number, field: keyof QuotationItem, value: any) => {
    const newItems = [...formData.items];
    const item = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'unitPrice') {
      item.total = item.quantity * item.unitPrice;
    }
    
    newItems[index] = item;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: 1, unitPrice: 0, total: 0 }]
    });
  };

  const removeItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
  const vatAmount = subtotal * 0.15;
  const totalAmount = subtotal + vatAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      subtotal,
      vatAmount,
      totalAmount,
      updatedAt: new Date().toISOString()
    });
  };

  const handleDownload = () => {
    generateQuotationPDF({
      ...formData,
      subtotal,
      vatAmount,
      totalAmount
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onCancel} className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
          <ArrowLeft size={20} /> {t('quotation.back')}
        </button>
        <h2 className="text-2xl font-bold text-black">{t('quotation.title')}</h2>
        <div className="flex gap-4">
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 bg-gray-100 text-black px-4 py-2 rounded-xl hover:bg-gray-200 transition-all"
          >
            <Download size={18} /> {t('quotation.download')}
          </button>
          <button 
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-safety-red text-white px-6 py-2 rounded-xl hover:bg-safety-red/90 transition-all"
          >
            <Save size={18} /> {t('quotation.save')}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('quotation.date')}</label>
            <input 
              type="date" 
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-safety-red"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('quotation.engineer')}</label>
            <input 
              type="text" 
              value={formData.engineerName}
              onChange={(e) => setFormData({ ...formData, engineerName: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-safety-red"
              placeholder={t('quotation.placeholders.engineer')}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('quotation.number')}</label>
            <input 
              type="text" 
              value={formData.quotationNumber}
              onChange={(e) => setFormData({ ...formData, quotationNumber: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-safety-red"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('quotation.refNum')}</label>
            <input 
              type="text" 
              value={formData.referenceNumber}
              onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-safety-red"
              placeholder="00101"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('quotation.client')}</label>
            <input 
              type="text" 
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-safety-red"
              placeholder={t('quotation.placeholders.client')}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('quotation.phone')}</label>
            <input 
              type="text" 
              value={formData.clientPhone}
              onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-safety-red"
              placeholder={t('quotation.placeholders.phone')}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('quotation.project')}</label>
            <input 
              type="text" 
              value={formData.projectName}
              onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-safety-red"
              placeholder={t('quotation.placeholders.project')}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">{t('quotation.location')}</label>
            <input 
              type="text" 
              value={formData.projectLocation}
              onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-safety-red"
              placeholder={t('quotation.placeholders.location')}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">{t('quotation.items')}</h3>
            <button 
              type="button"
              onClick={addItem}
              className="flex items-center gap-2 text-safety-red font-bold hover:bg-safety-red/5 px-4 py-2 rounded-xl transition-all"
            >
              <Plus size={18} /> {t('quotation.addItem')}
            </button>
          </div>

          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={index} className="grid md:grid-cols-12 gap-4 items-end bg-gray-50 p-4 rounded-2xl">
                <div className="md:col-span-6 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t('quotation.description')}</label>
                  <input 
                    type="text" 
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-safety-red"
                    placeholder={t('quotation.placeholders.itemDescription')}
                  />
                </div>
                <div className="md:col-span-1 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t('quotation.qty')}</label>
                  <input 
                    type="number" 
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-safety-red"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t('quotation.unitPrice')}</label>
                  <input 
                    type="number" 
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:border-safety-red"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{t('quotation.total')}</label>
                  <div className="w-full bg-gray-100 rounded-xl px-4 py-2 font-bold">
                    {item.total.toLocaleString()}
                  </div>
                </div>
                <div className="md:col-span-1">
                  <button 
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 text-gray-400 hover:text-safety-red transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-gray-100">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-gray-500">
              <span>{t('quotation.subtotal')}</span>
              <span>{subtotal.toLocaleString()} SAR</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>{t('quotation.vat')}</span>
              <span>{vatAmount.toLocaleString()} SAR</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-3 border-t border-gray-100">
              <span>{t('quotation.grandTotal')}</span>
              <span>{totalAmount.toLocaleString()} SAR</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuotationForm;
