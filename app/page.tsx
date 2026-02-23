import Link from 'next/link';
import { BookOpen, Map, Trophy, Sparkles, Leaf, Globe2, Users, TrendingUp, Heart, Zap } from 'lucide-react';
import StoryCard from '@/components/StoryCard';
import { getAllStories } from '@/lib/db';
import { Story } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function Home() {
  let stories: Story[] = [];
  try {
    stories = getAllStories() as Story[];
  } catch (error) {
    console.error('Error fetching stories:', error);
  }

  const totalAuthors = new Set(stories.map(s => s.author)).size;
  const totalPoints = stories.reduce((acc, s) => acc + s.points, 0);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-emerald-600 via-teal-600 to-cyan-600">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/30 shadow-lg">
              <Leaf className="w-4 h-4" />
              <span className="text-sm font-medium">Propulsé par l&apos;IA • Communauté mondiale</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              Créez des histoires qui
              <span className="block bg-linear-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mt-2">
                changent le monde
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-emerald-50 mb-12 leading-relaxed max-w-3xl mx-auto">
              Une plateforme interactive propulsée par l&apos;IA pour créer, partager et découvrir 
              des histoires éducatives sur l&apos;écologie et le développement durable
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/create"
                className="group relative px-8 py-4 bg-white text-emerald-600 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-2xl hover:shadow-3xl hover:scale-105 flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Créer une histoire
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-emerald-900 text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                  IA
                </span>
              </Link>
              <Link 
                href="/map"
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center gap-3 shadow-xl"
              >
                <Globe2 className="w-5 h-5" />
                Explorer la carte
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">{stories.length}</div>
                <div className="text-sm text-emerald-100">Histoires</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-4xl font-bold mb-1">{totalAuthors}</div>
                <div className="text-sm text-emerald-100">Créateurs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">{totalPoints}</div>
                <div className="text-sm text-emerald-100">Points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 md:h-16">
            <path
              fill="#f8fafc"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Une plateforme complète
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Tout ce dont vous avez besoin pour créer et partager des histoires écologiques
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group relative bg-linear-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 border border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-2xl transform hover:-translate-y-2">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex p-4 bg-emerald-500 rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Génération IA</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Créez des histoires captivantes en quelques secondes grâce à notre IA avancée. 
                  Personnalisez le thème, le lieu et laissez la magie opérer.
                </p>
                <Link href="/create" className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 group-hover:gap-3 gap-2 transition-all">
                  Essayer maintenant
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 hover:border-blue-300 transition-all hover:shadow-2xl transform hover:-translate-y-2">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex p-4 bg-blue-500 rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Map className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Carte interactive</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Ancrez vos histoires sur une carte mondiale interactive. 
                  Explorez les créations des autres et découvrez de nouveaux lieux.
                </p>
                <Link href="/map" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 group-hover:gap-3 gap-2 transition-all">
                  Voir la carte
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100 hover:border-amber-300 transition-all hover:shadow-2xl transform hover:-translate-y-2">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-amber-500 to-orange-500 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="relative">
                <div className="inline-flex p-4 bg-amber-500 rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Gamification</h3>
                <p className="text-slate-600 leading-relaxed mb-4">
                  Gagnez des points pour chaque histoire créée. 
                  Grimpez dans le classement et devenez un champion de l&apos;écologie.
                </p>
                <Link href="/leaderboard" className="inline-flex items-center text-amber-600 font-semibold hover:text-amber-700 group-hover:gap-3 gap-2 transition-all">
                  Voir le classement
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-6 text-sm font-semibold">
                  <Zap className="w-4 h-4" />
                  Pourquoi EcoStoryBuilder ?
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  L&apos;éducation environnementale réinventée
                </h2>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Nous croyons que les histoires ont le pouvoir de transformer les mentalités 
                  et d&apos;inspirer l&apos;action pour un avenir plus durable.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Pour les écoles</h4>
                      <p className="text-slate-600">Engagez vos élèves avec des histoires personnalisées sur l&apos;écologie</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Pour les communautés</h4>
                      <p className="text-slate-600">Partagez les enjeux locaux et sensibilisez votre région</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">Pour l&apos;impact</h4>
                      <p className="text-slate-600">Chaque histoire contribue à un mouvement mondial pour la planète</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-emerald-200 to-teal-200 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <span className="font-semibold text-slate-700">Histoires créées</span>
                      <span className="text-2xl font-bold text-emerald-600">{stories.length}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <span className="font-semibold text-slate-700">Pays représentés</span>
                      <span className="text-2xl font-bold text-blue-600">{Math.min(stories.length, 15)}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <span className="font-semibold text-slate-700">Contributeurs actifs</span>
                      <span className="text-2xl font-bold text-amber-600">{totalAuthors}</span>
                    </div>
                    <div className="p-6 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl text-white">
                      <div className="text-sm font-semibold mb-2">Impact total</div>
                      <div className="text-3xl font-bold">{totalPoints} points</div>
                      <div className="text-sm text-emerald-100 mt-2">de contribution environnementale</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">
                Histoires récentes
              </h2>
              <p className="text-xl text-slate-600">
                Découvrez les dernières créations de notre communauté mondiale
              </p>
            </div>
            {stories.length > 6 && (
              <Link 
                href="/map"
                className="mt-6 md:mt-0 inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
              >
                Voir toutes les histoires
                <span>→</span>
              </Link>
            )}
          </div>
          
          {stories.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-20">
              <div className="inline-flex p-6 bg-emerald-100 rounded-3xl mb-8">
                <BookOpen className="w-16 h-16 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Soyez le premier à créer une histoire
              </h3>
              <p className="text-xl text-slate-600 mb-8">
                Lancez le mouvement ! Créez la première histoire écologique 
                et inspirez la communauté mondiale.
              </p>
              <Link 
                href="/create"
                className="inline-flex items-center gap-3 px-8 py-4 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                <Sparkles className="w-5 h-5" />
                Créer la première histoire
              </Link>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {stories.slice(0, 6).map((story: Story) => (
                  <StoryCard key={story.id} story={story} />
                ))}
              </div>
              {stories.length > 6 && (
                <div className="text-center">
                  <Link 
                    href="/map"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-all shadow-md hover:shadow-lg"
                  >
                    Voir les {stories.length - 6} autres histoires
                    <span>→</span>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Prêt à faire la différence ?
            </h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">
              Rejoignez des milliers de créateurs qui utilisent leurs histoires 
              pour éduquer, inspirer et agir pour la planète.
            </p>
            <Link 
              href="/create"
              className="inline-flex items-center gap-3 px-10 py-5 bg-linear-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold text-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-2xl hover:shadow-3xl hover:scale-105"
            >
              <Sparkles className="w-6 h-6" />
              Commencer maintenant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}