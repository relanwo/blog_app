/* eslint-disable no-unused-vars */
import { Routes, Route, Link, Redirect } from 'react-router-dom';

function NotFoundPage() {
	return (
		<div>
			This page doesn't exist. Go to the <Link to="/articles">home page</Link>.
		</div>
	);
}

export default NotFoundPage;
