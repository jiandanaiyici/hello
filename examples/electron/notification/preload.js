async function showNotification(title, options) {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification');
    return;
  }

  let notification = null;
  // 检查用户是否同意接受通知
  if (Notification.permission === 'granted') {
    notification = new Notification(title, options);
  }

  // 否则我们需要向用户获取权限
  else if (Notification.permission !== 'denied') {
    try {
      const permission = await Notification.requestPermission();
      // 如果用户接受权限，我们就可以发起一条消息
      if (permission === 'granted') {
        notification = new Notification(title, options);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
