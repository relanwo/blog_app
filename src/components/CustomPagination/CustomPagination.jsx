/* eslint-disable no-unused-vars */
import { Pagination } from 'antd';
import style from './CustomPagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../store/article-slice';

const CustomPagination = () => {
	const dispatch = useDispatch();

	const articlesCount = useSelector((state) => {
		const { articles, articlesCount } = state.articles.articles;
		if (articles) {
			return articlesCount;
		}
	});
	const page = useSelector((state) => state.articles.page);
	const pageSize = useSelector((state) => state.articles.pageSize);

	// console.log('page >', page);

	return (
		<Pagination
			className={style['pagination']}
			current={page}
			hideOnSinglePage
			pageSize={pageSize}
			total={articlesCount}
			onChange={(e) => dispatch(changePage(e))}
			showSizeChanger={false}
		/>
	);
};

export default CustomPagination;
