import React, { useState, useEffect } from 'react';

// FAQ data structured as an array of objects
const faqData = [
    {
        id: 'orders',
        sectionTitle: 'Orders',
        faqs: [
            { question: 'How do I place an order?', answer: 'Browse our products, select what you want, proceed to checkout, and complete payment. You\'ll receive an order confirmation by email.' },
            { question: 'Can I cancel my order?', answer: 'Yes, you can cancel your order only within 24 hours of placing it.' },
        ],
    },
    {
        id: 'payments',
        sectionTitle: 'Payments',
        faqs: [
            { question: 'What payment methods are accepted?', answer: 'We accept credit/debit cards, UPI, net banking, and Cash on Delivery (COD).' },
            { question: 'Is my payment secure?', answer: 'Yes, all payments are processed via secure payment gateways to ensure your information is protected.' },
        ],
    },
    {
        id: 'shipping',
        sectionTitle: 'Shipping & Delivery',
        faqs: [
            { question: 'What is the delivery timeline?', answer: 'Delivery takes 0-7 working days within India.' },
            { question: 'Can I track my order?', answer: 'Yes, tracking information will be shared with you once your order is shipped.' },
        ],
    },
    {
        id: 'returns',
        sectionTitle: 'Returns & Exchanges',
        faqs: [
            { question: 'Can I return or exchange items?', answer: 'Yes, you can return or exchange items within 7 days of delivery. Items must be unused and have original tags attached. Sale items are not eligible for returns or exchanges.' },
        ],
    },
    {
        id: 'refunds',
        sectionTitle: 'Refunds',
        faqs: [
            { question: 'How long does it take to get a refund?', answer: 'Refunds are processed within 0–7 business days after we receive your returned item.' },
        ],
    },
    {
        id: 'products',
        sectionTitle: 'Products',
        faqs: [
            { question: 'Are the colors shown online accurate?', answer: 'We try our best to display accurate colors, but slight variations are possible due to different screen settings and lighting conditions.' },
        ],
    },
];

