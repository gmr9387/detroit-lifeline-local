import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-gray max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Introduction</h2>
            <p className="text-foreground/80 leading-relaxed">
              The Detroit Resource Navigator is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our service to find local assistance programs and resources.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-foreground/80 space-y-1">
                  <li>Household size and composition</li>
                  <li>Income level (ranges only)</li>
                  <li>Zip code and neighborhood</li>
                  <li>Primary needs and assistance categories</li>
                  <li>Language preferences</li>
                  <li>Demographic information (veteran status, disability status, student status)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-foreground mb-2">Usage Information</h3>
                <ul className="list-disc list-inside text-foreground/80 space-y-1">
                  <li>Programs you view and apply to</li>
                  <li>Search queries and filters used</li>
                  <li>Application status and progress</li>
                  <li>Favorite programs and saved resources</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">How We Use Your Information</h2>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li>To personalize program recommendations based on your eligibility and needs</li>
              <li>To improve the accuracy of our resource matching</li>
              <li>To track application progress and provide status updates</li>
              <li>To generate anonymous usage statistics and improve our service</li>
              <li>To connect you with appropriate assistance programs and resources</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Information Storage</h2>
            <p className="text-foreground/80 leading-relaxed">
              Your profile information is stored locally in your browser and is not transmitted to external servers unless you explicitly choose to apply for programs. When you apply for programs, only necessary information is shared with the relevant program administrators.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Information Sharing</h2>
            <div className="space-y-4">
              <p className="text-foreground/80 leading-relaxed">We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:</p>
              <ul className="list-disc list-inside text-foreground/80 space-y-1">
                <li>With program administrators when you choose to apply for their services</li>
                <li>With your explicit consent for specific purposes</li>
                <li>When required by law or to protect our legal rights</li>
                <li>In aggregated, anonymized form for research and improvement purposes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Your Rights</h2>
            <ul className="list-disc list-inside text-foreground/80 space-y-2">
              <li><strong>Access:</strong> You can view and update your profile information at any time</li>
              <li><strong>Deletion:</strong> You can delete your profile and all associated data from your device</li>
              <li><strong>Portability:</strong> You can export your data for use with other services</li>
              <li><strong>Correction:</strong> You can update incorrect information in your profile</li>
              <li><strong>Withdrawal:</strong> You can opt out of data collection at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Data Security</h2>
            <p className="text-foreground/80 leading-relaxed">
              We implement appropriate security measures to protect your information. Your data is encrypted in transit and stored securely. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Children's Privacy</h2>
            <p className="text-foreground/80 leading-relaxed">
              Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Changes to This Policy</h2>
            <p className="text-foreground/80 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-3">Contact Us</h2>
            <p className="text-foreground/80 leading-relaxed">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-muted p-4 rounded-lg mt-3">
              <p className="text-foreground"><strong>Detroit Resource Navigator</strong></p>
              <p className="text-foreground/80">Email: privacy@detroitresources.org</p>
              <p className="text-foreground/80">Phone: (313) 555-0123</p>
              <p className="text-foreground/80">Address: 123 Main Street, Detroit, MI 48201</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;