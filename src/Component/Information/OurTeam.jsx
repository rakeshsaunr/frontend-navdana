import React from "react";

const teamMembers = [
  {
    name: "Kiran",
    title: "CEO & Founder",
    description: "Visionary leader with 15+ years of experience in technology and business strategy.",
    emoji: "👨‍💼",
    socials: [
      { icon: "📧", color: "text-blue-600" },
      { icon: "💼", color: "text-blue-600" },
      { icon: "🐦", color: "text-blue-600" },
    ],
  },
  {
    name: "Priya Sharma",
    title: "Lead Developer",
    description: "Full-stack developer passionate about creating innovative solutions and clean code.",
    emoji: "👩‍💻",
    socials: [
      { icon: "📧", color: "text-pink-600" },
      { icon: "💼", color: "text-pink-600" },
      { icon: "🔗", color: "text-pink-600" },
    ],
  },
  {
    name: "Amit Patel",
    title: "Creative Director",
    description: "Award-winning designer with expertise in branding, UI/UX, and visual storytelling.",
    emoji: "👨‍🎨",
    socials: [
      { icon: "📧", color: "text-green-600" },
      { icon: "🎨", color: "text-green-600" },
      { icon: "📷", color: "text-green-600" },
    ],
  },
  {
    name: "Sneha Gupta",
    title: "Marketing Manager",
    description: "Strategic marketer specializing in digital campaigns and brand growth initiatives.",
    emoji: "👩‍💼",
    socials: [
      { icon: "📧", color: "text-orange-600" },
      { icon: "💼", color: "text-orange-600" },
      { icon: "📱", color: "text-orange-600" },
    ],
  },
  {
    name: "Vikram Singh",
    title: "Data Scientist",
    description: "Analytics expert transforming complex data into actionable business insights.",
    emoji: "👨‍🔬",
    socials: [
      { icon: "📧", color: "text-purple-600" },
      { icon: "💼", color: "text-purple-600" },
      { icon: "📊", color: "text-purple-600" },
    ],
  },
  {
    name: "Kavya Reddy",
    title: "HR Director",
    description: "People-focused leader dedicated to building inclusive teams and fostering growth.",
    emoji: "👩‍🎓",
    socials: [
      { icon: "📧", color: "text-teal-600" },
      { icon: "💼", color: "text-teal-600" },
      { icon: "👥", color: "text-teal-600" },
    ],
  },
];

function getTitleColor(title) {
  const t = title.toLowerCase();
  if (t.includes("ceo")) return "text-blue-700";
  if (t.includes("developer")) return "text-pink-700";
  if (t.includes("director")) return "text-green-700";
  if (t.includes("manager")) return "text-orange-700";
  if (t.includes("scientist")) return "text-purple-700";
  return "text-teal-700";
}

export default function OurTeam() {
  return (
    <div
      className="min-h-screen w-full py-12 px-4 transition-all duration-700 ease-in-out bg-gradient-to-br from-[#faf7f4] to-[#f5f1eb]"
      style={{
        fontFamily: "Georgia, serif",
      }}
    >
      {/* Decorative divider */}
      <div className="text-center my-8 flex items-center justify-center">
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#b48a78] to-[#8b5a3c] mx-2"></div>
        <span className="text-[#b48a78] text-2xl">✦</span>
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#8b5a3c] to-[#b48a78] mx-2"></div>
      </div>

      {/* Header */}
      <h1 className="text-center mb-4 text-4xl md:text-5xl font-semibold text-[#2c1810] tracking-widest">
        Meet Our Team
      </h1>
      <div className="text-center text-lg md:text-xl text-[#b48a78] mb-10 italic max-w-2xl mx-auto">
        We're a passionate group of professionals dedicated to delivering exceptional results.<br />
        Get to know the talented individuals who make our success possible.
      </div>

      {/* Team List (No Card Format) */}
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {teamMembers.map((member, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-center gap-6 py-6 border-b border-[#e5d6c7] last:border-b-0"
          >
            <div className="flex-shrink-0 flex flex-col items-center w-32">
              <div className="text-6xl mb-2">{member.emoji}</div>
            </div>
            <div className="flex-1 flex flex-col items-center sm:items-start">
              <h3 className="text-2xl font-bold text-[#2c1810] mb-1">{member.name}</h3>
              <div className={`${getTitleColor(member.title)} font-semibold mb-2 tracking-wide`}>
                {member.title}
              </div>
              <div className="text-[#8b5a3c] text-base mb-3 italic text-center sm:text-left">{member.description}</div>
              <div className="flex space-x-2 mt-2">
                {member.socials.map((social, i) => (
                  <span
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${social.color} text-xl bg-[#f5f1eb] hover:bg-[#e5d6c7] transition-all duration-200 cursor-pointer`}
                  >
                    {social.icon}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="text-center mt-16">
        <div className="bg-white rounded-3xl shadow-xl border border-[#f0e6dd] p-8 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#2c1810] mb-3 tracking-wide">Want to Join Our Team?</h2>
          <p className="text-[#8b5a3c] mb-6 text-lg italic">
            We're always looking for talented individuals who share our passion for excellence.
          </p>
          <button className="bg-gradient-to-r from-[#b48a78] to-[#8b5a3c] text-white px-8 py-3 rounded-full font-semibold shadow hover:from-[#a77a65] hover:to-[#7a4a2c] transition-all duration-300 transform hover:scale-105">
            View Open Positions
          </button>
        </div>
      </div>

      {/* Decorative divider */}
      <div className="text-center mt-12">
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#b48a78] to-[#8b5a3c] mx-2"></div>
        <span className="text-[#b48a78] text-2xl">✦</span>
        <div className="inline-block w-[60px] h-[2px] bg-gradient-to-r from-[#8b5a3c] to-[#b48a3c] mx-2"></div>
      </div>
    </div>
  );
}
