export default function FaqPage() {
  const faqs = [
    { question: "How do I place an order?", answer: "Browse products, add to cart, and checkout." },
    { question: "What payment methods do you accept?", answer: "We accept credit cards, PayPal, and more." },
    { question: "How can I track my order?", answer: "You will receive a tracking link via email." },
    { question: "What is your return policy?", answer: "30-day money-back guarantee on all products." },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
