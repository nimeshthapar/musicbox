import React, { useEffect, useState, useRef } from 'react';
import Category from '../components/Home/Category';
import apiClient from '../util/spotify';
import { categoryType } from '../models/category';
import classes from './shared.module.css';
import Loading from '../components/Loading/Loading';

const Home = () => {
	const [categories, setCategories] = useState<categoryType[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	let offset = useRef<number>(0);
	useEffect(() => {
		const fetchPlaylists = async () => {
			setIsLoading(true);
			const response = await apiClient.get(
				`browse/categories?country=IN&limit=12&offset=${offset.current}`
			);
			const loadedCategories: categoryType[] = [];
			for (const category of response.data.categories.items) {
				loadedCategories.push({
					name: category.name,
					id: category.id,
					image: category.icons[0].url,
				});
			}

			setCategories((prev) => [...prev, ...loadedCategories]);
			setIsLoading(false);
			offset.current = offset.current + 12;
		};

		fetchPlaylists();

		window.addEventListener('scroll', () => {
			let userScrollHeight = window.innerHeight + window.scrollY;
			let windowBottomHeight = document.documentElement.offsetHeight;
			if (userScrollHeight >= windowBottomHeight && offset.current < 55) {
				fetchPlaylists();
			}
		});
	}, []);

	const ulEl = (
		<ul className={classes['category-lists']}>
			{categories.map((category) => (
				<Category
					key={category.id}
					id={category.id}
					image={category.image}
					name={category.name}
				/>
			))}
		</ul>
	);

	return (
		<div className={classes.screen}>
			<h1 className={classes.heading}>Browse Categories</h1>
			{isLoading ? (
				<div className="center full">
					<Loading white={true} />
				</div>
			) : (
				ulEl
			)}
		</div>
	);
};

export default Home;
