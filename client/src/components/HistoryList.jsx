import { Copy, Clock, Image as ImageIcon } from 'lucide-react';

export const HistoryList = ({ history, isLoading }) => {
  if (isLoading) {
    return <div className="text-center text-gray-500 py-10">Loading history...</div>;
  }

  if (history.length === 0) {
    return (
      <div className="text-center text-gray-400 py-10 flex flex-col items-center">
        <Clock className="w-12 h-12 mb-2 opacity-20" />
        <p>No history yet. Create your first caption!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 overflow-y-auto lg:h-[calc(100vh-14rem)] h-[calc(100vh-6rem)] pr-2 custom-scrollbar">
      {history.map((post) => (
        <div key={post._id} className="bg-white/50 backdrop-blur-sm border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 group">
          <div className="flex gap-4 items-start">
            {/* Thumbnail */}
            <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
               <img src={post.image} alt="Upload" className="w-full h-full object-cover" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                <Clock size={12} /> {new Date(post.createdAt).toLocaleDateString()}
              </p>
              
              <div className="space-y-2">
                {post.captions && Object.values(post.captions).map((cap, idx) => (
                  <div key={idx} className="bg-white rounded-md p-2 text-sm text-gray-700 border border-transparent hover:border-blue-200 transition-colors relative group/caption">
                    <p className="line-clamp-2 pr-6">{cap}</p>
                    <button 
                      className="absolute right-1 top-1 text-gray-400 hover:text-blue-500 opacity-0 group-hover/caption:opacity-100 transition-opacity"
                      onClick={() => navigator.clipboard.writeText(cap)}
                      title="Copy"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
