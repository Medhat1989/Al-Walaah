import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface QuotationItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface QuotationData {
  quotationNumber: string;
  referenceNumber: string;
  date: string;
  clientName: string;
  clientPhone: string;
  projectName: string;
  engineerName: string;
  items: QuotationItem[];
  subtotal: number;
  vatAmount: number;
  totalAmount: number;
}

export const generateQuotationPDF = async (data: QuotationData) => {
  try {
    // Create a container for the PDF content
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '1000px'; 
    container.style.background = '#ffffff';
    container.style.direction = 'rtl';
    container.id = 'temp-pdf-container';
    
    container.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&family=Amiri:wght@400;700&display=swap');
        
        #temp-export-root {
          font-family: 'Cairo', sans-serif !important;
          background: #ffffff;
          width: 1000px;
        }
        #temp-export-root * {
          color-scheme: light !important;
          -webkit-print-color-adjust: exact !important;
          color: #000000 !important;
          box-sizing: border-box;
          font-family: 'Cairo', sans-serif !important;
        }
        .pdf-page {
          height: 1414px;
          width: 1000px;
          overflow: hidden;
          background: #ffffff;
          position: relative;
        }
        h1, h2, h3, h4, .cover-title {
          margin: 0;
          padding: 0;
        }
        .cover-title {
          font-family: 'Amiri', serif !important;
          font-weight: 700;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          border: 1px solid #dddddd;
          padding: 12px;
          text-align: center;
        }
      </style>
      <div id="temp-export-root">
        <!-- Page 1: Cover -->
        <div class="pdf-page" style="background: #300101 !important; color: #ffffff !important; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60px;">
          <div style="position: absolute; inset: 0; opacity: 0.1; background-image: radial-gradient(#ffffff 1px, transparent 1px); background-size: 40px 40px;"></div>
          <div style="position: absolute; top: 80px; right: 80px;">
            <img src="https://i.ibb.co/gMdvBHXb/Whats-App-Image-2026-04-21-at-11-22-56-PM-removebg-preview.png" style="height: 150px; object-fit: contain;" />
          </div>
          <div style="position: relative; z-index: 1;">
            <h1 class="cover-title" style="font-size: 130px; color: #ffffff !important;">عرض أسعار</h1>
            <h2 style="font-size: 80px; color: #ffffff !important; margin-top: 20px; font-weight: 700;">شركة الوعلة</h2>
            <div style="width: 400px; height: 4px; background: #ffffff !important; margin: 40px auto; border-radius: 2px; opacity: 0.4;"></div>
            <h3 style="font-size: 48px; color: #ffffff !important; opacity: 0.9; font-weight: 400;">للأمن والسلامة</h3>
            <div style="margin-top: 120px; font-size: 48px; color: #ffffff !important; opacity: 0.6; font-weight: 300;">2026</div>
          </div>
        </div>

        <!-- Page 2: Letter & Vision -->
        <div class="pdf-page" style="padding: 120px 100px; display: flex; flex-direction: column; gap: 80px;">
          <div style="text-align: center;">
            <h2 style="font-size: 56px; color: #300101 !important; border-bottom: 5px solid #300101; display: inline-block; font-weight: 700; margin-bottom: 40px;">خطاب عرض سعر</h2>
            <p style="font-size: 26px; line-height: 1.8; text-align: justify; color: #1a1a1a !important;">
              نتقدم إليكم نحن شركة الوعلة للأمن والسلامة بخالص الشكر والتقدير على إتاحة الفرصة لنا لتقديم عرض سعر لتوريد وتركيب أنظمة الأمن والسلامة. من خلال هذا العرض، نستعرض كامل خبراتنا الفنية وكفاءاتنا المتخصصة وآلية العمل المعتمدة لدينا في تنفيذ مشاريع الحماية والوقاية، بما يضمن أعلى مستويات الجودة والالتزام بمعايير الدفاع المدني. نحن في شركة الوعلة للأمن والسلامة نؤمن بأهمية الشراكة المستدامة وتقديم حلول أمنية وسلامة متكاملة تتوافق مع تطلعات عملائنا الكرام، ويسرنا أن نضع بين أيديكم هذا العرض وكلنا ثقة بقدرتنا على تقديم خدمات عالية الكفاءة تحقق رضاكم وتلبي توقعاتكم.
            </p>
          </div>
          <div style="text-align: center;">
            <h2 style="font-size: 56px; color: #300101 !important; border-bottom: 5px solid #300101; display: inline-block; font-weight: 700; margin-bottom: 40px;">رؤيتنا</h2>
            <p style="font-size: 26px; line-height: 1.8; text-align: justify; color: #1a1a1a !important;">
              نسعى في شركة الوعلة للأمن والسلامة إلى أن نكون الشريك الأول الموثوق في مجال أنظمة الأمن والسلامة على مستوى المملكة، من خلال تقديم حلول متكاملة وفعالة تسهم في حماية الأرواح والممتلكات ورفع معايير السلامة في المنشآت السكنية، التجارية، والصناعية. نؤمن بأن الأمن والسلامة أساس التنمية والاستقرار، ولذلك نلتزم بتطبيق أحدث المواصفات الفنية المعتمدة من الدفاع المدني وتوظيف التقنيات الذكية لضمان أعلى مستويات الوقاية والاستجابة السريعة.
            </p>
          </div>
        </div>

        <!-- Page 3: Quotation Details Table -->
        <div class="pdf-page" style="padding: 80px;">
          <h2 style="font-size: 52px; text-align: center; color: #300101 !important; margin-bottom: 50px; font-weight: 700;">جدول عرض السعر</h2>
          
          <table style="margin-bottom: 40px; font-size: 20px;">
            <tr>
              <td style="background: #f8f8f8 !important; font-weight: 700; width: 20%;">التاريخ</td>
              <td style="width: 30%;">${data.date}</td>
              <td style="background: #f8f8f8 !important; font-weight: 700; width: 20%;">اسم المهندس</td>
              <td style="width: 30%;">${data.engineerName}</td>
            </tr>
            <tr>
              <td style="background: #f8f8f8 !important; font-weight: 700;">اسم العميل</td>
              <td>${data.clientName}</td>
              <td style="background: #f8f8f8 !important; font-weight: 700;">رقم الجوال</td>
              <td>${data.clientPhone}</td>
            </tr>
            <tr>
              <td style="background: #f8f8f8 !important; font-weight: 700;">اسم المشروع</td>
              <td colspan="3">${data.projectName}</td>
            </tr>
            <tr>
              <td style="background: #f8f8f8 !important; font-weight: 700;">رقم العرض</td>
              <td>${data.quotationNumber}</td>
              <td style="background: #f8f8f8 !important; font-weight: 700;">الرقم المرجعي</td>
              <td>${data.referenceNumber}</td>
            </tr>
          </table>

          <table style="font-size: 18px;">
            <thead>
              <tr style="background: #300101 !important; color: #ffffff !important;">
                <th style="width: 60px; color: #ffffff !important;">#</th>
                <th style="text-align: right; color: #ffffff !important;">البيان (وصف الخدمة / المنتج)</th>
                <th style="width: 80px; color: #ffffff !important;">الكمية</th>
                <th style="width: 140px; color: #ffffff !important;">سعر الوحدة</th>
                <th style="width: 140px; color: #ffffff !important;">الإجمالي</th>
              </tr>
            </thead>
            <tbody>
              ${(data.items || []).map((item, index) => `
                <tr style="background: ${index % 2 === 0 ? '#ffffff' : '#f9f9f9'}">
                  <td>${index + 1}</td>
                  <td style="text-align: right;">${item.description}</td>
                  <td>${item.quantity}</td>
                  <td style="text-align: left;">${(item.unitPrice || 0).toLocaleString()}</td>
                  <td style="text-align: left; font-weight: 700;">${(item.total || 0).toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div style="margin-top: 40px; display: flex; flex-direction: column; align-items: flex-end;">
            <div style="width: 350px; border-top: 3px solid #300101; padding-top: 20px;">
              <div style="display: flex; justify-content: space-between; padding: 5px 0; font-size: 20px;">
                <span>السعر الكلي:</span>
                <span>${(data.subtotal || 0).toLocaleString()} ريال</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 5px 0; font-size: 20px;">
                <span>الضريبة (15%):</span>
                <span>${(data.vatAmount || 0).toLocaleString()} ريال</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 15px 0; font-weight: 700; font-size: 30px; color: #300101;">
                <span>الإجمالي:</span>
                <span>${(data.totalAmount || 0).toLocaleString()} ريال</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Page 4: Bank & Terms -->
        <div class="pdf-page" style="padding: 80px;">
          <h2 style="font-size: 36px; color: #300101 !important; border-right: 8px solid #300101; padding-right: 20px; margin-bottom: 30px; font-weight: 700;">بيانات الحسابات البنكية</h2>
          <div style="background: #fbfbfb !important; border: 1px solid #eeeeee; border-radius: 15px; padding: 40px; margin-bottom: 50px;">
            <div style="margin-bottom: 30px;">
              <h3 style="color: #300101; font-size: 26px; margin-bottom: 10px;">مصرف الراجحي</h3>
              <p style="font-size: 20px; margin: 5px 0;"><strong>IBAN:</strong> SA5080000513608016292666</p>
            </div>
            <div style="border-top: 1px solid #eee; padding-top: 20px;">
              <h3 style="color: #300101; font-size: 26px; margin-bottom: 10px;">مصرف الإنماء</h3>
              <p style="font-size: 20px; margin: 5px 0;"><strong>IBAN:</strong> SA2205000068207064190000</p>
            </div>
          </div>
          <h2 style="font-size: 36px; color: #300101 !important; border-right: 8px solid #300101; padding-right: 20px; margin-bottom: 30px; font-weight: 700;">ملاحظات إضافية وشروط</h2>
          <ul style="padding-right: 40px; font-size: 20px; line-height: 1.8; color: #333333 !important;">
            <li>عرض السعر غير شامل السقالات أو أعمال الرفع إن وجدت.</li>
            <li>يتم التنفيذ بعد اعتماد عرض السعر وتوقيع العقد بمدة لا تتجاوز أسبوع.</li>
            <li>الضمان يشمل سوء المصنعية ولا يشمل سوء الاستخدام أو الكوارث الطبيعية.</li>
            <li>الأسعار سارية لمدة 30 يوماً من تاريخ العرض.</li>
          </ul>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    // Wait for fonts and images to load
    await new Promise(resolve => setTimeout(resolve, 2000));

    const canvas = await html2canvas(container, {
      scale: 1.5,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      onclone: (clonedDoc) => {
        const styles = clonedDoc.getElementsByTagName('style');
        for (let i = 0; i < styles.length; i++) {
          if (styles[i].textContent?.includes('oklch')) {
            styles[i].remove();
            i--;
          }
        }
        const exportRoot = clonedDoc.getElementById('temp-export-root');
        if (exportRoot) {
          exportRoot.style.position = 'static';
          exportRoot.style.left = '0';
        }
      }
    });

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    
    const pagePixelHeight = 1414;
    const numPages = 4;

    for (let i = 0; i < numPages; i++) {
      if (i > 0) pdf.addPage();
      
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = (pagePixelHeight / container.offsetHeight) * canvas.height;
      
      const ctx = pageCanvas.getContext('2d');
      if (ctx) {
        const sliceY = (i * pagePixelHeight / container.offsetHeight) * canvas.height;
        ctx.drawImage(
          canvas, 
          0, sliceY, canvas.width, pageCanvas.height, 
          0, 0, pageCanvas.width, pageCanvas.height
        );
      }
      
      const pageImgData = pageCanvas.toDataURL('image/jpeg', 0.95);
      pdf.addImage(pageImgData, 'JPEG', 0, 0, pageWidth, pageHeight);
    }

    pdf.save(`Quotation_${data.quotationNumber}.pdf`);
    document.body.removeChild(container);
  } catch (error) {
    console.error('Error generating high-end PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};
