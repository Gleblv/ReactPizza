import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import { appContext } from '../App';
import { list } from '../components/Sort';
import { setFiltersParams } from '../redux/slices/filterSlice';
import { setItems, fetchPizzas } from '../redux/slices/pizzasSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activeCategoryId, activeSort, currnetPage } = useSelector((state) => state.filter);
  const { items, status } = useSelector((state) => state.pizzas);

  // const [pizzasIsLodaing, setPizzasIsLodaing] = React.useState(true);

  const isSearched = useRef(false);
  const isFirstRender = useRef(true);

  const { searchValue } = React.useContext(appContext);

  const fetchData = async () => {
    const categoryType = activeCategoryId > 0 ? `category=${activeCategoryId}` : '';
    const filtredSortString = activeSort.index.replace('-', '');
    const filtredType = activeSort.index.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    // setPizzasIsLodaing(true);

    dispatch(
      fetchPizzas({
        categoryType,
        filtredSortString,
        filtredType,
        search,
        currnetPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  // Если был первый рендер то проверяем параметры и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      dispatch(
        setFiltersParams({
          activeCategoryId: params.activeCategoryId,
          currnetPage: params.currnetPage,
          activeSort: list.find((obj) => obj.index === params.filtredType),
        }),
      );

      isSearched.current = true;
    }
  }, []);

  // Если был первый рендер то запрашиваем пиццы
  React.useEffect(() => {
    if (!isSearched.current) {
      fetchData();
    }

    isSearched.current = false;
  }, [activeCategoryId, activeSort, searchValue, currnetPage]);

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (!isFirstRender.current) {
      const query = qs.stringify({
        activeCategoryId,
        filtredType: activeSort.index,
        currnetPage,
      });

      navigate(`?${query}`);
    }

    isFirstRender.current = false;
  }, [activeCategoryId, activeSort, currnetPage]);

  return (
    <>
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          {status === 'error' ? (
            <div class="content__error">
              <h2>
                Произошла ошибка <icon>😕</icon>
              </h2>
              <p>К сожалению не удалось получить питсы. Попробуйте повторить попытку позже.</p>
            </div>
          ) : (
            <div className="content__items">
              {status === 'loading'
                ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
                : items && items.map((obj, i) => <PizzaBlock key={i} {...obj} />)}
            </div>
          )}
          <Pagination />
        </div>
      </div>
    </>
  );
};

export default Home;
