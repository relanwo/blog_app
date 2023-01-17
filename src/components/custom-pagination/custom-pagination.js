/* eslint-disable no-unused-vars */
import { Pagination } from 'antd';
import style from './custom-pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../store/paginationSlice';

const CustomPagination = () => {
	const dispatch = useDispatch();

  const articlesCount = useSelector((state) => {
    const { articles, articlesCount } = state.articles.articles;
		if (articles) {
			return articlesCount; 
		}
	});
  const page = useSelector((state) => state.pagination.page)

  console.log('page >',page)

	return (
		<Pagination 
      className={style['pagination']} 
      current={page}
      hideOnSinglePage
      pageSize={20}
      total={articlesCount}
      onChange={(e) => dispatch(changePage(e))}
      showSizeChanger={false}
    />
	);
};

export default CustomPagination;
