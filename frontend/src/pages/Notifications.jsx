import Navigation from '../components/Navigation';
import { Bell, AlertTriangle, CheckCircle, Info, Clock, Trash2, Settings } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'delay',
      title: 'Bus B-101 Delayed',
      message: 'Your bus is running 15 minutes late due to traffic congestion on Main Road.',
      time: '5 minutes ago',
      icon: AlertTriangle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10'
    },
    {
      id: 2,
      type: 'arrived',
      title: 'Bus A-205 Arrived',
      message: 'Your booked bus has arrived at City Center. Please board quickly.',
      time: '12 minutes ago',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      id: 3,
      type: 'route_change',
      title: 'Route Change Alert',
      message: 'Bus B-302 route has been temporarily modified. New stops: Mall → Hospital → Station.',
      time: '1 hour ago',
      icon: Info,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] ">
      <Navigation />
      <main className="pt-8 pb-16 px-4 max-w-4xl mx-auto animate-fade-in-up ">
        <div className="mb-8 flex items-center justify-between ">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-red-300 to-red-800 bg-clip-text text-transparent  ">
              Notifications
            </h1>
            <p className="text-lg text-gray-400">Stay updated with your travel alerts</p>
          </div>
          <button className="border px-3 py-1 rounded flex items-center gap-2  hover:bg-red-700">
            <Settings className="h-4 w-4" /> Settings
          </button>
        </div>

        {/* Notification List */}
        <div className="space-y-4 ">
          {notifications.map((notification, index) => {
            const Icon = notification.icon;
            return (
              <div
                key={notification.id}
                className="transport-card bg-[#282828] border rounded-lg shadow p-4 flex items-start gap-4 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-3 rounded-full ${notification.bgColor}`}>
                  <Icon className={`h-5 w-5 ${notification.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-white">{notification.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-red-500 px-2 py-0.5 rounded">{notification.time}</span>
                      <button className="p-1">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">{notification.message}</p>
                  <div className="flex gap-2 mt-2">
                    <button className="border px-2 py-1 text-xs rounded cursor-pointer hover:bg-red-700 ">View Details</button>
                    {notification.type === 'delay' && (
                      <button className="border px-2 py-1 text-xs rounded cursor-pointer hover:bg-red-700">Track Bus</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        <div className="transport-card bg-[#282828] border rounded-lg shadow p-8 text-center mt-8">
          <Bell className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2  ">All Caught Up!</h3>
          <p className="text-gray-400 mb-4">
            You have no new notifications. We'll let you know when something important happens.
          </p>
          <button className="border px-4 py-2 rounded cursor-pointer hover:bg-red-700 ">Configure Alerts</button>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
