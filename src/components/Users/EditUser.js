import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { Modal2, Button, Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';

const EditUser = ({ activeModel, closeModel, getId }) => {
	const router = useRouter();
	const [user, setUser] = useState({});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	useEffect(() => {
		// Get user by id
		const getData = async () => {
			const docRef = doc(db, 'users', getId);
			const docSnap = await getDoc(docRef);

			setUser(docSnap.data());
		};
		getData();
	}, []);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const updateUser = doc(db, 'users', getId);
			await updateDoc(updateUser, user);

			console.log(updateUser);
			setMassage({ status: 'success', text: 'تم تعديل مستخدم بنجاح' });

			setTimeout(() => {
				router.reload();
				closeModel(activeModel);
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};

	return !_.isEmpty(user) ? (
		<Modal2 title="editUser" isActive={activeModel} isClosed={closeModel}>
			{massage.status === 'success' && (
				<div className="alert alert-success text-center">{massage.text}</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="form-group mb-2">
					<label htmlFor="name" className="form-label float-end">
						اضافة اسم
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="name"
							name="name"
							placeholder="ادخل اسم"
							value={user.name}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

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
							value={user.phone}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

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
							value={user.city}
							onChange={handleChange}
							required
						/>
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

				<Button title="تعديل المستخدم" className="btn-info mt-2" />
			</form>
		</Modal2>
	) : (
		<Spinner />
	);
};

export default EditUser;
