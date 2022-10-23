import React from 'react';
import menuIcon from '../../../../theme/menuIcon.png';
import backIcon from '../../../../theme/backIcon.png';
import arrowDownIcon from '../../../../theme/arrowDownIcon.png';
import avatar from '../../../../theme/avatar.png';
import Category from './Category';

const Categories = () => {
  return (
    <div className='categories-container'>
      <Category title='По проекту' />
      <Category title='Объекты' />
      <Category title='РД' />
      <Category title='МТО' />
      <Category title='СМР' isSelected={true}/>
      <Category title='График' />
      <Category title='МиМ' />
      <Category title='Рабочие' />
      <Category title='Капвложения' />
      <Category title='Бюджет' />
      <Category title='Финансирование' />
      <Category title='Панорамы' />
      <Category title='Камеры' />
      <Category title='Поручения' />
      <Category title='Контрагенты' />
    </div>
  );
};

export default Categories;
