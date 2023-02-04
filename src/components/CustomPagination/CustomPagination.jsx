import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import style from './CustomPagination.module.scss';
import { changePage } from '../../store/article-slice';

function CustomPagination() {
  const dispatch = useDispatch();

  const articlesCount = useSelector((state) => {
    // eslint-disable-next-line no-shadow
    const { articles, articlesCount } = state.articles.articles;
    if (articles) {
      return articlesCount;
    }
  });
  const page = useSelector((state) => state.articles.page);
  const pageSize = useSelector((state) => state.articles.pageSize);

  return (
    <Pagination
      className={style.pagination}
      current={page}
      hideOnSinglePage
      pageSize={pageSize}
      total={articlesCount}
      onChange={(e) => dispatch(changePage(e))}
      showSizeChanger={false}
    />
  );
}

export default CustomPagination;
