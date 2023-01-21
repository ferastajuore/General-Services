import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';

import { Button } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { useRouter } from 'next/router';

const CreateContainer = () => {
	const collectionRef = collection(db, 'containers');
	const router = useRouter();
	const [container, setContainer] = useState({
		city: '',
		address: '',
		location: '',
		image: '',
	});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setContainer({ ...container, [name]: value });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addDoc(collectionRef, container);
			setMassage({ status: 'success', text: 'تم اضافة حاوية بنجاح' });

			setTimeout(() => {
				router.reload();
				setContainer('');
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
					<label htmlFor="address" className="form-label float-end">
						العنوان
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="address"
							name="address"
							placeholder="ادخل العنوان"
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="location" className="form-label float-end">
						الاحداثيات
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="location"
							name="location"
							placeholder="ادخل الاحداثيات"
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<Button title="اضافة حاوية" className="btn-info mt-2" />
			</form>
		</>
	);
};

export default CreateContainer;
