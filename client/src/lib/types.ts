export interface VisitHistory {
    timestamps: string;
    ip: string;
    _id: string;
  }
  
 export interface ShortUrl {
    _id: string;
    fullUrl: string;
    shortUrl: string;
    visitHistory: VisitHistory[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
 export interface URLTableProps {
    shortUrls: ShortUrl[];
    loading: boolean;
    error: string | null;
  }

 export interface URLGenerationProps {
    addShortUrl: (newUrl: ShortUrl) => void;
  }  


  
  