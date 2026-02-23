'use client';

import { MapPin, User, Calendar, Award, Download, ExternalLink, Share2, Check } from 'lucide-react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { useState } from 'react';

interface StoryCardProps {
  story: {
    id?: number;
    title: string;
    content: string;
    location_name: string;
    theme: string;
    author: string;
    points: number;
    created_at?: string;
  };
}

export default function StoryCard({ story }: StoryCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isShared, setIsShared] = useState(false);

  const cleanText = (text: string): string => {
    return text
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ýÿ]/g, 'y')
      .replace(/[ç]/g, 'c')
      .replace(/[ñ]/g, 'n')
      .replace(/[ÀÁÂÃÄÅ]/g, 'A')
      .replace(/[ÈÉÊË]/g, 'E')
      .replace(/[ÌÍÎÏ]/g, 'I')
      .replace(/[ÒÓÔÕÖ]/g, 'O')
      .replace(/[ÙÚÛÜ]/g, 'U')
      .replace(/[Ý]/g, 'Y')
      .replace(/[Ç]/g, 'C')
      .replace(/[Ñ]/g, 'N')
      .replace(/[œ]/g, 'oe')
      .replace(/[æ]/g, 'ae')
      .replace(/['']/g, "'")
      .replace(/[""]/g, '"')
      .replace(/[–—]/g, '-')
      .replace(/[…]/g, '...')
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const handleShare = async () => {
    const shareText = `${story.title}\n\n${story.content.substring(0, 200)}${story.content.length > 200 ? '...' : ''}\n\n📍 ${story.location_name}\n🌿 Thème: ${story.theme}\n✍️ Par ${story.author}\n\n#EcoStoryBuilder #Écologie #DéveloppementDurable`;
    
    // Vérifier si l'API Web Share est disponible
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: shareText,
          url: window.location.href,
        });
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (error) {
        // L'utilisateur a annulé le partage ou une erreur s'est produite
        if ((error as Error).name !== 'AbortError') {
          console.error('Erreur lors du partage:', error);
          // Fallback vers le presse-papier
          handleCopyToClipboard(shareText);
        }
      }
    } else {
      // Fallback: copier dans le presse-papier
      handleCopyToClipboard(shareText);
    }
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
      // Optionnel: afficher une notification
      alert('✅ Histoire copiée dans le presse-papier !');
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
      alert('❌ Impossible de copier le texte');
    }
  };

  const handleExportPDF = async () => {
    setIsDownloading(true);
    try {
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
      
      const cleanTitle = cleanText(story.title);
      page.drawText(cleanTitle, {
        x: 50,
        y: yPosition,
        size: 18,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      yPosition -= 30;
      
      const cleanTheme = cleanText(story.theme);
      const cleanLocation = cleanText(story.location_name);
      page.drawText(`Theme: ${cleanTheme} | Lieu: ${cleanLocation}`, {
        x: 50,
        y: yPosition,
        size: 10,
        font: font,
        color: rgb(0.4, 0.4, 0.4),
      });

      yPosition -= 30;
      
      const cleanContent = cleanText(story.content);
      const words = cleanContent.split(' ');
      let line = '';
      const maxWidth = 495;

      for (const word of words) {
        const testLine = line + word + ' ';
        const width = font.widthOfTextAtSize(testLine, 12);

        if (width > maxWidth && line.length > 0) {
          page.drawText(line.trim(), {
            x: 50,
            y: yPosition,
            size: 12,
            font: font,
            color: rgb(0, 0, 0),
          });
          line = word + ' ';
          yPosition -= 20;
          
          if (yPosition < 50) {
            break;
          }
        } else {
          line = testLine;
        }
      }

      if (line.trim().length > 0 && yPosition >= 50) {
        page.drawText(line.trim(), {
          x: 50,
          y: yPosition,
          size: 12,
          font: font,
          color: rgb(0, 0, 0),
        });
        yPosition -= 30;
      }

      if (yPosition >= 50) {
        const cleanAuthor = cleanText(story.author);
        page.drawText(`Auteur: ${cleanAuthor} | Points: ${story.points}`, {
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
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${cleanText(story.title).replace(/[^a-z0-9]/gi, '_')}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Erreur lors de la génération du PDF. Veuillez réessayer.');
    } finally {
      setIsDownloading(false);
    }
  };

  const getThemeGradient = (theme: string) => {
    const gradients: { [key: string]: string } = {
      'biodiversité': 'from-green-500 to-emerald-500',
      'recyclage': 'from-blue-500 to-cyan-500',
      'eau': 'from-cyan-500 to-blue-500',
      'forêts': 'from-emerald-500 to-green-600',
      'climat': 'from-orange-500 to-red-500',
      'énergie renouvelable': 'from-yellow-500 to-orange-500',
      'agriculture durable': 'from-lime-500 to-green-500',
      'océans': 'from-blue-600 to-indigo-600',
    };
    return gradients[theme] || 'from-gray-500 to-gray-600';
  };

  return (
    <article className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-emerald-300 flex flex-col h-full hover:-translate-y-1">
      {/* Header with gradient */}
      <div className={`bg-linear-to-br ${getThemeGradient(story.theme)} p-6 text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="relative">
          <div className="flex items-start justify-between mb-3">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-semibold">
              {story.theme}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-400 text-yellow-900 rounded-lg text-xs font-bold shadow-lg">
              <Award className="w-3.5 h-3.5" />
              {story.points}
            </span>
          </div>
          <h3 className="text-xl font-bold leading-tight line-clamp-2 min-h-[3.5rem]">
            {story.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <p className={`text-slate-600 leading-relaxed mb-5 ${isExpanded ? '' : 'line-clamp-3'}`}>
          {story.content}
        </p>
        
        {story.content.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-emerald-600 hover:text-emerald-700 font-semibold text-sm mb-5 text-left transition-colors"
          >
            {isExpanded ? 'Voir moins ←' : 'Lire plus →'}
          </button>
        )}

        {/* Meta Info */}
        <div className="space-y-2.5 text-sm text-slate-600 mt-auto pt-5 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="truncate font-medium">{story.location_name}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">{story.author}</span>
          </div>
          {story.created_at && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                {new Date(story.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            onClick={handleExportPDF}
            disabled={isDownloading}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all font-semibold disabled:opacity-50 shadow-sm hover:shadow-md"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Export...' : 'PDF'}
          </button>
          <button 
            onClick={handleShare}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all font-semibold shadow-md hover:shadow-lg ${
              isShared 
                ? 'bg-green-600 text-white' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {isShared ? (
              <>
                <Check className="w-4 h-4" />
                Partagé !
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4" />
                Partager
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}