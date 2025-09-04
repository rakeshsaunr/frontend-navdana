import React, { useEffect, useRef } from 'react';

// Main App component
const App = () => {
  const policyContainerRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Initial fade-in for the main container
    const container = policyContainerRef.current;
    if (container) {
      container.style.transition = 'all 0.8s ease';
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }

    // Set up IntersectionObserver for sections
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    sectionRefs.current.forEach(section => {
      if (section) {
        observer.observe(section);
      }
    });

    // Cleanup observer on component unmount
    return () => {
      sectionRefs.current.forEach(section => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,_#faf7f4_0%,_#f5f1eb_100%)] font-['Georgia']">
      <div
        ref={policyContainerRef}
        className="max-w-[900px] mx-auto p-8 md:p-12 mt-8 mb-8 opacity-0 translate-y-8"
      >
        <h1 className="text-center mb-2 text-4xl sm:text-5xl font-semibold text-[#2c1810] tracking-[2px]">NAVDANA</h1>
        <h2 className="text-center text-3xl sm:text-4xl mb-2 text-[#2c1810]">Privacy Policy</h2>
        <p className="text-center text-[#8b5a3c] text-sm md:text-base mb-10 italic">Last updated: August 29, 2025</p>

        <div className="flex justify-center items-center my-8">
          <div className="inline-block w-16 h-0.5 bg-gradient-to-r from-[#b48a78] to-[#8b5a3c]"></div>
          <span className="text-[#b48a78] text-xl px-2">✦</span>
          <div className="inline-block w-16 h-0.5 bg-gradient-to-r from-[#8b5a3c] to-[#b48a78]"></div>
        </div>

        {/* Information We Collect Section */}
        <section
          ref={el => sectionRefs.current[0] = el}
          className="my-8 opacity-0 translate-y-5 transition-all duration-700 ease-in-out"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-[#b48a78] mb-4 border-b-2 border-[#b48a78] pb-2 flex items-center gap-2">
            <span>📋</span> Information We Collect
          </h3>
          <p className="mb-2 font-semibold text-[#8b5a3c]">Personal Information:</p>
          <ul className="list-disc pl-8 mb-4">
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">Name and contact details</li>
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">Shipping address</li>
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">Payment information</li>
          </ul>
          <p className="mb-2 font-semibold text-[#8b5a3c]">Non-Personal Information:</p>
          <ul className="list-disc pl-8">
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">Browser type and device details</li>
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">IP address</li>
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">Browsing behavior and preferences</li>
          </ul>
        </section>

        {/* How We Use Your Information Section */}
        <section
          ref={el => sectionRefs.current[1] = el}
          className="my-8 opacity-0 translate-y-5 transition-all duration-700 ease-in-out"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-[#b48a78] mb-4 border-b-2 border-[#b48a78] pb-2 flex items-center gap-2">
            <span>🔧</span> How We Use Your Information
          </h3>
          <ul className="list-disc pl-8">
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">Process and fulfill your orders</li>
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">Send updates about your purchases</li>
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">Improve our services and user experience</li>
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">Comply with legal requirements</li>
          </ul>
        </section>

        {/* Sharing of Information Section */}
        <section
          ref={el => sectionRefs.current[2] = el}
          className="my-8 opacity-0 translate-y-5 transition-all duration-700 ease-in-out"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-[#b48a78] mb-4 border-b-2 border-[#b48a78] pb-2 flex items-center gap-2">
            <span>🤝</span> Sharing of Information
          </h3>
          <ul className="list-disc pl-8">
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">
              Shared only with <span className="text-[#8b5a3c] font-semibold">trusted service providers</span>
            </li>
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">
              Your information is <span className="text-[#8b5a3c] font-semibold">never sold</span> to third parties
            </li>
          </ul>
        </section>

        {/* Data Security Section */}
        <section
          ref={el => sectionRefs.current[3] = el}
          className="my-8 opacity-0 translate-y-5 transition-all duration-700 ease-in-out"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-[#b48a78] mb-4 border-b-2 border-[#b48a78] pb-2 flex items-center gap-2">
            <span>🔒</span> Data Security
          </h3>
          <p className="text-base leading-relaxed text-[#4a4a4a] mb-4">
            We use reasonable security measures to protect your personal information. However, we cannot guarantee <span className="text-[#8b5a3c] font-semibold">100% security</span> of data transmitted over the internet.
          </p>
        </section>

        {/* Cookies Section */}
        <section
          ref={el => sectionRefs.current[4] = el}
          className="my-8 opacity-0 translate-y-5 transition-all duration-700 ease-in-out"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-[#b48a78] mb-4 border-b-2 border-[#b48a78] pb-2 flex items-center gap-2">
            <span>🍪</span> Cookies
          </h3>
          <p className="text-base leading-relaxed text-[#4a4a4a] mb-4">
            We use cookies to <span className="text-[#8b5a3c] font-semibold">improve your user experience</span> and provide personalized content on our website.
          </p>
        </section>

        {/* Your Rights Section */}
        <section
          ref={el => sectionRefs.current[5] = el}
          className="my-8 opacity-0 translate-y-5 transition-all duration-700 ease-in-out"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-[#b48a78] mb-4 border-b-2 border-[#b48a78] pb-2 flex items-center gap-2">
            <span>⚖️</span> Your Rights
          </h3>
          <ul className="list-disc pl-8">
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">Access your personal data</li>
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">Correct inaccurate information</li>
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">Delete your personal data</li>
            <li className="mb-2 text-base leading-relaxed text-[#4a4a4a]">Opt out of marketing communications</li>
          </ul>
        </section>

        {/* Policy Updates Section */}
        <section
          ref={el => sectionRefs.current[6] = el}
          className="my-8 opacity-0 translate-y-5 transition-all duration-700 ease-in-out"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-[#b48a78] mb-4 border-b-2 border-[#b48a78] pb-2 flex items-center gap-2">
            <span>🔄</span> Policy Updates
          </h3>
          <p className="text-base leading-relaxed text-[#4a4a4a] mb-4">
            We may update this privacy policy <span className="text-[#8b5a3c] font-semibold">without prior notice</span>. Please check this page regularly for any changes.
          </p>
        </section>

        {/* Contact Us Section */}
        <div className="mt-8 text-center">
          <h3 className="mb-4 text-2xl font-semibold text-[#b48a78] flex items-center justify-center gap-2"><span>📞</span>Contact Us</h3>
          <p className="mb-2">
            <strong className="font-semibold">Email:</strong> <a href="mailto:support@navdana.in" className="text-[#8b5a3c] underline transition-all duration-300 ease-in-out hover:text-[#2c1810] hover:scale-105 inline-block">support@navdana.in</a>
          </p>
          <p>
            <strong className="font-semibold">Phone:</strong> <a href="tel:+919311120477" className="text-[#8b5a3c] underline transition-all duration-300 ease-in-out hover:text-[#2c1810] hover:scale-105 inline-block">+91-9311120477</a>
          </p>
        </div>

        <div className="flex justify-center items-center my-8">
          <div className="inline-block w-16 h-0.5 bg-gradient-to-r from-[#b48a78] to-[#8b5a3c]"></div>
          <span className="text-[#b48a78] text-xl px-2">✦</span>
          <div className="inline-block w-16 h-0.5 bg-gradient-to-r from-[#8b5a3c] to-[#b48a78]"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
