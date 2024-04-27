import { useState, type FC, type ReactElement } from 'react';

import { useGetUsersQuery } from '@/shared/store/api/usersApi';
import { LazyLoad } from '@/shared/UI/LazyLoad';

import { User } from './UI/User';
import { UserDetails } from './UI/UserDetails';

import cl from './Users.module.scss';

interface UsersProps {}

export const Users: FC<UsersProps> = (): ReactElement => {
  const { data = [], isLoading, isError } = useGetUsersQuery();
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
          {isError && <h1>Something wen't wrong. Please, try again later.</h1>}

          <ul className={cl.users__list}>
            {data.map((user) => (
              <LazyLoad key={user.id} once height="40px">
                <User user={user} onUserClick={onUserClick} />
              </LazyLoad>
            ))}
          </ul>

          {isEditVisible && <UserDetails setEditVisible={setEditVisible} userId={editUserId} />}
        </div>
      </div>
    </section>
  );
};
