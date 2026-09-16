export type InvitationData = {
    brideName: string;
    groomName: string;
  
    date: string;
    time: string;
  
    venue: string;
    address: string;
  
    intro?: string;
    story?: string;
  
    coverImage?: string;
  
    gallery?: string[];
  
    musicUrl?: string;
  
    googleMapsUrl?: string;
  
    rsvpEnabled?: boolean;
  };
  
  export type TemplateProps = {
    data?: Partial<InvitationData>;
    preview?: boolean;
  };