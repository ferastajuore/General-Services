import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

import { Button } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { useRouter } from 'next/router';

const CreateCompany = () => {
	const collectionRef = collection(db, 'companies');
	const router = useRouter();
	const [company, setCompany] = useState({
		name: '',
		email: '',
		phone: '',
		city: '',
		phone: '',
		description: '',
		numberOfOrederFiexd: 0,
	});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setCompany({ ...company, [name]: value });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addDoc(collectionRef, company);
			setMassage({ status: 'success', text: 'تم اضافة شركة بنجاح' });

			setTimeout(() => {
				router.reload();
				setCompany('');
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
						اضافة اسم الشركة
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
							onChange={handleChange}
							required
						/>
					</div>
				</div>

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

				<Button title="اضافة شركة" className="btn-info mt-2" />
			</form>
		</>
	);
};

export default CreateCompany;
