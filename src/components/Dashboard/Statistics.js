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
		<div className="row mb-5">
			<div className="col-sm-6 col-lg-4">
				<div className="card text-bg-primary ">
					<div className="card-body px-3 d-flex justify-content-around align-items-center">
						<div>
							{/* <i className="fa fa-users fa-5x"></i> */}
							<FaUsers fontSize="5em" />
						</div>
						<div className="text-center text-white">
							<h4>المستخدمين</h4>
							<h4>{counts.user && counts.user}</h4>
						</div>
					</div>
				</div>
			</div>

			<div className="col-sm-6 col-lg-4">
				<div className="card text-bg-success ">
					<div className="card-body px-3 d-flex justify-content-around align-items-center">
						<div className="text-white">
							<FaBuilding fontSize="5em" />
						</div>
						<div className="text-center text-white">
							<h4>الشركات الخاصة</h4>
							<h4>{counts.company && counts.company}</h4>
						</div>
					</div>
				</div>
			</div>

			<div className="col-sm-6 col-lg-4">
				<div className="card text-bg-danger ">
					<div className="card-body px-3  d-flex justify-content-around align-items-center">
						<div className="text-white">
							<FaExclamationCircle fontSize="5em" />
						</div>
						<div className="text-center text-white">
							<h4>بلاغات هدا الشهر</h4>
							<h4>{counts.report & counts.report}</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Statistics;
