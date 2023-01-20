import React from 'react';
import { FaUsers, FaBuilding, FaExclamationCircle } from 'react-icons/fa';

const Statistics = () => {
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
							<h4>200</h4>
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
							<h4>50</h4>
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
							<h4>20</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Statistics;
