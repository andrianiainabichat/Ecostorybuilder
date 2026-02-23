'use client';

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

interface PDFExportProps {
  story: {
    title: string;
    content: string;
    theme: string;
    location_name: string;
    author: string;
    points: number;
  };
}

export async function generatePDF(story: PDFExportProps['story']) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { height } = page.getSize();
  let yPosition = height - 50;

  page.drawText('EcoStoryBuilder', {
    x: 50,
    y: yPosition,
    size: 24,
    font: boldFont,
    color: rgb(0.06, 0.54, 0.45),
  });

  yPosition -= 40;
  page.drawText(story.title, {
    x: 50,
    y: yPosition,
    size: 18,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  yPosition -= 30;
  page.drawText(`Theme: ${story.theme} | Lieu: ${story.location_name}`, {
    x: 50,
    y: yPosition,
    size: 10,
    font: font,
    color: rgb(0.4, 0.4, 0.4),
  });

  yPosition -= 30;
  const words = story.content.split(' ');
  let line = '';
  const maxWidth = 495;

  for (const word of words) {
    const testLine = line + word + ' ';
    const width = font.widthOfTextAtSize(testLine, 12);

    if (width > maxWidth) {
      page.drawText(line, {
        x: 50,
        y: yPosition,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
      });
      line = word + ' ';
      yPosition -= 20;

      if (yPosition < 50) break;
    } else {
      line = testLine;
    }
  }

  if (line && yPosition >= 50) {
    page.drawText(line, {
      x: 50,
      y: yPosition,
      size: 12,
      font: font,
      color: rgb(0, 0, 0),
    });
  }

  yPosition -= 40;
  if (yPosition >= 50) {
    page.drawText(`Auteur: ${story.author} | Points: ${story.points}`, {
      x: 50,
      y: yPosition,
      size: 10,
      font: font,
      color: rgb(0.4, 0.4, 0.4),
    });
  }

  page.drawText('www.ecostorybuilder.com', {
    x: 50,
    y: 30,
    size: 8,
    font: font,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

export default function PDFExport() {
  return null;
}