// Footer2.jsx
import {
  Facebook,
  Instagram,
  CreditCard,
} from "lucide-react";

export default function Footer2() {
  const categories = [
    "Suit Set",
    "Tie Dye",
    "Luxe",
    "Kurtas",
    "Co-ord Sets",
    "Tunics",
    "Bestsellers",
    "All Products",
  ];

  const information = [
    "About Us",
    "Refund Policy",
    "Blog",
    "Terms & Conditions",
    "Contact Us",
  ];

  const policies = [
    "Return/Exchange Request",
    "Shipping Policy",
    "Privacy Policy",
    "Return & Exchange Policy",
  ];

  // ✅ Team data (with photo + role)
  const team = [
    {
      name: "Mis Kavita",
      photo: "/Images/PNG 2.png",
      work: "Founder",
    },
    {
      name: "Mis Kiran",
      photo: "/Images/PNG 2.png",
      work: "Tem Leader",
    },
    {
      name: "Mis Twinkle",
      photo: "/Images/PNG.png",
      work: "Helping and Sporting",
    },
    {
      name: "Mr Prakash",
      photo: "public/Images/MAN.png",
      work: "Devlop and Design",
    },
  ];

  return (
    <footer className="bg-[#000] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top: 4 equal sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Section 1: Categories */}
          <div>
            <h4 className="text-sm tracking-widest font-semibold mb-4">
              CATEGORIES
            </h4>
            <ul className="space-y-2 text-sm/relaxed">
              {categories.map((item) => (
                <li key={item} className="hover:opacity-90 cursor-default">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 2: Information */}
          <div>
            <h4 className="text-sm tracking-widest font-semibold mb-4">
              INFORMATION
            </h4>
            <ul className="space-y-2 text-sm/relaxed">
              {information.map((item) => (
                <li key={item} className="hover:opacity-90 cursor-default">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Policies */}
          <div>
            <h4 className="text-sm tracking-widest font-semibold mb-4">
              POLICIES
            </h4>
            <ul className="space-y-2 text-sm/relaxed">
              {policies.map((item) => (
                <li key={item} className="hover:opacity-90 cursor-default">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Section 4: Team */}
          <div>
            <h4 className="text-sm tracking-widest font-semibold mb-4">
              TEAM'S
            </h4>
            <ul className="space-y-3">
              {team.map((m) => (
                <li key={m.name} className="flex items-center gap-3">
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-white/40"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{m.name}</span>
                    <span className="text-xs text-gray-300">{m.work}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom line: Follow Us + We Accept side by side */}
        <div className="mt-10 border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between gap-8">
          {/* Follow Us */}
          <div>
            <h5 className="text-sm font-semibold tracking-widest mb-3">
              FOLLOW US
            </h5>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="inline-flex p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
              >
                <Facebook className="h-5 w-5 text-[#1778F2]" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
              >
                <Instagram className="h-5 w-5 text-pink-500" />
              </a>
              {/* Twitter */}
              <a
                href="#"
                aria-label="Twitter"
                className="inline-flex p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 text-sky-400"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-5 w-5 text-blue-700"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.354V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.598 0 4.262 2.368 4.262 5.452v6.289zM5.337 7.433a2.062 2.062 0 01-2.063-2.064c0-1.138.925-2.063 2.063-2.063 1.137 0 2.063.925 2.063 2.063 0 1.139-.926 2.064-2.063 2.064zm1.777 13.019H3.56V9h3.554v11.452zM22.225 0H1.771C.792 0 0 .771 0 1.729v20.542C0 23.229.792 24 1.771 24h20.451C23.2 24 24 23.229 24 22.271V1.729C24 .771 23.2 0 22.225 0z" />
                </svg>
              </a>
              {/* Email */}
              <a
                href="mailto:info@example.com"
                aria-label="Email"
                className="inline-flex p-2 rounded-md bg-white/10 hover:bg-white/20 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 
                    1.103.897 2 2 2h16c1.103 0 2-.897 
                    2-2V6c0-1.103-.897-2-2-2zm0 
                    2l-8 5-8-5h16zm0 12H4V8l8 
                    5 8-5v10z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* We Accept */}
          <div>
            <h5 className="text-sm font-semibold tracking-widest mb-3">
              WE ACCEPT
            </h5>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <span className="text-xs mt-1">Visa Card</span>
              </div>
              <div className="flex flex-col items-center">
                <CreditCard className="h-6 w-6 text-green-600" />
                <span className="text-xs mt-1">RuPay</span>
              </div>
              <div className="flex flex-col items-center">
                <CreditCard className="h-6 w-6 text-sky-500" />
                <span className="text-xs mt-1">Paytm</span>
              </div>
              <div className="flex flex-col items-center">
                <CreditCard className="h-6 w-6 text-indigo-500" />
                <span className="text-xs mt-1">GooglePay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
