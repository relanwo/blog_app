/* eslint-disable no-unused-vars */
import { useLocation, useNavigate } from 'react-router-dom';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import SignIn from '../SignIn/SignIn';

function LoginPage() {
	// console.log('useParams', useParams())
	// const { slug } = useParams();

	// const articles = useSelector((state) => {
	// 	if (state.articles.articles) {
	// 		const { articles } = state.articles.articles;
	// 		return articles;
	// 	} else {
	// 		return [];
	// 	}
	// });

	// // let element
	// useEffect(() => {
	// }, [])
	// const element = Array.isArray(articles) && articles.find((res) => (res.slug === slug))

	// const params = useMemo(() => {
	//   return element
	// }, [element])

	// console.log('params',params)
  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || '/';
  // console.log(fromPage)
  // const fromPage = location.state?.from?.pathname || '/sign-up'
  // signin(user, ()=> navigate(fromPage, {replace: true}))
	return (
		<>
      {fromPage}
			<SignIn onSubmit={() => navigate(fromPage)}/>
      {/* {fromPage} */}
		</>
	);
	// return <h2>{slug}</h2>
}

export default LoginPage;
