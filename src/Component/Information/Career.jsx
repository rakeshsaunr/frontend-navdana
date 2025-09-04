import React, { useState } from 'react';

// Main App component
const App = () => {
  // State for managing the application form visibility and success message
  const [isApplicationVisible, setIsApplicationVisible] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [isSuccessMessageVisible, setIsSuccessMessageVisible] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });
  const [resumeFile, setResumeFile] = useState(null);

  // Job data, defined as a constant array
  const jobs = [
    {
      id: 1,
      title: "Senior Software Developer",
      department: "Technology",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹8-15 LPA",
      description: "Looking for an experienced developer with expertise in React, Node.js, and cloud technologies. You'll lead development of our core platform.",
      icon: "💻",
      skills: ["React", "Node.js", "MongoDB", "AWS"]
    },
    {
      id: 2,
      title: "Marketing Manager",
      department: "Marketing",
      location: "Delhi, India",
      type: "Full-time",
      experience: "4-6 years",
      salary: "₹10-18 LPA",
      description: "Drive our marketing strategy across digital channels. Experience in B2B marketing and team leadership required.",
      icon: "📈",
      skills: ["Digital Marketing", "SEO/SEM", "Analytics", "Team Leadership"]
    },
    {
      id: 3,
      title: "UI/UX Designer",
      department: "Design",
      location: "Bangalore, India",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹6-12 LPA",
      description: "Create beautiful and intuitive user experiences. Proficiency in Figma, user research, and design systems required.",
      icon: "🎨",
      skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"]
    },
    {
      id: 4,
      title: "Data Scientist",
      department: "Data & Analytics",
      location: "Hyderabad, India",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₹12-20 LPA",
      description: "Build ML models and derive insights from data. Strong background in Python, statistics, and machine learning required.",
      icon: "📊",
      skills: ["Python", "Machine Learning", "SQL", "Data Visualization"]
    },
    {
      id: 5,
      title: "HR Business Partner",
      department: "Human Resources",
      location: "Pune, India",
      type: "Full-time",
      experience: "5-8 years",
      salary: "₹8-15 LPA",
      description: "Partner with business leaders on talent strategy. Experience in talent acquisition, performance management, and culture building.",
      icon: "👥",
      skills: ["Talent Acquisition", "Performance Management", "Employee Relations", "HR Analytics"]
    },
    {
      id: 6,
      title: "Sales Executive",
      department: "Sales",
      location: "Chennai, India",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₹5-10 LPA + Incentives",
      description: "Drive revenue growth through B2B sales. Strong communication skills and experience in enterprise sales preferred.",
      icon: "💼",
      skills: ["B2B Sales", "CRM", "Negotiation", "Client Relationship Management"]
    },
    {
      id: 7,
      title: "DevOps Engineer",
      department: "Technology",
      location: "Remote",
      type: "Full-time",
      experience: "3-6 years",
      salary: "₹10-18 LPA",
      description: "Manage our cloud infrastructure and CI/CD pipelines. Experience with AWS, Docker, and Kubernetes required.",
      icon: "⚙️",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"]
    },
    {
      id: 8,
      title: "Product Manager",
      department: "Product",
      location: "Mumbai, India",
      type: "Full-time",
      experience: "4-7 years",
      salary: "₹15-25 LPA",
      description: "Lead product strategy and roadmap. Experience in agile methodologies and stakeholder management essential.",
      icon: "🚀",
      skills: ["Product Strategy", "Agile", "User Stories", "Market Research"]
    }
  ];

  // Function to show the application form for a specific job
  const applyForJob = (jobTitle) => {
    setSelectedPosition(jobTitle);
    setIsApplicationVisible(true);
    setFormMessage({ text: '', type: '' });
    setTimeout(() => {
      const el = document.getElementById('applicationSection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Function to close the application form and reset it
  const closeApplication = () => {
    setIsApplicationVisible(false);
    setResumeFile(null);
  };

  // Handles file upload for the resume field
  const handleResumeUpload = (file) => {
    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setFormMessage({ text: 'Please upload a PDF, DOC, or DOCX file.', type: 'error' });
        setResumeFile(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFormMessage({ text: 'File size must be less than 5MB.', type: 'error' });
        setResumeFile(null);
        return;
      }
      setResumeFile(file);
      setFormMessage({ text: '', type: '' });
    }
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setFormMessage({ text: 'Please upload your resume to continue.', type: 'error' });
      return;
    }

    // Simulate form data collection and submission
    const formData = new FormData(e.target);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      experience: formData.get('experience'),
      position: formData.get('position'),
      currentSalary: formData.get('currentSalary'),
      coverLetter: formData.get('coverLetter'),
      linkedin: formData.get('linkedin'),
      resumeFileName: resumeFile.name
    };

    console.log('Application submitted:', data);

    // Show success message and close form
    setIsSuccessMessageVisible(true);
    closeApplication();
  };

  // Renders a single job listing (no card format)
  const JobItem = ({ job }) => (
    <div className="mb-10 border-b border-orange-200 pb-8">
      <div className="flex items-start gap-4 mb-2">
        <span className="text-3xl">{job.icon}</span>
        <div>
          <h3 className="text-2xl font-bold text-gray-900">{job.title}</h3>
          <span className="text-orange-700 font-medium">{job.department}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-6 text-sm text-gray-700 mb-2 pl-12">
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </span>
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {job.type}
        </span>
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-1.12-8.528-3.102M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.experience}
        </span>
        <span className="flex items-center gap-1">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2M12 8V5m0 3v13m0-8V5" />
          </svg>
          {job.salary}
        </span>
      </div>
      <p className="text-gray-800 text-base leading-relaxed mb-2 pl-12">{job.description}</p>
      <div className="flex flex-wrap gap-2 pl-12 mb-2">
        {job.skills.map((skill, index) => (
          <span key={index} className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-medium">{skill}</span>
        ))}
      </div>
      <div className="pl-12 mt-2">
        <button
          onClick={() => applyForJob(job.title)}
          className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-4 py-1.5 rounded font-semibold shadow hover:from-orange-500 hover:to-pink-600 transition-all duration-200"
        >
          Apply Now
        </button>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg- via-white min-h-screen">
        {/* Header (no card, just plain background and text) */}
        <header className="white-bg text-black">
          <div className="mx-auto px-6 py-12">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-medium mb-4 tracking-tight drop-shadow-lg">Navdana</h1>
              <p className="text-2xl md:text-3xl mb-3 font-medium">Join Our Team & Build Your Career</p>
              <p className="text-lg opacity-90">Discover exciting opportunities and grow with us</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-12">
          {/* Benefits Section */}
          <section className="mb-20">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Why Work With Us?</h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-yellow-200"
                style={{ background: "linear-gradient(120deg, #fffbe6 0%, #ffe29f 100%)", border: "1.5px solid #ffe29f" }}>
                <div className="text-5xl mb-4">💰</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Competitive Salary</h3>
                <p className="text-gray-600">Industry-leading compensation packages with performance bonuses</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-pink-200"
                style={{ background: "linear-gradient(120deg, #ffe6e6 0%, #ffa99f 100%)", border: "1.5px solid #ffa99f" }}>
                <div className="text-5xl mb-4">🏥</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Health Benefits</h3>
                <p className="text-gray-600">Comprehensive health insurance for you and your family</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-orange-200"
                style={{ background: "linear-gradient(120deg, #fff3e6 0%, #ffd6a5 100%)", border: "1.5px solid #ffd6a5" }}>
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Learning & Growth</h3>
                <p className="text-gray-600">Continuous learning opportunities and career development programs</p>
              </div>
            </div>
          </section>

          {/* Job Listings */}
          <section className="mb-20">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">Open Positions</h2>
            <div className="max-w-5xl mx-auto">
              {jobs.map(job => (
                <JobItem key={job.id} job={job} />
              ))}
            </div>
          </section>

          {/* Application Form */}
          {isApplicationVisible && (
            <section id="applicationSection" className="mb-20">
              <div className="bg-white rounded-2xl shadow-2xl p-10 border border-yellow-200 max-w-3xl mx-auto"
                style={{ background: "linear-gradient(120deg, #fffbe6 0%, #ffe29f 100%)", border: "1.5px solid #ffe29f" }}>
                <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Job Application Form</h2>
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
                  {formMessage.text && (
                    <div className={`p-4 mb-4 rounded-lg text-sm ${formMessage.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {formMessage.text}
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                      <input type="text" name="fullName" id="fullName" required className="w-full px-4 py-3 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                      <input type="email" name="email" id="email" required className="w-full px-4 py-3 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                      <input type="tel" name="phone" id="phone" required className="w-full px-4 py-3 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent" />
                    </div>
                    <div>
                      <label htmlFor="experience" className="block text-gray-700 font-semibold mb-2">Years of Experience</label>
                      <select name="experience" id="experience" className="w-full px-4 py-3 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent">
                        <option value="">Select Experience</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="position" className="block text-gray-700 font-semibold mb-2">Position Applied For *</label>
                    <input type="text" name="position" id="position" value={selectedPosition} readOnly className="w-full px-4 py-3 border border-yellow-200 rounded-lg bg-yellow-50" />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="currentSalary" className="block text-gray-700 font-semibold mb-2">Current Salary (Optional)</label>
                    <input type="text" name="currentSalary" id="currentSalary" className="w-full px-4 py-3 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent" placeholder="e.g., ₹5,00,000 per annum" />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="coverLetter" className="block text-gray-700 font-semibold mb-2">Cover Letter</label>
                    <textarea name="coverLetter" id="coverLetter" rows="4" className="w-full px-4 py-3 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent" placeholder="Tell us about yourself and why you're perfect for this role..."></textarea>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">Resume/CV Upload *</label>
                    <div
                      className={`relative w-full px-4 py-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
                        ${resumeFile ? 'border-green-500 bg-green-50' : 'border-yellow-200 hover:border-orange-400 hover:bg-orange-50'}`}
                      onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-orange-400', 'bg-orange-50'); }}
                      onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-orange-400', 'bg-orange-50'); }}
                      onDrop={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-orange-400', 'bg-orange-50'); handleResumeUpload(e.dataTransfer.files[0]); }}
                      onClick={() => document.getElementById('resume').click()}
                    >
                      <input type="file" name="resume" id="resume" accept=".pdf,.doc,.docx" onChange={(e) => handleResumeUpload(e.target.files[0])} className="hidden" />
                      {!resumeFile ? (
                        <div>
                          <span className="text-5xl mb-2 block">📄</span>
                          <p className="text-gray-700 mb-2">Click to upload or drag and drop your resume</p>
                          <p className="text-sm text-gray-400">PDF, DOC, DOCX (Max 5MB)</p>
                        </div>
                      ) : (
                        <div>
                          <span className="text-5xl mb-2 block text-green-600">✅</span>
                          <p className="text-green-600 font-medium">{resumeFile.name}</p>
                          <button type="button" onClick={(e) => { e.stopPropagation(); setResumeFile(null); setFormMessage({ text: '', type: '' }); }} className="text-red-500 text-sm mt-2 hover:underline">
                            Remove file
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="linkedin" className="block text-gray-700 font-semibold mb-2">LinkedIn Profile (Optional)</label>
                    <input type="url" name="linkedin" id="linkedin" className="w-full px-4 py-3 border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent" placeholder="https://linkedin.com/in/yourprofile" />
                  </div>

                  <div className="flex gap-4 justify-center mt-8">
                    <button type="submit" className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold shadow hover:from-orange-500 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
                      Submit Application
                    </button>
                    <button type="button" onClick={closeApplication} className="bg-gray-400 text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-500 transition-all duration-200">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </section>
          )}

          {/* Success Message */}
          {isSuccessMessageVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-10 max-w-md mx-4 text-center shadow-2xl border border-yellow-200"
                style={{ background: "linear-gradient(120deg, #fffbe6 0%, #ffe29f 100%)", border: "1.5px solid #ffe29f" }}>
                <div className="text-7xl mb-4">✅</div>
                <h3 className="text-3xl font-extrabold text-gray-800 mb-4">Application Submitted!</h3>
                <p className="text-gray-700 mb-6">Thank you for your application. Our HR team will review it and get back to you within 3-5 business days.</p>
                <button onClick={() => setIsSuccessMessageVisible(false)} className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-5 py-2 rounded-xl font-semibold hover:from-orange-500 hover:to-pink-600 transition-colors">
                  OK
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default App;
