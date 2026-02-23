import MapView from '@/components/MapView';

export default function MapPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-eco-dark text-green py-4 px-4">
        <h1 className="text-2xl font-bold">Carte Interactive des Histoires</h1>
        <p className="text-sm text-eco-light">
          Cliquez sur les marqueurs pour découvrir les histoires écologiques
        </p>
      </div>
      <div className="flex-1">
        <MapView />
      </div>
    </div>
  );
}