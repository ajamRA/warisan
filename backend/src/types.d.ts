declare module 'pdfkit' {
  const PDFDocument: any;
  export default PDFDocument;
}

declare module 'slugify' {
  function slugify(str: string, options?: any): string;
  export default slugify;
}

declare module 'cookie-parser' {
  import { RequestHandler } from 'express';
  const cookieParser: () => RequestHandler;
  export default cookieParser;
}

declare namespace Express {
  interface Request {
    user?: {
      userId: string;
      email: string;
      role: string;
    };
  }
}