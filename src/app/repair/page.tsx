"use client";
import React, { useState } from 'react';
import { Wrench, Clock, CheckCircle, Send } from 'lucide-react';
import { repairServices } from '@/data/service';

export const RepairServices: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    device: '',
    issue: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const whatsappNumber = process.env.NEXT_PUBLIC_MERCHANT_WHATSAPP_NUMBER;
    if (!whatsappNumber) {
      console.error('WhatsApp number not set in environment variables.');
      return;
    }

    const selectedServiceData = selectedService 
      ? repairServices.find(s => s.id === selectedService) 
      : null;

    const message = `Hello, I would like to request a repair quote.%0A
Name: ${formData.name}%0A
Email: ${formData.email}%0A
Phone: ${formData.phone}%0A
Device: ${formData.device}%0A
Issue: ${formData.issue}%0A
Selected Service: ${selectedServiceData?.name || 'N/A'}`;

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(whatsappURL, '_blank'); // opens in new tab
  };

  const selectedServiceData = selectedService 
    ? repairServices.find(s => s.id === selectedService) 
    : null;

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Wrench className="w-4 h-4" />
            Expert Repairs
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Professional Repair Services
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Expert technicians, genuine parts, and fast turnaround times. 
            Get your devices back to perfect working condition.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Services List */}
          <div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <Wrench className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              Our Services
            </h3>
            <div className="grid gap-4">
              {repairServices.map(service => (
                <div
                  key={service.id}
                  className={`group border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    selectedService === service.id 
                      ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 shadow-lg scale-[1.02]' 
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
                  }`}
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {service.name}
                    </h4>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full">
                      <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-medium">{service.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full">
                      <Wrench className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span className="font-medium capitalize">{service.category}</span>
                    </div>
                  </div>
                  {selectedService === service.id && (
                    <div className="mt-4 flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 animate-in slide-in-from-top duration-200">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-semibold">Selected Service</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quote Form */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-0 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 p-8 border-b border-indigo-100 dark:border-indigo-900">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Request Repair Quote</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-2">Fill out the form and we'll get back to you within 24 hours</p>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    placeholder="+233 123 456 789"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Device Type
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., iPhone 14 Pro, MacBook Air M2"
                    value={formData.device}
                    onChange={(e) => setFormData({...formData, device: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Describe the Issue
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Please describe the problem with your device..."
                    value={formData.issue}
                    onChange={(e) => setFormData({...formData, issue: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
                  />
                </div>

                {selectedServiceData && (
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 p-5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 animate-in slide-in-from-top duration-200">
                    <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-1">
                      Selected Service:
                    </p>
                    <p className="font-bold text-lg text-indigo-900 dark:text-indigo-100">
                      {selectedServiceData.name} 
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-6 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Get Repair Quote</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairServices;


// "use client";
// import React, { useState } from 'react';
// import { Wrench, Clock, DollarSign, CheckCircle, Send } from 'lucide-react';
// import { repairServices } from '@/data/service';

// export const RepairServices: React.FC = () => {
//   const [selectedService, setSelectedService] = useState<string | null>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     device: '',
//     issue: ''
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     alert('Repair request submitted! We\'ll contact you within 24 hours.');
//     setFormData({ name: '', email: '', phone: '', device: '', issue: '' });
//     setSelectedService(null);
//   };

//   const selectedServiceData = selectedService 
//     ? repairServices.find(s => s.id === selectedService) 
//     : null;

//   return (
//     <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-full text-sm font-semibold mb-4">
//             <Wrench className="w-4 h-4" />
//             Expert Repairs
//           </div>
//           <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
//             Professional Repair Services
//           </h2>
//           <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
//             Expert technicians, genuine parts, and fast turnaround times. 
//             Get your devices back to perfect working condition.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Services List */}
//           <div>
//             <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
//               <Wrench className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
//               Our Services
//             </h3>
//             <div className="grid gap-4">
//               {repairServices.map(service => (
//                 <div
//                   key={service.id}
//                   className={`group border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
//                     selectedService === service.id 
//                       ? 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 shadow-lg scale-[1.02]' 
//                       : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700'
//                   }`}
//                   onClick={() => setSelectedService(service.id)}
//                 >
//                   <div className="flex items-start justify-between mb-3">
//                     <h4 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
//                       {service.name}
//                     </h4>
//                     <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                       {/* ${service.price} */}
//                     </span>
//                   </div>
//                   <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">
//                     {service.description}
//                   </p>
//                   <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
//                     <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full">
//                       <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
//                       <span className="font-medium">{service.duration}</span>
//                     </div>
//                     <div className="flex items-center space-x-1.5 bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-full">
//                       <Wrench className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
//                       <span className="font-medium capitalize">{service.category}</span>
//                     </div>
//                   </div>
//                   {selectedService === service.id && (
//                     <div className="mt-4 flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 animate-in slide-in-from-top duration-200">
//                       <CheckCircle className="w-5 h-5" />
//                       <span className="text-sm font-semibold">Selected Service</span>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Quote Form */}
//           <div className="lg:sticky lg:top-24 h-fit">
//             <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-0 overflow-hidden">
//               <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 p-8 border-b border-indigo-100 dark:border-indigo-900">
//                 <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Request Repair Quote</h3>
//                 <p className="text-slate-600 dark:text-slate-400 mt-2">Fill out the form and we'll get back to you within 24 hours</p>
//               </div>
              
//               <form onSubmit={handleSubmit} className="p-8 space-y-5">
//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
//                     Full Name
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={(e) => setFormData({...formData, name: e.target.value})}
//                     className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
//                     placeholder="John Doe"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={(e) => setFormData({...formData, email: e.target.value})}
//                     className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
//                     placeholder="john@example.com"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     required
//                     value={formData.phone}
//                     onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                     className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
//                     placeholder="+233 123 456 789"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
//                     Device Type
//                   </label>
//                   <input
//                     type="text"
//                     required
//                     placeholder="e.g., iPhone 14 Pro, MacBook Air M2"
//                     value={formData.device}
//                     onChange={(e) => setFormData({...formData, device: e.target.value})}
//                     className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
//                     Describe the Issue
//                   </label>
//                   <textarea
//                     required
//                     rows={4}
//                     placeholder="Please describe the problem with your device..."
//                     value={formData.issue}
//                     onChange={(e) => setFormData({...formData, issue: e.target.value})}
//                     className="w-full px-4 py-3 border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
//                   />
//                 </div>

//                 {selectedServiceData && (
//                   <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 p-5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 animate-in slide-in-from-top duration-200">
//                     <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-1">
//                       Selected Service:
//                     </p>
//                     <p className="font-bold text-lg text-indigo-900 dark:text-indigo-100">
//                       {selectedServiceData.name} 
//                     </p>
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 px-6 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center space-x-2"
//                 >
//                   <Send className="w-5 h-5" />
//                   <span>Get Repair Quote</span>
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
//   export default RepairServices;