import { useState, type FC, type ReactElement } from 'react';

import { useGetUsersQuery } from '@/shared/store/api/usersApi';

import { UserDetails } from './UserDetails';

import profileIcon from './assets/profile.svg';
import cl from './Users.module.scss';

interface UsersProps {}

export const Users: FC<UsersProps> = (): ReactElement => {
  const { data = [], isLoading } = useGetUsersQuery();
  const [editUserId, setEditUserId] = useState('0');
  const [isEditVisible, setEditVisible] = useState(false);

  const onUserClick = (id: string) => {
    setEditUserId(id);
    setEditVisible(true);
  };

  return (
    <section className={cl.users}>
      <div className="users__container">
        <div className={cl.users__body}>
          {isLoading && <h1>Loading...</h1>}

          <ul className={cl.users__list}>
            {data.map((user) => (
              <li key={user.id} className={cl.user} onClick={() => onUserClick(user.id)}>
                <div className={cl.user__icon}>
                  <img alt="profile-icon" src={profileIcon} />
                </div>
                <div className={cl.user__name}>{user.name}</div>
              </li>
            ))}
          </ul>

          {isEditVisible && <UserDetails setEditVisible={setEditVisible} userId={editUserId} />}
        </div>
      </div>
    </section>
  );
};
