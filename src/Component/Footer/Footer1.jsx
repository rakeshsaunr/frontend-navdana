import React from "react";
import { Truck, Headphones, ShieldCheck, Mail } from "lucide-react";

export default function Footer1() {
  return (
    <footer className="bg-[#2C4A52] text-gray-100">
      <div className="max-w-8xl mx-auto px-6 py-8 mt-[8px]">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-center">
          
          {/* 1. Free Shipping */}
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-lg bg-gray-800 mb-6">
              <Truck size={32} aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold">Free Shipping</h3>
            <p className="text-sm text-gray-300">
              On all orders over ₹999 — fast & tracked
            </p>
          </div>

          {/* 2. Customer Service */}
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-lg bg-gray-800 mb-3">
              <Headphones size={32} aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <p className="text-sm text-gray-300">
              Mon–Fri: 10am–6pm • Live chat & phone
             
            </p>
          </div>

          {/* 3. Secure Payments */}
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-lg bg-gray-800 mb-3">
              <ShieldCheck size={32} aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold">Secure Payments</h3>
            <p className="text-sm text-gray-300">
              PCI-compliant payment gateway & encryption
            </p>
          </div>

          {/* 4. Contact Us */}
          <div className="flex flex-col items-center">
            <div className="p-3 rounded-lg bg-gray-800 mb-3">
              <Mail size={32} aria-hidden="true" />
            </div>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-sm text-gray-300">
              Email:{" "}
              <a href="mailto:support@example.com" className="underline">
                support@navdana.com
              </a>
            </p>
            <p className="text-sm text-gray-300">
              Phone:{" "}
              <a href="tel:+911234567890" className="underline">
                +91 12345 67890
              </a>
            </p>
          </div>
        </div>

        
      </div>
    </footer>
  );
}
