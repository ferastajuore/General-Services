import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

import { Button } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { useRouter } from 'next/router';

const CreateUser = () => {
	const usersCollectionRef = collection(db, 'users');
	const router = useRouter();
	const [addUser, setAddUser] = useState({
		name: '',
		phone: '',
		city: '',
		phone: '',
	});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setAddUser({ ...addUser, [name]: value });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addDoc(usersCollectionRef, addUser);
			setMassage({ status: 'success', text: 'تم اضافة مستخدم بنجاح' });

			setTimeout(() => {
				router.reload();
				setAddUser('');
				setMassage('');
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
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
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
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
				</div>

				<Button title="اضافة المستخدم" className="btn-info mt-2" />
			</form>
		</>
	);
};

export default CreateUser;
