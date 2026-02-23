import { Trophy, Medal, Award } from 'lucide-react';
import { getLeaderboard } from '@/lib/db';
import { User } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function LeaderboardPage() {
  let users: User[] = [];
  try {
    users = getLeaderboard() as User[];
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-eco-light to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-eco-dark mb-2 flex items-center gap-3">
            <Trophy className="w-10 h-10 text-yellow-500" />
            Classement des Contributeurs
          </h1>
          <p className="text-gray-600 mb-8">
            Les champions de l&apos;éducation écologique !
          </p>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {users.length === 0 ? (
              <div className="p-12 text-center text-gray-600">
                Aucun contributeur pour le moment. Soyez le premier !
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {users.map((user: User, index: number) => (
                  <div
                    key={user.id}
                    className={`p-6 flex items-center justify-between ${
                      index === 0 ? 'bg-yellow-50' : 
                      index === 1 ? 'bg-gray-50' : 
                      index === 2 ? 'bg-orange-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl font-bold w-12 text-center">
                        {index === 0 && <Trophy className="w-8 h-8 text-yellow-500 inline" />}
                        {index === 1 && <Medal className="w-8 h-8 text-gray-400 inline" />}
                        {index === 2 && <Award className="w-8 h-8 text-orange-600 inline" />}
                        {index > 2 && <span className="text-gray-500">#{index + 1}</span>}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-eco-dark">
                          {user.username}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {user.stories_count} histoire{user.stories_count > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-eco-green">
                        {user.total_points}
                      </div>
                      <div className="text-sm text-gray-500">points</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}