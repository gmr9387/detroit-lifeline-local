import React, { useState } from 'react';
import { Phone, MessageCircle, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface EmergencyContact {
  id: string;
  name: string;
  description: string;
  phone: string;
  website?: string;
  textNumber?: string;
  hours: string;
  category: 'crisis' | 'health' | 'safety' | 'resources';
  urgent: boolean;
}

const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: '988',
    name: '988 Suicide & Crisis Lifeline',
    description: 'Free, confidential 24/7 treatment referral and information service for individuals and families facing mental health and/or substance use disorders.',
    phone: '988',
    website: 'https://988lifeline.org',
    textNumber: '988',
    hours: '24/7',
    category: 'crisis',
    urgent: true,
  },
  {
    id: '211',
    name: '2-1-1 United Way',
    description: 'Comprehensive information and referral service that connects people with local resources for basic needs, health care, and crisis support.',
    phone: '2-1-1',
    website: 'https://www.211.org',
    hours: '24/7',
    category: 'resources',
    urgent: false,
  },
  {
    id: 'domestic-violence',
    name: 'National Domestic Violence Hotline',
    description: 'Confidential support for domestic violence survivors and anyone seeking resources and information.',
    phone: '1-800-799-7233',
    website: 'https://www.thehotline.org',
    textNumber: 'Text START to 88788',
    hours: '24/7',
    category: 'crisis',
    urgent: true,
  },
  {
    id: 'child-abuse',
    name: 'Childhelp National Child Abuse Hotline',
    description: 'Professional crisis counselors for anyone experiencing child abuse or who suspect child abuse.',
    phone: '1-800-422-4453',
    website: 'https://www.childhelp.org',
    hours: '24/7',
    category: 'crisis',
    urgent: true,
  },
  {
    id: 'substance-abuse',
    name: 'SAMHSA National Helpline',
    description: 'Treatment referral and information service for individuals and families facing substance abuse and mental health disorders.',
    phone: '1-800-662-4357',
    website: 'https://www.samhsa.gov',
    hours: '24/7',
    category: 'health',
    urgent: false,
  },
  {
    id: 'elder-abuse',
    name: 'Elder Abuse Hotline',
    description: 'Report elder abuse, neglect, or exploitation. Connects to local Adult Protective Services.',
    phone: '1-800-677-1116',
    website: 'https://eldercare.acl.gov',
    hours: 'Monday-Friday 9AM-8PM ET',
    category: 'crisis',
    urgent: true,
  },
  {
    id: 'disaster',
    name: 'FEMA Disaster Assistance',
    description: 'Federal disaster relief and assistance for individuals and communities affected by disasters.',
    phone: '1-800-621-3362',
    website: 'https://www.disasterassistance.gov',
    hours: '24/7',
    category: 'resources',
    urgent: false,
  },
  {
    id: 'poison-control',
    name: 'Poison Control Center',
    description: 'Emergency poison treatment advice and information about poisoning prevention.',
    phone: '1-800-222-1222',
    website: 'https://www.poison.org',
    hours: '24/7',
    category: 'health',
    urgent: true,
  },
];

export const EmergencyHotlines: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const urgentContacts = EMERGENCY_CONTACTS.filter(contact => contact.urgent);
  const otherContacts = EMERGENCY_CONTACTS.filter(contact => !contact.urgent);

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleText = (textNumber: string) => {
    if (textNumber.includes('Text')) {
      // Handle special text formats like "Text START to 88788"
      const number = textNumber.match(/\d{5,}/)?.[0];
      if (number) {
        window.location.href = `sms:${number}`;
      }
    } else {
      window.location.href = `sms:${textNumber}`;
    }
  };

  const renderContact = (contact: EmergencyContact) => (
    <Card key={contact.id} className="card-elevated">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {contact.name}
              {contact.urgent && (
                <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded-full">
                  URGENT
                </span>
              )}
            </CardTitle>
            <CardDescription className="mt-1">
              {contact.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            <strong>Hours:</strong> {contact.hours}
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button
              variant={contact.urgent ? "destructive" : "default"}
              size="sm"
              onClick={() => handleCall(contact.phone)}
              className="flex-1 min-w-fit"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call {contact.phone}
            </Button>
            
            {contact.textNumber && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleText(contact.textNumber)}
                className="flex-1 min-w-fit"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Text
              </Button>
            )}
            
            {contact.website && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(contact.website, '_blank')}
                className="flex-1 min-w-fit"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Website
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Emergency & Crisis Support</h2>
        <p className="text-muted-foreground">
          Immediate help and resources available 24/7
        </p>
      </div>

      {/* Life-threatening emergency notice */}
      <Card className="border-destructive bg-destructive/5">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-destructive">🚨 Life-Threatening Emergency?</h3>
            <p className="text-sm text-destructive/80">
              Call <strong>911</strong> immediately for police, fire, or medical emergencies
            </p>
            <Button
              variant="destructive"
              onClick={() => handleCall('911')}
              className="w-full"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call 911 Now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Crisis and urgent contacts */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Crisis Support</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {urgentContacts.map(renderContact)}
        </div>
      </div>

      {/* Other resources */}
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full">
            <span>More Resources & Information</span>
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 ml-2" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-2" />
            )}
          </Button>
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            {otherContacts.map(renderContact)}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Footer message */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <div className="text-center space-y-2">
            <h4 className="font-medium">You Are Not Alone</h4>
            <p className="text-sm text-muted-foreground">
              These resources are here to help. If you're in crisis, reach out now. 
              Your life matters and help is available.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
