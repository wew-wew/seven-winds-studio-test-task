import React from 'react';
import categoryIcon from '../../../../assets/categoryIcon.png';

const Category = ({ title, isSelected = false }: {title: string, isSelected?: boolean}) => {
  return (
    <div className={isSelected ? 'category category-selected' : 'category'}>
      <img className="category-icon" src={categoryIcon} />
      <div className="item-highlighted">{title}</div>
    </div>
  );
};

export default Category;
