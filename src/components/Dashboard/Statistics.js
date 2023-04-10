import React, { useEffect, useState } from 'react';
import { FaUsers, FaBuilding, FaExclamationCircle } from 'react-icons/fa';

import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '@/middleware/firebase';

const Statistics = () => {
	const [counts, setCounts] = useState({
		user: 0,
		company: 0,
		report: 0,
	});
	const usersCollectionRef = collection(db, 'users');
	const companiesCollectionRef = collection(db, 'companies');
	const reportCollectionRef = collection(db, 'reporting-service');

	useEffect(() => {
		const countDocs = async () => {
			// count user
			const userData = await getCountFromServer(usersCollectionRef);

			// count company
			const companyData = await getCountFromServer(companiesCollectionRef);

			// count report
			const reportData = await getCountFromServer(reportCollectionRef);
			setCounts({
				user: userData.data().count,
				company: companyData.data().count,
				report: reportData.data().count,
			});
		};
		countDocs();
	}, []);

	return (
		<div className="statistics row mb-5" style={{ position: 'relative', margin: '50px 0' }}>
			<div className="col-sm-6 col-lg-4">
				<div className="card box-shadow-dark">
					<div className="card-body">
						<div
							className="bg-blue p-2 rounded box-shadow-dark"
							style={{ position: 'absolute', top: '-30px', left: 20 }}
						>
							<FaUsers fontSize="5em" color="#FFF" />
						</div>
						<div className="text-center text-black" style={{ float: 'right' }}>
							<h4 className="h5">المستخدمين</h4>
							<h4 className="h4">{counts.user && counts.user}</h4>
						</div>
					</div>
				</div>
			</div>

			<div className="col-sm-6 col-lg-4">
				<div className="card box-shadow-dark">
					<div className="card-body">
						<div
							className="bg-pink p-2 rounded box-shadow-dark"
							style={{ position: 'absolute', top: '-30px', left: 20 }}
						>
							<FaBuilding fontSize="5em" color="#FFF" />
						</div>
						<div className="text-center text-black" style={{ float: 'right' }}>
							<h4 className="h5">الشركات الخاصة</h4>
							<h4 className="h4">{counts.company && counts.company}</h4>
						</div>
					</div>
				</div>
			</div>

			<div className="col-sm-6 col-lg-4">
				<div className="card box-shadow-dark">
					<div className="card-body">
						<div
							className="bg-green p-2 rounded box-shadow-dark"
							style={{ position: 'absolute', top: '-30px', left: 20 }}
						>
							<FaExclamationCircle fontSize="5em" color="#FFF" />
						</div>
						<div className="text-center text-black" style={{ float: 'right' }}>
							<h4 className="h5">بلاغات هدا الشهر</h4>
							<h4 className="h4">{counts.report & counts.report}</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Statistics;
