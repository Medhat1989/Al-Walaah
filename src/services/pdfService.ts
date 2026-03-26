import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

interface QuotationItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface QuotationData {
  date: string;
  engineerName: string;
  clientName: string;
  clientPhone: string;
  projectName: string;
  quotationNumber: string;
  referenceNumber: string;
  projectLocation: string;
  items: QuotationItem[];
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
}

export const generateQuotationPDF = (data: QuotationData) => {
  const doc = new jsPDF();
  const darkRed = [120, 20, 20];
  
  // Helper for red background pages
  const addRedPage = () => {
    doc.setFillColor(darkRed[0], darkRed[1], darkRed[2]);
    doc.rect(0, 0, 210, 297, 'F');
    
    // Add subtle wavy lines (approximation)
    doc.setDrawColor(255, 255, 255, 0.1);
    for (let i = 0; i < 300; i += 10) {
      doc.line(0, i, 210, i + 20);
    }
  };

  // Page 1: Cover
  addRedPage();
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(40);
  doc.setFont('helvetica', 'bold');
  doc.text('AL-Walah', 105, 130, { align: 'center' });
  doc.setFontSize(50);
  doc.text('الوعله', 105, 110, { align: 'center' });
  
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(1);
  doc.line(105, 100, 105, 140);

  doc.setFontSize(22);
  doc.text('عرض سعر مقدم من شركة الوعلة', 105, 180, { align: 'center' });
  doc.text('للأمن والسلامة', 105, 195, { align: 'center' });
  
  doc.setFontSize(30);
  doc.text('2026', 105, 230, { align: 'center' });

  // Page 2: Offer Letter
  doc.addPage();
  addRedPage();
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(30);
  doc.text('خطاب عرض سعر', 105, 30, { align: 'center' });
  doc.setLineWidth(2);
  doc.line(80, 35, 130, 35);

  doc.setFontSize(12);
  const letterText = `نتقدم إليكم نحن شركة الوعلة للأمن والسلامة بخالص الشكر والتقدير على إتاحة الفرصة لنا لتقديم عرض سعر لتوريد وتركيب أنظمة الأمن والسلامة. من خلال هذا العرض، نستعرض كامل خبراتنا الفنية وكفاءاتنا المتخصصة وآلية العمل المعتمدة لدينا في تنفيذ مشاريع الحماية والوقاية، بما يضمن أعلى مستويات الجودة والالتزام بمعايير الدفاع المدني. نحن في شركة الوعلة للأمن والسلامة نؤمن بأهمية الشراكة المستدامة وتقديم حلول أمنية وسلامة متكاملة تتوافق مع تطلعات عملائنا الكرام، ويسرنا أن نضع بين أيديكم هذا العرض وكلنا ثقة بقدرتنا على تقديم خدمات عالية الكفاءة تحقق رضاكم وتلبي توقعاتكم.`;
  
  doc.text(doc.splitTextToSize(letterText, 160), 105, 60, { align: 'center' });

  doc.setFontSize(24);
  doc.text('رؤيتنا', 105, 140, { align: 'center' });
  doc.line(95, 145, 115, 145);

  const visionText = `نسعى في شركة الوعلة للأمن والسلامة إلى أن نكون الشريك الأول الموثوق في مجال أنظمة الأمن والسلامة على مستوى المملكة، من خلال تقديم حلول متكاملة وفعالة تسهم في حماية الأرواح والممتلكات ورفع معايير السلامة في المنشآت السكنية، التجارية، والصناعية. نؤمن بأن الأمن والسلامة أساس التنمية والاستقرار، ولذلك نلتزم بتطبيق أحدث المواصفات الفنية المعتمدة من الدفاع المدني وتوظيف التقنيات الذكية لضمان أعلى مستويات الوقاية والاستجابة السريعة.`;
  doc.text(doc.splitTextToSize(visionText, 160), 105, 160, { align: 'center' });

  // Page 3: Table Header & Details
  doc.addPage();
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(20);
  doc.text('جدول عرض السعر', 105, 20, { align: 'center' });

  doc.setFontSize(10);
  // Grid for details
  doc.rect(20, 30, 170, 40);
  doc.line(20, 40, 190, 40);
  doc.line(20, 50, 190, 50);
  doc.line(20, 60, 190, 60);
  doc.line(105, 30, 105, 70);

  doc.text(`التاريخ: ${data.date}`, 25, 37);
  doc.text(`اسم المهندس: ${data.engineerName}`, 110, 37);
  
  doc.text(`اسم العميل: ${data.clientName}`, 25, 47);
  doc.text(`رقم الجوال: ${data.clientPhone}`, 110, 47);
  
  doc.text(`اسم المشروع: ${data.projectName}`, 25, 57);
  
  doc.text(`رقم العرض: ${data.quotationNumber}`, 25, 67);
  doc.text(`الرقم المرجعي: ${data.referenceNumber}`, 110, 67);

  // Table
  (doc as any).autoTable({
    startY: 75,
    head: [['الرقم', 'البيان (وصف الخدمة / المنتج)', 'الكمية', 'سعر الوحدة', 'الإجمالي']],
    body: data.items.map((item, index) => [
      index + 1,
      item.description,
      item.quantity,
      item.unitPrice.toLocaleString(),
      item.total.toLocaleString()
    ]),
    theme: 'grid',
    headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255], halign: 'center' },
    styles: { font: 'helvetica', halign: 'right' },
    columnStyles: {
      0: { halign: 'center' },
      1: { halign: 'right' }
    }
  });

  let finalY = (doc as any).lastAutoTable.finalY + 10;
  
  // Summary box
  doc.rect(120, finalY, 70, 30);
  doc.line(120, finalY + 10, 190, finalY + 10);
  doc.line(120, finalY + 20, 190, finalY + 20);
  
  doc.text(`السعر الكلي: ${data.subtotal.toLocaleString()} ريال`, 125, finalY + 7);
  doc.text(`الضريبة (15%): ${data.vatAmount.toLocaleString()} ريال`, 125, finalY + 17);
  doc.setFont('helvetica', 'bold');
  doc.text(`المبلغ الإجمالي: ${data.totalAmount.toLocaleString()} ريال`, 125, finalY + 27);

  // Page 5: Bank Details
  doc.addPage();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('بيانات الحسابات البنكية', 105, 20, { align: 'center' });

  doc.rect(20, 30, 170, 80);
  doc.setFontSize(12);
  doc.text('مصرف الراجحي', 40, 45);
  doc.setFont('helvetica', 'normal');
  doc.text('اسم الحساب: شركة الوعلة للأمن والسلامة', 40, 55);
  doc.text('IBAN: SA5080000513608016292666', 40, 65);

  doc.line(20, 75, 190, 75);

  doc.setFont('helvetica', 'bold');
  doc.text('مصرف الإنماء', 40, 90);
  doc.setFont('helvetica', 'normal');
  doc.text('اسم الحساب: شركة الوعلة للأمن والسلامة', 40, 100);
  doc.text('IBAN: SA2205000068207064190000', 40, 110);

  doc.setFont('helvetica', 'bold');
  doc.text('ملاحظات إضافية شروط وأحكام', 20, 130);
  doc.setFont('helvetica', 'normal');
  doc.text('عرض السعر غير شامل السقالات او اعمال الرفع ان وجدت', 20, 140);
  doc.text('يتم التنفيذ بعد اعتماد عرض السعر وتوقيع العقد بأسبوع', 20, 147);

  // Page 6: General Terms
  doc.addPage();
  addRedPage();
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('الشروط العامة للعرض', 105, 30, { align: 'center' });

  doc.setFontSize(10);
  const terms = [
    { title: "01 مدة سريان العرض", text: "يسري هذا العرض لمدة (30) يوم من تاريخ إصداره. وتعتبر لاغية بعد انتهاء المدة ما لم يتم تجديده رسمياً بطلب خطي من العميل." },
    { title: "02 مدة التنفيذ والتسليم", text: "تلتزم الشركة بتنفيذ وتسليم الأعمال خلال المدة المحددة في الاتفاق النهائي بعد توقيع العقد واستلام الدفعة المقدمة." },
    { title: "03 المسؤولية وضمان الجودة", text: "تتحمل شركة الوعلة للأمن والسلامة كامل المسؤولية الفنية عن جودة التركيب ودقة التنفيذ خلال فترة الضمان." },
    { title: "04 شروط القوة القاهرة والإلغاء", text: "لا تتحمل الشركة أي مسؤولية عن التأخير أو التعطل الناتج عن ظروف خارجة عن الإرادة مثل الكوارث الطبيعية." },
    { title: "05 شروط الدفع", text: "تُحدد آلية الدفع حسب الاتفاق النهائي بين الطرفين، وتكون على مراحل متفق عليها مسبقاً." },
    { title: "06 التعديلات أو الأعمال الإضافية", text: "أي أعمال إضافية أو تعديلات تتطلب بعد اعتماد العرض الرسمي يتم تقييمها وتقديم عرض سعر منفصل بها." }
  ];

  terms.forEach((term, i) => {
    const y = 50 + (i * 35);
    doc.setFont('helvetica', 'bold');
    doc.text(term.title, 20, y);
    doc.setFont('helvetica', 'normal');
    doc.text(doc.splitTextToSize(term.text, 170), 20, y + 7);
  });

  // Page 7: Back Cover
  doc.addPage();
  addRedPage();
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  const closing = "نتقدم إليكم بخالص الشكر والتقدير على ثقتكم ب شركة الوعلة للأمن والسلامة، ويسرنا أن نضع خبراتنا وإمكاناتنا الفنية بين أيديكم لتقديم حلول متكاملة في مجال أنظمة الأمن والسلامة وفق أعلى معايير الجودة والاعتماد.";
  doc.text(doc.splitTextToSize(closing, 160), 105, 60, { align: 'center' });

  doc.setFontSize(30);
  doc.text('AL-Walah', 105, 140, { align: 'center' });
  doc.setFontSize(40);
  doc.text('الوعله', 105, 120, { align: 'center' });

  doc.setFontSize(12);
  doc.text('نسعد بتواصلكم معنا', 105, 200, { align: 'center' });
  doc.text('055 333 2891 - 053 333 9660', 105, 215, { align: 'center' });
  doc.text('Al-Waala Company for Security and Safety Systems 2nd floor, Office', 105, 230, { align: 'center' });

  doc.save(`Quotation_${data.quotationNumber}.pdf`);
};
