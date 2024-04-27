import type { ChangeEvent } from 'react';
import { useEffect, useState, type FC, type ReactElement } from 'react';

import { useGetUserQuery, useUpdateUserMutation } from '@/shared/store/api/usersApi';

import { CustomInput } from '@/shared/UI/CustomInput';

import profileIcon from '../assets/profile.svg';
import cl from './UserDetails.module.scss';

interface UserDetailsProps {
  userId: string;
  setEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserDetails: FC<UserDetailsProps> = ({ userId, setEditVisible }): ReactElement => {
  const { data, isLoading } = useGetUserQuery(userId);
  const [updateUser] = useUpdateUserMutation();

  const [name, setName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [department, setDepartment] = useState('');
  const [company, setCompany] = useState('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };

  const handleUpdateUser = async () => {
    const newData = {
      id: data!.id,
      name,
      jobTitle,
      department,
      company,
    };

    await updateUser(newData).unwrap();
    setEditVisible(false);
  };

  useEffect(() => {
    setName(data?.name || '');
    setJobTitle(data?.jobTitle || '');
    setDepartment(data?.department || '');
    setCompany(data?.company || '');
  }, [data]);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className={cl.details}>
      <div className={cl.details__header}>
        <input className={cl.details__input} type="text" value={name} onChange={handleNameChange} />
      </div>
      <div className={cl.details__body}>
        <div className={cl.details__avatar}>
          <img alt="profile-icon" src={profileIcon} />
        </div>
        <div className={cl.details__info}>
          <CustomInput label="Должность" name="jobTitleInput" setValue={setJobTitle} value={jobTitle} />
          <CustomInput label="Отдел" name="departmentInput" setValue={setDepartment} value={department} />
          <CustomInput label="Компания" name="companyInput" setValue={setCompany} value={company} />
        </div>
      </div>
      <button className={cl.details__button} onClick={handleUpdateUser}>
        Сохранить
      </button>
    </div>
  );
};
