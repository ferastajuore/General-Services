import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { Modal2, Button, Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';

const ViewCompany = ({ activeModel, closeModel, getId }) => {
	const [company, setCompany] = useState({});

	useEffect(() => {
		// Get company by id
		const getData = async () => {
			const docRef = doc(db, 'companies', getId);
			const docSnap = await getDoc(docRef);

			setCompany(docSnap.data());
		};
		getData();
	}, []);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setCompany({ ...company, [name]: value });
	};

	return !_.isEmpty(company) ? (
		<Modal2 title="عرض الشركة" isActive={activeModel} isClosed={closeModel}>
			{/* <form onSubmit={handleSubmit}> */}
			<div className="row">
				<div className="col-sm-6">
					<div className="form-group mb-2">
						<label htmlFor="name" className="form-label float-end">
							اضافة اسم الشركة
						</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								placeholder="ادخل اسم"
								value={company.name}
								onChange={handleChange}
								required
								disabled
							/>
						</div>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group mb-2">
						<label htmlFor="description" className="form-label float-end">
							وصف الشركة
						</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								id="description"
								name="description"
								placeholder="ادخل وصف"
								value={company.description}
								onChange={handleChange}
								required
								disabled
							/>
						</div>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group mb-2">
						<label htmlFor="email" className="form-label float-end">
							البريد الالكتروني
						</label>
						<div className="input-group">
							<input
								type="email"
								className="form-control"
								id="email"
								name="email"
								placeholder="ادخل البريد الالكتروني"
								value={company.email}
								onChange={handleChange}
								required
								disabled
							/>
						</div>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group mb-2">
						<label htmlFor="phone" className="form-label float-end">
							رقم الهاتف
						</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								id="phone"
								name="phone"
								placeholder="ادخل رقم الهاتف"
								value={company.phone}
								onChange={handleChange}
								required
								disabled
							/>
						</div>
					</div>
				</div>

				<div className="col-sm-6">
					<div className="form-group mb-2">
						<label htmlFor="city" className="form-label float-end">
							المدينة
						</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								id="city"
								name="city"
								placeholder="ادخل المدينة"
								value={company.city}
								onChange={handleChange}
								required
								disabled
							/>
						</div>
					</div>
				</div>
			</div>

			{/* <div className="form-group mb-2">
					<label htmlFor="password" className="form-label float-end">
						كلمة المرور
					</label>
					<div className="input-group">
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							placeholder="ادخل كلمةالمرور"
							onChange={handleChange}
							required
						/>
					</div>
				</div> */}

			{/* </form> */}
		</Modal2>
	) : (
		<Spinner />
	);
};

export default ViewCompany;
