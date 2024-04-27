import type { ComponentProps, FC, ReactElement } from 'react';

import profileIcon from '../assets/profile.svg';
import cl from './User.module.scss';

interface UserProps extends ComponentProps<'li'> {
  user: User;
  onUserClick: (id: string) => void;
}

export const User: FC<UserProps> = ({ user, onUserClick }): ReactElement => {
  return (
    <li className={cl.user} onClick={() => onUserClick(user.id)}>
      <div className={cl.user__icon}>
        <img alt="profile-icon" src={profileIcon} />
      </div>
      <div className={cl.user__name}>{user.name}</div>
    </li>
  );
};
