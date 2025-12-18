'use client';

import { useState } from 'react';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    category: 'Getting Started',
    question: 'کیا میں Temp Mail Pro استعمال کرنے کے لیے رجسٹریشن کروں گا؟',
    answer: 'نہیں! Temp Mail Pro بالکل مفت ہے اور کوئی رجسٹریشن کی ضرورت نہیں۔ بس ہماری ویب سائٹ پر جائیں اور فوری طور پر ایک عارضی ای میل ایڈریس حاصل کریں۔'
  },
  {
    id: '2',
    category: 'Getting Started',
    question: 'میں کتنی جلدی ای میل ایڈریس حاصل کر سکتا ہوں؟',
    answer: 'فوری! صرف ایک کلک کے ساتھ، آپ کو ایک نیا، منفرد عارضی ای میل ایڈریس ملے گا۔ یہ پہلے سے تیار ہے اور استعمال کے لیے تیار ہے۔'
  },
  {
    id: '3',
    category: 'Getting Started',
    question: 'کیا میں اپنا موجودہ ای میل سے ای میلز فارورڈ کر سکتا ہوں؟',
    answer: 'ہاں، آپ Temp Mail Pro کے ذریعے موصول ہونے والی تمام ای میلز دیکھ سکتے ہیں۔ انبکس میں براہ راست تمام پیغامات دیکھیں اور انہیں اپنے اصل ای میل پر ای میل بھیج سکتے ہیں۔'
  },
  {
    id: '4',
    category: 'Security & Privacy',
    question: 'کیا Temp Mail Pro محفوظ ہے؟',
    answer: 'بالکل! ہم آپ کی رازداری کی حفاظت کو بہت سنجیدگی سے لیتے ہیں۔ تمام ای میلز منشفر شدہ ہیں، اور ہم کبھی آپ کی ذاتی معلومات بیچتے یا شیئر نہیں کرتے۔ ہمارا سرور سب سے ماڈرن سیکیورٹی پروٹوکول استعمال کرتے ہیں۔'
  },
  {
    id: '5',
    category: 'Security & Privacy',
    question: 'کیا میری ای میلز نجی ہیں؟',
    answer: 'ہاں، تمام ای میلز بالکل نجی ہیں۔ کوئی دوسرا شخص آپ کے عارضی ای میل ایڈریس تک رسائی حاصل نہیں کر سکتا۔ صرف آپ کی بھیجی گئی ای میلز دیکھ سکتے ہیں۔'
  },
  {
    id: '6',
    category: 'Security & Privacy',
    question: 'کیا اسپیم اور میلویئر سے محفوظ ہوں؟',
    answer: 'ہمارے پاس اعلیٰ سطح کی فلٹرنگ ہے جو اسپیم اور میلویئر کو روکتی ہے۔ اگر آپ کو کوئی مشکوک ای میل ملے تو بلاک کر سکتے ہیں۔'
  },
  {
    id: '7',
    category: 'Email Usage',
    question: 'میرا عارضی ای میل ایڈریس کتنی دیر تک کام کرے گا؟',
    answer: '24 گھنٹے! آپ کا عارضی ای میل ایڈریس 24 گھنٹے کے بعد خود بخود حذف ہو جاتا ہے۔ اگر آپ کو مزید وقت کی ضرورت ہے تو آپ اسے بڑھا سکتے ہیں یا نیا بنا سکتے ہیں۔'
  },
  {
    id: '8',
    category: 'Email Usage',
    question: 'کیا میں اپنا ای میل ایڈریس تبدیل کر سکتا ہوں؟',
    answer: 'ہاں! جب بھی آپ چاہیں، آپ ایک نیا عارضی ای میل ایڈریس حاصل کر سکتے ہیں۔ بس "نئی ای میل" بٹن پر کلک کریں۔'
  },
  {
    id: '9',
    category: 'Email Usage',
    question: 'کیا میں ای میلز بھیج سکتا ہوں؟',
    answer: 'Temp Mail Pro بنیادی طور پر صرف انبکس کے لیے ہے۔ آپ ای میلز موصول کر سکتے ہیں، لیکن براہ راست ای میلز بھیج نہیں سکتے۔ تاہم، ای میلز کو اپنے اصل ای میل پر بھیج سکتے ہیں۔'
  },
  {
    id: '10',
    category: 'Technical',
    question: 'کیا میں موبائل فون پر Temp Mail Pro استعمال کر سکتا ہوں؟',
    answer: 'بالکل! Temp Mail Pro مکمل طور پر موبائل دوست ہے۔ iOS اور Android دونوں پر بغیر کسی مسئلے کے کام کرتا ہے۔'
  },
  {
    id: '11',
    category: 'Technical',
    question: 'کیا مسئلہ ہو تو میں کیا کروں؟',
    answer: 'اگر کوئی مسئلہ پیش آئے تو براہ کرم ہمارے "رابطہ" صفحے پر جائیں۔ ہمارے ٹیم سے رابطہ کریں اور ہم جلد از جلد مدد کریں گے۔'
  },
  {
    id: '12',
    category: 'Technical',
    question: 'کیا Temp Mail Pro کے لیے کوئی API ہے؟',
    answer: 'ہاں! ہمارے پاس ایک طاقتور API ہے جو آپ اپنی ایپلیکیشنز میں استعمال کر سکتے ہیں۔ API دستاویزات کے لیے API Docs صفحہ دیکھیں۔'
  },
  {
    id: '13',
    category: 'Pricing & Plans',
    question: 'کیا یہ بالکل مفت ہے؟',
    answer: 'ہاں! Temp Mail Pro مکمل طور پر مفت ہے۔ کوئی پوشیدہ اخراجات یا سبسکریپشن نہیں۔ آپ جتنا چاہیں استعمال کر سکتے ہیں۔'
  },
  {
    id: '14',
    category: 'Pricing & Plans',
    question: 'کیا کوئی پریمیم ورژن ہے؟',
    answer: 'فی الوقت نہیں، لیکن ہم مستقبل میں پریمیم فیچرز شامل کر سکتے ہیں۔ موجودہ وقت میں تمام فیچرز مفت ہیں۔'
  },
  {
    id: '15',
    category: 'Use Cases',
    question: 'Temp Mail Pro کب استعمال کریں؟',
    answer: 'اسے استعمال کریں: آن لائن خریداری، مفت ٹرائلز، ویب سائٹوں میں سائن اپ، اسپام سے بچنے کے لیے، اور جب آپ اپنی اصل ای میل شیئر نہیں کرنا چاہتے۔'
  },
  {
    id: '16',
    category: 'Use Cases',
    question: 'کیا یہ غیر قانونی ہے؟',
    answer: 'نہیں! Temp Mail Pro بالکل قانونی ہے۔ اسے ذاتی نجی پن کی حفاظت کے لیے استعمال کریں۔ تاہم، فراڈ یا نقصان دہ سرگرمیوں کے لیے استعمال کریں تو غلط ہے۔'
  },
];

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqData.map(item => item.category)));

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="page-container">
      <section className="hero">
        <div className="container">
          <h1>اکثر پوچھے جانے والے سوالات</h1>
          <p>Temp Mail Pro کے بارے میں آپ جو کچھ جاننا چاہتے ہیں</p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '60px', paddingBottom: '80px' }}>
        {/* Search Bar */}
        <div style={{
          maxWidth: '600px',
          margin: '0 auto 40px',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="سوالات تلاش کریں..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 20px',
              borderRadius: '12px',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              background: 'rgba(15, 23, 42, 0.5)',
              color: 'var(--text-primary)',
              fontSize: '16px',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.6)';
              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.8)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
              e.currentTarget.style.background = 'rgba(15, 23, 42, 0.5)';
            }}
          />
          <svg
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '20px',
              height: '20px',
              color: 'rgba(59, 130, 246, 0.5)',
              pointerEvents: 'none'
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Category Filter */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '40px',
          justifyContent: 'center'
        }}>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: selectedCategory === null ? '2px solid rgba(59, 130, 246, 0.8)' : '1px solid rgba(59, 130, 246, 0.2)',
              background: selectedCategory === null ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
              color: selectedCategory === null ? 'rgba(59, 130, 246, 1)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (selectedCategory !== null) {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedCategory !== null) {
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            تمام زمرہ جات
          </button>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: selectedCategory === category ? '2px solid rgba(59, 130, 246, 0.8)' : '1px solid rgba(59, 130, 246, 0.2)',
                background: selectedCategory === category ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                color: selectedCategory === category ? 'rgba(59, 130, 246, 1)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== category) {
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {filteredFAQs.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredFAQs.map(item => (
                <div
                  key={item.id}
                  style={{
                    background: expandedId === item.id
                      ? 'linear-gradient(135deg, rgba(30, 41, 82, 0.8) 0%, rgba(30, 41, 82, 0.6) 100%)'
                      : 'linear-gradient(135deg, rgba(30, 41, 82, 0.6) 0%, rgba(30, 41, 82, 0.4) 100%)',
                    borderRadius: '12px',
                    border: expandedId === item.id
                      ? '1px solid rgba(59, 130, 246, 0.6)'
                      : '1px solid rgba(59, 130, 246, 0.2)',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    style={{
                      width: '100%',
                      padding: '20px',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-primary)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '16px',
                      textAlign: 'right'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      order: -1
                    }}>
                      <div style={{
                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)',
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%'
                      }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        margin: 0,
                        color: 'var(--text-primary)'
                      }}>
                        {item.question}
                      </h3>
                      <p style={{
                        fontSize: '12px',
                        color: 'rgba(59, 130, 246, 0.8)',
                        margin: '6px 0 0 0',
                        fontWeight: '500'
                      }}>
                        {item.category}
                      </p>
                    </div>
                    <svg
                      style={{
                        width: '20px',
                        height: '20px',
                        color: 'rgba(59, 130, 246, 0.6)',
                        transform: expandedId === item.id ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s ease'
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>

                  {expandedId === item.id && (
                    <div style={{
                      padding: '0 20px 20px',
                      borderTop: '1px solid rgba(59, 130, 246, 0.1)',
                      animation: 'slideDown 0.3s ease-out'
                    }}>
                      <p style={{
                        color: 'var(--text-secondary)',
                        lineHeight: '1.8',
                        fontSize: '15px',
                        margin: 0
                      }}>
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--text-muted)'
            }}>
              <svg
                style={{
                  width: '56px',
                  height: '56px',
                  margin: '0 auto 20px',
                  opacity: 0.3
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--text-primary)'
              }}>
                کوئی نتیجہ نہیں ملا
              </h3>
              <p>اپنی تلاش میں تبدیلی کریں یا دوسری زمرہ کو آزمائیں</p>
            </div>
          )}
        </div>

        {/* Additional Help */}
        <div style={{
          maxWidth: '800px',
          margin: '80px auto 0',
          textAlign: 'center',
          paddingTop: '60px',
          borderTop: '1px solid rgba(59, 130, 246, 0.1)'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>
            کیا آپ کو مزید مدد چاہیے؟
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            اگر آپ کو یہاں اپنا سوال نہیں ملا تو براہ کرم ہمارے سے رابطہ کریں
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(168, 85, 247, 0.8) 100%)',
              border: 'none',
              color: 'white',
              padding: '12px 32px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            ہمسے رابطہ کریں
          </a>
        </div>
      </div>
    </div>
  );
}