const App = () => {
    const [openSectionId, setOpenSectionId] = useState(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    // Effect for page load animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoaded(true);
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    // Effect for scroll progress indicator
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.offsetHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            setScrollProgress(scrollPercent);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleFAQ = (sectionId) => {
        setOpenSectionId(openSectionId === sectionId ? null : sectionId);
    };

    return (
        <>
            <style>
                {`
                :root {
                    --primary-brown: #2c1810;
                    --accent-gold: #b48a78;
                    --warm-brown: #8b5a3c;
                    --light-cream: #faf7f4;
                    --soft-cream: #f5f1eb;
                    --border-cream: #e8ddd4;
                }

                * {
                    box-sizing: border-box;
                }

                body {
                    font-family: 'Inter', sans-serif;
                    background: linear-gradient(135deg, var(--light-cream) 0%, var(--soft-cream) 50%, #f0e6d6 100%);
                    margin: 0;
                    padding: 0;
                    min-height: 100vh;
                    line-height: 1.6;
                }

                .brand-font {
                    font-family: 'Playfair Display', serif;
                }

                .page-container {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .page-container.loaded {
                    opacity: 1;
                    transform: translateY(0);
                }

                .decorative-line {
                    height: 2px;
                    background: linear-gradient(90deg, transparent, var(--accent-gold), var(--warm-brown), var(--accent-gold), transparent);
                    border-radius: 2px;
                }

                .star-icon {
                    color: var(--accent-gold);
                    font-size: 1.5rem;
                    text-shadow: 0 2px 4px rgba(180, 138, 120, 0.3);
                    animation: twinkle 3s ease-in-out infinite;
                }

                @keyframes twinkle {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.7; transform: scale(1.1); }
                }

                .faq-section {
                    background: rgba(255, 255, 255, 0.8);
                    backdrop-filter: blur(10px);
                    border: 1px solid var(--border-cream);
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 8px 32px rgba(44, 24, 16, 0.1);
                    transition: all 0.3s ease;
                    margin-bottom: 1rem;
                }

                .faq-section:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 40px rgba(44, 24, 16, 0.15);
                }

                .faq-header {
                    background: linear-gradient(135deg, #faf8f5 0%, #f2ebe3 100%);
                    padding: 1.5rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                    width: 100%;
                    text-align: left;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .faq-header:hover {
                    background: linear-gradient(135deg, #f5f2ee 0%, #ede6dd 100%);
                }

                .faq-header.active {
                    background: linear-gradient(135deg, var(--accent-gold) 0%, var(--warm-brown) 100%);
                    color: white;
                }

                .faq-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: var(--primary-brown);
                    margin: 0;
                    transition: color 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .section-number {
                    color: var(--accent-gold);
                    font-weight: 700;
                    font-size: 1.1rem;
                    min-width: 2rem;
                }

                .faq-header.active .faq-title {
                    color: white;
                }

                .faq-header.active .section-number {
                    color: rgba(255, 255, 255, 0.9);
                }

                .chevron {
                    width: 24px;
                    height: 24px;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    color: var(--accent-gold);
                }

                .faq-header.active .chevron {
                    color: white;
                    transform: rotate(180deg);
                }

                .faq-content {
                    max-height: 0;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    background: rgba(255, 255, 255, 0.95);
                }

                .faq-content.open {
                    max-height: 500px;
                }

                .faq-inner {
                    padding: 2rem 1.5rem;
                }

                .faq-item {
                    margin-bottom: 1.5rem;
                    padding-bottom: 1.5rem;
                    border-bottom: 1px solid var(--border-cream);
                }

                .faq-item:last-child {
                    margin-bottom: 0;
                    padding-bottom: 0;
                    border-bottom: none;
                }

                .faq-question {
                    font-weight: 600;
                    color: var(--primary-brown);
                    margin-bottom: 0.75rem;
                    font-size: 1.1rem;
                }

                .faq-answer {
                    color: #5d4037;
                    line-height: 1.7;
                    font-size: 0.95rem;
                }

                .header-section {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .main-title {
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-weight: 700;
                    color: var(--primary-brown);
                    letter-spacing: 0.2em;
                    margin-bottom: 1rem;
                    text-shadow: 0 2px 4px rgba(44, 24, 16, 0.1);
                }

                .subtitle {
                    font-size: clamp(1.5rem, 3vw, 2rem);
                    color: var(--accent-gold);
                    font-style: italic;
                    margin-bottom: 0.5rem;
                    font-weight: 400;
                }

                .last-updated {
                    color: var(--warm-brown);
                    font-size: 0.9rem;
                    font-style: italic;
                    opacity: 0.8;
                }

                .divider-section {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 2.5rem 0;
                    gap: 1rem;
                }

                .content-wrapper {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                @media (max-width: 768px) {
                    .faq-header {
                        padding: 1.25rem;
                    }
                    
                    .faq-inner {
                        padding: 1.5rem 1.25rem;
                    }
                    
                    .main-title {
                        letter-spacing: 0.1em;
                    }
                }

                .scroll-indicator {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: rgba(180, 138, 120, 0.2);
                    z-index: 1000;
                }

                .scroll-progress {
                    height: 100%;
                    background: linear-gradient(90deg, var(--accent-gold), var(--warm-brown));
                    width: 0%;
                    transition: width 0.1s ease;
                }
                `}
            </style>
            
            <div className="scroll-indicator">
                <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
            </div>

            <div className={`page-container ${isLoaded ? 'loaded' : ''}`}>
                <div className="min-h-screen py-12 px-4">
                    {/* Header Section */}
                    <div className="header-section">
                        <h1 className="main-title brand-font">NAVDANA</h1>
                        <h2 className="subtitle brand-font">Frequently Asked Questions</h2>
                        <div className="last-updated">Last updated: August 29, 2025</div>
                    </div>

                    {/* Decorative Divider */}
                    <div className="divider-section">
                        <div className="decorative-line w-16"></div>
                        <span className="star-icon">✦</span>
                        <div className="decorative-line w-16"></div>
                    </div>

                    {/* FAQ Content */}
                    <div className="content-wrapper">
                        {faqData.map((section, index) => (
                            <div className="faq-section" key={section.id}>
                                <button
                                    className={`faq-header ${openSectionId === section.id ? 'active' : ''}`}
                                    onClick={() => toggleFAQ(section.id)}
                                    aria-expanded={openSectionId === section.id}
                                    aria-controls={`content-${section.id}`}
                                >
                                    <h3 className="faq-title">
                                        <span className="section-number">{index + 1}.</span> {section.sectionTitle}
                                    </h3>
                                    <svg className={`chevron ${openSectionId === section.id ? 'active' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <div id={`content-${section.id}`} className={`faq-content ${openSectionId === section.id ? 'open' : ''}`}>
                                    <div className="faq-inner">
                                        {section.faqs.map((faq, faqIndex) => (
                                            <div className="faq-item" key={faqIndex}>
                                                <div className="faq-question">{faq.question}</div>
                                                <div className="faq-answer">{faq.answer}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default App;
