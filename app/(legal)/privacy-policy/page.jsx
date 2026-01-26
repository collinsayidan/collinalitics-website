export const metadata = {
  title: "Privacy Policy – Collinalitics Ltd",
  description: "How Collinalitics Ltd collects, uses, and protects personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold text-collin-navy">Privacy Policy</h1>

      <p className="text-gray-700 leading-relaxed">
        Collinalitics Ltd is committed to protecting your privacy. This Privacy Policy
        explains how we collect, use, and safeguard personal information when you use
        our website or contact us.
      </p>

      <h2 className="text-xl font-semibold text-collin-navy">Who We Are</h2>
      <p className="text-gray-700 leading-relaxed">
        Collinalitics Ltd is a UK‑based analytics and engineering consultancy.
        Registered in England & Wales. Company Number: [Your Company Number].
      </p>

      <h2 className="text-xl font-semibold text-collin-navy">Information We Collect</h2>
      <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
        <li>Information you provide directly (e.g., email enquiries).</li>
        <li>Technical data such as IP address, browser type, and device information.</li>
        <li>Analytics data to understand how visitors use our website.</li>
      </ul>

      <h2 className="text-xl font-semibold text-collin-navy">How We Use Your Information</h2>
      <ul className="list-disc pl-6 text-gray-700 leading-relaxed space-y-2">
        <li>To respond to enquiries and provide services.</li>
        <li>To improve website performance and user experience.</li>
        <li>To maintain security and prevent misuse.</li>
      </ul>

      <h2 className="text-xl font-semibold text-collin-navy">Sharing Your Data</h2>
      <p className="text-gray-700 leading-relaxed">
        We do not sell your data. We may share information with trusted service
        providers (e.g., analytics tools, scheduling tools) where necessary to operate
        our website or deliver services.
      </p>

      <h2 className="text-xl font-semibold text-collin-navy">Your Rights</h2>
      <p className="text-gray-700 leading-relaxed">
        Under UK GDPR, you have the right to access, correct, delete, or restrict the
        processing of your personal data. You may also request a copy of the data we
        hold about you.
      </p>

      <h2 className="text-xl font-semibold text-collin-navy">Contact Us</h2>
      <p className="text-gray-700 leading-relaxed">
        For privacy‑related enquiries, please contact:{" "}
        <a
          href="mailto:collinsayidan@collinalitics.co.uk"
          className="text-collin-teal underline"
        >
          collinsayidan@collinalitics.co.uk
        </a>.
      </p>
    </div>
  );
}
