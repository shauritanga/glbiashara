"use client";

import { useState } from "react";
import { useActionState } from "react";
import { MessageCircle, Phone, Mail, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendInquiry } from "@/actions/messaging";

interface ContactFormProps {
  targetType: "Academy" | "Talent";
  targetId: string;
  targetName: string;
  onSuccess?: () => void;
}

export default function ContactForm({ targetType, targetId, targetName, onSuccess }: ContactFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(
    sendInquiry.bind(null, targetType, targetId),
    null
  );

  // Handle successful submission
  if (state?.success && onSuccess) {
    onSuccess();
    setIsOpen(false);
  }

  return (
    <>
      {/* Contact Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        Contact {targetType}
      </Button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Contact {targetName}
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Send a message to get more information or start a conversation.
              </p>
            </div>

            {/* Form */}
            <form action={formAction} className="p-6 space-y-4">
              {state?.message && (
                <div className={`p-4 rounded-lg ${
                  state.success 
                    ? "bg-green-50 text-green-800 border border-green-200" 
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}>
                  {state.message}
                </div>
              )}

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={`Inquiry about ${targetName}`}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder={`Hi, I'm interested in learning more about ${targetName}...`}
                />
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">
                  Your Contact Information (Optional)
                </h4>
                
                <div>
                  <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="+255 XXX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="preferredContact" className="block text-sm text-gray-600 mb-1">
                    Preferred Contact Method
                  </label>
                  <select
                    id="preferredContact"
                    name="preferredContact"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="platform">Through Platform Messages</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone Call</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  disabled={isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-green-600 hover:bg-green-700 text-white flex items-center"
                >
                  {isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </form>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
              <p className="text-xs text-gray-500">
                Your message will be sent directly to {targetName}. They will be able to respond 
                through the platform or using your preferred contact method.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
