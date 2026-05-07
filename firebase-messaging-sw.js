// firebase-messaging-sw.js
// プッシュ通知をバックグラウンドで受信するためのService Worker
//
// FCMは `notification` フィールドのある payload を自動で通知表示する。
// onBackgroundMessage を実装するとそこでも表示してしまい二重表示になるので、
// このSWでは onBackgroundMessage は実装せず、自動表示に任せる。

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

// FCMの初期化（必須、これだけで自動通知表示が有効になる）
firebase.messaging();

// 通知タップでアプリを開く処理だけ追加
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/condition-kazutan-manager/')
  );
});
