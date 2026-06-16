import PDFDocument from 'pdfkit';

interface SkillData {
  title: string;
  description: string;
  category_id?: string;
  difficulty?: string;
  learning_time?: string;
  country?: string;
  content_markdown: string;
}

export function generateSkillPDF(skill: SkillData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const chunks: Buffer[] = [];

    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);

    doc.fontSize(24).text(skill.title, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(skill.description);
    doc.moveDown();
    doc.fontSize(10).text(`Category: ${skill.category_id}`);
    doc.text(`Difficulty: ${skill.difficulty}`);
    doc.text(`Learning Time: ${skill.learning_time || 'N/A'}`);
    doc.text(`Country: ${skill.country || 'N/A'}`);
    doc.moveDown();
    doc.fontSize(14).text('Instructions');
    doc.moveDown();
    doc.fontSize(11).text(skill.content_markdown);

    doc.end();
  });
}