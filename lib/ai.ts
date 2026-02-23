import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-placeholder-key',
});

export async function generateStoryContent(
  theme: string,
  location: string,
  language: string = 'fr'
): Promise<string> {
  try {
    const prompt = `Créez une courte histoire éducative (200-300 mots) sur le thème "${theme}" située à ${location}. 
    L'histoire doit être engageante pour les enfants et les adultes, enseigner un concept écologique important, 
    et inclure des faits spécifiques sur la biodiversité ou l'environnement de cette région. 
    Écrivez en ${language === 'fr' ? 'français' : 'anglais'}.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Vous êtes un éducateur environnemental créatif qui écrit des histoires captivantes pour sensibiliser à l\'écologie.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    return completion.choices[0]?.message?.content || 'Histoire générée avec succès.';
  } catch (error) {
    console.error('AI Generation Error:', error);
    return `Il était une fois à ${location}, un lieu magique où la nature prospérait. 
    Le thème de ${theme} était au cœur de cette histoire, enseignant aux habitants l'importance 
    de préserver leur environnement pour les générations futures. Chaque geste compte dans la protection 
    de notre planète, et cette communauté l'avait bien compris.`;
  }
}

export async function enhanceStoryTitle(theme: string, location: string): Promise<string> {
  try {
    const prompt = `Créez un titre accrocheur et créatif pour une histoire écologique sur "${theme}" à ${location}. 
    Le titre doit être court (5-8 mots maximum) et captivant.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 30,
      temperature: 0.9,
    });

    return completion.choices[0]?.message?.content?.trim() || `Les Secrets Verts de ${location}`;
  } catch (error) {
    console.error('Title Generation Error:', error);
    return `Les Secrets Verts de ${location}`;
  }
}