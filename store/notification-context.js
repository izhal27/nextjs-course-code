import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({
  notification: null,
  showNotification: function showNotification({ title, message, status }) {},
  hideNotification: function () {},
});

export const NotificationContextProvider = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    const { status } = activeNotification || {};

    if (activeNotification && (status === 'success' || status === 'error')) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
