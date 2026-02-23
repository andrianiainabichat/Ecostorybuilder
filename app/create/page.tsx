import StoryForm from '@/components/StoryForm';

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-eco-light to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-eco-dark mb-2">
            Créer une Histoire Écologique
          </h1>
          <p className="text-gray-600 mb-8">
            Utilisez l&apos;IA pour générer une histoire unique ou écrivez la vôtre. 
            Chaque histoire rapporte des points !
          </p>
          <StoryForm />
        </div>
      </div>
    </div>
  );
}