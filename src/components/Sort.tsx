import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectFilterActiveSort, setSorting } from '../redux/slices/filterSlice';

export enum SortItemIndexEnum {
  RatingAsc = 'rating',
  RatingDesc = '-rating',
  PriceAsc = 'price',
  PriceDesc = '-price',
  TitleAsc = 'title',
  TitleDesc = '-title',
}

export type SortListItem = {
  name: string;
  index: SortItemIndexEnum;
};

export const list: SortListItem[] = [
  { name: 'популярности (по убыванию)', index: SortItemIndexEnum.RatingAsc },
  { name: 'популярности (по возрастанию)', index: SortItemIndexEnum.RatingDesc },
  { name: 'цене (по убыванию)', index: SortItemIndexEnum.PriceAsc },
  { name: 'цене (по возрастанию)', index: SortItemIndexEnum.PriceDesc },
  { name: 'алфавиту (по убыванию)', index: SortItemIndexEnum.TitleAsc },
  { name: 'алфавиту (по возрастанию)', index: SortItemIndexEnum.TitleDesc },
];

const Sort: React.FC = () => {
  const dispatch = useDispatch();

  const activeSort = useSelector(selectFilterActiveSort);

  const [isSortVisible, setIsSortVisible] = React.useState(false);

  const sortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onClickOutsideSort = (e: MouseEvent) => {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setIsSortVisible(false);
      }
    };

    document.body.addEventListener('click', onClickOutsideSort);

    return () => {
      document.body.removeEventListener('click', onClickOutsideSort);
    };
  }, []);

  const onClickCategory = (obj: SortListItem) => {
    dispatch(setSorting(obj));
    setIsSortVisible(false);
  };

  return (
    <>
      <div className="sort" ref={sortRef}>
        <div className="sort__label" onClick={() => setIsSortVisible((prev) => !prev)}>
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
              fill="#2C2C2C"
            />
          </svg>
          <b>Сортировка по:</b>
          <span>{activeSort.name}</span>
        </div>
        {isSortVisible && (
          <div className="sort__popup">
            <ul>
              {list.map((obj: SortListItem, i: number) => (
                <li
                  key={i}
                  onClick={() => onClickCategory(obj)}
                  className={obj.name === activeSort.name ? 'active' : ''}>
                  {obj.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Sort;
