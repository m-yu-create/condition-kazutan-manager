// firebase-messaging-sw.js
// プッシュ通知をバックグラウンドで受信するためのService Worker

importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC-ujNsGgvWfv2L8XONYFRYAo6tpku1BH0",
  authDomain: "condition-kazutan-manager.firebaseapp.com",
  databaseURL: "https://condition-kazutan-manager-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "condition-kazutan-manager",
  storageBucket: "condition-kazutan-manager.firebasestorage.app",
  messagingSenderId: "843970162374",
  appId: "1:843970162374:web:fe2d6b9bf3efc87aeef1c7"
});

const messaging = firebase.messaging();

// アプリが閉じている時の通知ハンドリング
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] バックグラウンド通知:', payload);

  const notificationTitle = (payload.notification && payload.notification.title) || 'かずたんマネージャー';
  const notificationOptions = {
    body: (payload.notification && payload.notification.body) || '新しい記録があります',
    icon: '/condition-kazutan-manager/icon-192.png',
    badge: '/condition-kazutan-manager/icon-192.png',
    tag: 'kazutan-notification'
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// 通知をタップしたらアプリを開く
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/condition-kazutan-manager/')
  );
});
