import * as Notifications from 'expo-notifications';

export async function registerForPushNotificationsAsync(socket: Socket) {
    let token;
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);

    //Send the token through websocket
    if(token) socket.emit('notification-token', token);
}

export const IMPORTANCE_MAPPINGS = [ 'Unimportant', 'Unimportant', 'Unimportant', 'Normal', 'Normal', 'Normal', 'Important', 'Important', 'URGENT', 'URGENT'];
