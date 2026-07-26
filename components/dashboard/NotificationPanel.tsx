import {
  AlertTriangle,
  Flame,
  Star,
} from "lucide-react";

const notifications = [
  {
    icon: Flame,
    text: "Kitchen workload is high",
  },
  {
    icon: AlertTriangle,
    text: "Tomatoes running low",
  },
  {
    icon: Star,
    text: "VIP customer arrived",
  },
];

export default function NotificationPanel() {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold">
        AI Smart Notifications
      </h2>

      <div className="space-y-5">
        {notifications.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-3"
            >
              <Icon
                className="text-orange-500"
                size={20}
              />

              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
