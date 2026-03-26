import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        services: 'Services',
        about: 'About',
        projects: 'Projects',
        contact: 'Contact',
        callUs: 'Call Us',
        requestService: 'Request Service'
      },
      hero: {
        title1: 'PROTECTING',
        title2: 'WHAT MATTERS',
        title3: 'MOST.',
        description: 'Alwaalah provides cutting-edge fire safety and security integration across Saudi Arabia. From Civil Defense permits to AI-driven surveillance, we secure your future.',
        requestService: 'Request Service',
        ourServices: 'Our Services',
        experience: 'Years Experience',
        projects: 'Projects Done',
        compliance: 'Compliance',
        highTech: 'High Tech',
        fireSystem: 'fire system',
        secure: 'Secure',
        fastResponse: 'Fast Response'
      },
      services: {
        expertise: 'Our Expertise',
        title: 'COMPREHENSIVE SAFETY SOLUTIONS',
        description: 'We offer a full spectrum of fire protection and security services tailored to the unique needs of the Saudi market.',
        learnMore: 'Learn More',
        items: {
          permits: {
            title: 'Civil Defense Permits',
            description: 'Expert guidance and processing for all Saudi Civil Defense regulatory requirements and safety certificates.'
          },
          extinguishing: {
            title: 'Fire Extinguishing Systems',
            description: 'Design, installation, and maintenance of advanced water, foam, and gas-based suppression systems.'
          },
          alarm: {
            title: 'Fire Alarm Maintenance',
            description: '24/7 monitoring and preventive maintenance for early detection systems to ensure maximum reliability.'
          },
          surveillance: {
            title: 'Smart Surveillance',
            description: 'AI-powered CCTV and monitoring solutions providing real-time analytics and high-definition security.'
          },
          integration: {
            title: 'System Integration',
            description: 'Seamlessly connecting fire, security, and building management systems into a unified control interface.'
          },
          consultation: {
            title: 'Safety Consultations',
            description: 'Comprehensive risk assessments and strategic safety planning for commercial and industrial facilities.'
          }
        }
      },
      contact: {
        title: "Let's Secure Your Future Together.",
        description: 'Have a project in mind or need a safety consultation? Our team of experts is ready to assist you anywhere in the Kingdom.',
        callUs: 'Call Us',
        emailUs: 'Email Us',
        visitUs: 'Visit Us',
        form: {
          fullName: 'Full Name',
          email: 'Email Address',
          service: 'Service Needed',
          message: 'Message',
          send: 'Send Inquiry',
          placeholders: {
            name: 'John Doe',
            email: 'john@example.com',
            message: 'How can we help you?'
          },
          options: {
            permits: 'Civil Defense Permits',
            alarm: 'Fire Alarm Systems',
            surveillance: 'Smart Surveillance',
            other: 'Other'
          }
        }
      },
      footer: {
        description: "Saudi Arabia's premier fire safety and security systems provider. Dedicated to protecting lives and property through innovation and excellence.",
        quickLinks: 'Quick Links',
        services: 'Services',
        rights: 'All rights reserved.',
        designedBy: 'Website designed and developed by',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service'
      },
      request: {
        back: 'Back to Home',
        title: 'SERVICE',
        subtitle: 'REQUEST',
        description: 'Fill out the form below to request a professional safety consultation or technical service. Our experts are ready to assist you.',
        form: {
          company: 'Company Name',
          contactPerson: 'Contact Person',
          phone: 'Phone Number',
          email: 'Email Address',
          serviceType: 'Service Type',
          location: 'Project Location',
          details: 'Project Details / Requirements',
          submit: 'Submit Request',
          placeholders: {
            company: 'Your Organization',
            name: 'Full Name',
            phone: '+966 50 000 0000',
            email: 'name@company.com',
            location: 'City, District',
            details: 'Tell us more about your needs...'
          }
        }
      },
      quotation: {
        title: 'Quotation Editor',
        adminTitle: 'Staff Dashboard',
        quotations: 'Quotations',
        manageDesc: 'Manage and create price offers for your clients.',
        createNew: 'Create New Quotation',
        searchPlaceholder: 'Search by client, project or quotation number...',
        loading: 'Loading quotations...',
        noFound: 'No quotations found.',
        date: 'Date',
        quotationNum: 'Quotation #',
        refNum: 'Reference #',
        clientProject: 'Client / Project',
        amount: 'Amount',
        status: 'Status',
        actions: 'Actions',
        logout: 'Logout',
        loggedInAs: 'Logged in as:',
        confirmDelete: 'Are you sure you want to delete this quotation?',
        deleteError: 'Failed to delete. Admin permissions required.',
        saveError: 'Failed to save quotation. Check permissions.',
        back: 'Back',
        download: 'Download PDF',
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save Quotation',
        engineer: 'Engineer Name',
        number: 'Quotation Number',
        client: 'Client Name',
        phone: 'Client Phone',
        project: 'Project Name',
        location: 'Location',
        items: 'Items',
        addItem: 'Add Item',
        description: 'Description',
        qty: 'Qty',
        unitPrice: 'Unit Price',
        total: 'Total',
        subtotal: 'Subtotal',
        vat: 'VAT (15%)',
        grandTotal: 'Grand Total',
        placeholders: {
          engineer: 'Engineer Name',
          client: 'Client Name',
          phone: '05xxxxxxxx',
          project: 'Project Name',
          location: 'City',
          itemDescription: 'Item description'
        }
      },
      login: {
        title: 'Staff Portal',
        subtitle: 'Sign in to access the dashboard',
        email: 'Email Address',
        password: 'Password',
        submit: 'Sign In',
        or: 'Or continue with',
        google: 'Google Account',
        error: 'Invalid credentials. Please try again.'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        services: 'الخدمات',
        about: 'من نحن',
        projects: 'المشاريع',
        contact: 'اتصل بنا',
        callUs: 'اتصل بنا',
        requestService: 'طلب خدمة'
      },
      hero: {
        title1: 'نحمي',
        title2: 'ما يهمك',
        title3: 'أكثر.',
        description: 'توفر الولاء أحدث حلول السلامة من الحرائق وتكامل الأنظمة الأمنية في جميع أنحاء المملكة العربية السعودية. من تصاريح الدفاع المدني إلى المراقبة المدعومة بالذكاء الاصطناعي، نحن نؤمن مستقبلك.',
        requestService: 'طلب خدمة',
        ourServices: 'خدماتنا',
        experience: 'سنوات خبرة',
        projects: 'مشروع منجز',
        compliance: 'امتثال',
        highTech: 'تقنية عالية',
        fireSystem: 'نظام حريق',
        secure: 'آمن',
        fastResponse: 'استجابة سريعة'
      },
      services: {
        expertise: 'خبراتنا',
        title: 'حلول سلامة شاملة',
        description: 'نقدم مجموعة كاملة من خدمات الحماية من الحرائق والأمن المصممة خصيصاً للاحتياجات الفريدة للسوق السعودي.',
        learnMore: 'اقرأ المزيد',
        items: {
          permits: {
            title: 'تصاريح الدفاع المدني',
            description: 'توجيه ومعالجة الخبراء لجميع متطلبات الدفاع المدني السعودي التنظيمية وشهادات السلامة.'
          },
          extinguishing: {
            title: 'أنظمة إطفاء الحريق',
            description: 'تصميم وتركيب وصيانة أنظمة الإخماد المتقدمة القائمة على الماء والرغوة والغاز.'
          },
          alarm: {
            title: 'صيانة إنذار الحريق',
            description: 'مراقبة على مدار الساعة طوال أيام الأسبوع وصيانة وقائية لأنظمة الكشف المبكر لضمان أقصى قدر من الموثوقية.'
          },
          surveillance: {
            title: 'المراقبة الذكية',
            description: 'حلول الدوائر التلفزيونية المغلقة والمراقبة المدعومة بالذكاء الاصطناعي التي توفر تحليلات في الوقت الفعلي وأمناً عالي الدقة.'
          },
          integration: {
            title: 'تكامل الأنظمة',
            description: 'ربط أنظمة الحريق والأمن وإدارة المباني بسلاسة في واجهة تحكم موحدة.'
          },
          consultation: {
            title: 'استشارات السلامة',
            description: 'تقييمات شاملة للمخاطر وتخطيط استراتيجي للسلامة للمرافق التجارية والصناعية.'
          }
        }
      },
      contact: {
        title: 'لنؤمن مستقبلك معاً.',
        description: 'هل لديك مشروع في ذهنك أو تحتاج إلى استشارة سلامة؟ فريق الخبراء لدينا جاهز لمساعدتك في أي مكان في المملكة.',
        callUs: 'اتصل بنا',
        emailUs: 'راسلنا',
        visitUs: 'زرنا',
        form: {
          fullName: 'الاسم الكامل',
          email: 'البريد الإلكتروني',
          service: 'الخدمة المطلوبة',
          message: 'الرسالة',
          send: 'إرسال الاستفسار',
          placeholders: {
            name: 'فلان الفلاني',
            email: 'example@domain.com',
            message: 'كيف يمكننا مساعدتك؟'
          },
          options: {
            permits: 'تصاريح الدفاع المدني',
            alarm: 'أنظمة إنذار الحريق',
            surveillance: 'المراقبة الذكية',
            other: 'أخرى'
          }
        }
      },
      footer: {
        description: 'المزود الرائد لأنظمة السلامة من الحرائق والأمن في المملكة العربية السعودية. مكرسون لحماية الأرواح والممتلكات من خلال الابتكار والتميز.',
        quickLinks: 'روابط سريعة',
        services: 'الخدمات',
        rights: 'جميع الحقوق محفوظة.',
        designedBy: 'تم تصميم وتطوير الموقع بواسطة',
        privacy: 'سياسة الخصوصية',
        terms: 'شروط الخدمة'
      },
      request: {
        back: 'العودة للرئيسية',
        title: 'طلب',
        subtitle: 'خدمة',
        description: 'املأ النموذج أدناه لطلب استشارة سلامة احترافية أو خدمة فنية. خبراؤنا مستعدون لمساعدتك.',
        form: {
          company: 'اسم الشركة',
          contactPerson: 'الشخص المسؤول',
          phone: 'رقم الهاتف',
          email: 'البريد الإلكتروني',
          serviceType: 'نوع الخدمة',
          location: 'موقع المشروع',
          details: 'تفاصيل المشروع / المتطلبات',
          submit: 'إرسال الطلب',
          placeholders: {
            company: 'منظمتك / شركتك',
            name: 'الاسم الكامل',
            phone: '+966 50 000 0000',
            email: 'name@company.com',
            location: 'المدينة، الحي',
            details: 'أخبرنا المزيد عن احتياجاتك...'
          }
        }
      },
      quotation: {
        title: 'محرر عرض السعر',
        adminTitle: 'لوحة الموظفين',
        quotations: 'عروض الأسعار',
        manageDesc: 'إدارة وإنشاء عروض الأسعار لعملائك.',
        createNew: 'إنشاء عرض سعر جديد',
        searchPlaceholder: 'البحث عن طريق العميل أو المشروع أو رقم عرض السعر...',
        loading: 'جاري تحميل عروض الأسعار...',
        noFound: 'لم يتم العثور على عروض أسعار.',
        date: 'التاريخ',
        quotationNum: 'رقم عرض السعر',
        refNum: 'الرقم المرجعي',
        clientProject: 'العميل / المشروع',
        amount: 'المبلغ',
        status: 'الحالة',
        actions: 'الإجراءات',
        logout: 'تسجيل الخروج',
        loggedInAs: 'تم تسجيل الدخول باسم:',
        confirmDelete: 'هل أنت متأكد أنك تريد حذف عرض السعر هذا؟',
        deleteError: 'فشل الحذف. مطلوب صلاحيات المسؤول.',
        saveError: 'فشل حفظ عرض السعر. تحقق من الصلاحيات.',
        back: 'رجوع',
        download: 'تحميل PDF',
        edit: 'تعديل',
        delete: 'حذف',
        save: 'حفظ عرض السعر',
        engineer: 'اسم المهندس',
        number: 'رقم عرض السعر',
        client: 'اسم العميل',
        phone: 'هاتف العميل',
        project: 'اسم المشروع',
        location: 'الموقع',
        items: 'البنود',
        addItem: 'إضافة بند',
        description: 'الوصف',
        qty: 'الكمية',
        unitPrice: 'سعر الوحدة',
        total: 'الإجمالي',
        subtotal: 'المجموع الفرعي',
        vat: 'ضريبة القيمة المضافة (15%)',
        grandTotal: 'الإجمالي الكلي',
        placeholders: {
          engineer: 'اسم المهندس',
          client: 'اسم العميل',
          phone: '05xxxxxxxx',
          project: 'اسم المشروع',
          location: 'المدينة',
          itemDescription: 'وصف البند'
        }
      },
      login: {
        title: 'بوابة الموظفين',
        subtitle: 'سجل الدخول للوصول إلى لوحة التحكم',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        submit: 'تسجيل الدخول',
        or: 'أو المتابعة باستخدام',
        google: 'حساب جوجل',
        error: 'بيانات الاعتماد غير صالحة. يرجى المحاولة مرة أخرى.'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
