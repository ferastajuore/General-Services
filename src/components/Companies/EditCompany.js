import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { Modal2, Button, Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';

const EditCompany = ({ activeModel, closeModel, getId }) => {
	const router = useRouter();
	const [company, setCompany] = useState({});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

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

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const updateCompany = doc(db, 'companies', getId);
			await updateDoc(updateCompany, company);

			setMassage({ status: 'success', text: 'تم تعديل مستخدم بنجاح' });

			setTimeout(() => {
				router.reload();
				closeModel(activeModel);
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};

	return !_.isEmpty(company) ? (
		<Modal2 title="تعديل الشركة" isActive={activeModel} isClosed={closeModel}>
			{massage.status === 'success' && (
				<div className="alert alert-success text-center">{massage.text}</div>
			)}

			<form onSubmit={handleSubmit}>
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

				<Button title="تعديل شركة" className="btn-info mt-2" />
			</form>
		</Modal2>
	) : (
		<Spinner />
	);
};

export default EditCompany;
