import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';

import { db } from '@/middleware/firebase';
import { Spinner, Table } from '@/components/UI';
import { tablePropsInit } from './columns';
// import { CardSub } from '@UI/Cards/index';

const areasTable = () => {
	const [companies, setCompanies] = useState([]);
	const companiesCollectionRef = collection(db, 'areas');

	useEffect(() => {
		const getAllCompanies = async () => {
			const data = await getDocs(companiesCollectionRef);
			setCompanies(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getAllCompanies();
	}, []);

	const dataArray =
		companies !== undefined &&
		companies.map((data, index) => ({
			title: data.title,
			numReborts: data.numReborts,
			id: data ? data.id : index,
		}));

	return companies ? (
		<div className="card mb-5">
			<Table dataTable={dataArray} tablePropsInit={tablePropsInit} />
		</div>
	) : (
		<Spinner />
	);
};

export default areasTable;
