import React from 'react';
import Layout from '../Layout/Layout';
import SearchForm from './SearchForm';

export default function Search() {
    return (
			<Layout currentPage={'search'}>
				<div>
					<SearchForm />
				</div>
			</Layout>
		)
}
