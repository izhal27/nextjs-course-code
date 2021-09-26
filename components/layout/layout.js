import { Fragment, useContext } from 'react';

import MainHeader from './main-header';
import NotificationContext from '../../store/notification-context';
import Notification from '../ui/notification';

function Layout({ children }) {
  const { notification } = useContext(NotificationContext);

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {notification && <Notification {...notification} />}
    </Fragment>
  );
}

export default Layout;
