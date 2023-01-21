import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

import { Button } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { useRouter } from 'next/router';

const CreateAds = () => {
	const collectionRef = collection(db, 'ads');
	const router = useRouter();
	const [ads, setAds] = useState({
		title: '',
		description: '',
		image: '',
	});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setAds({ ...ads, [name]: value });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addDoc(collectionRef, { ...ads, date: serverTimestamp() });
			setMassage({ status: 'success', text: 'تم اضافة اعلان بنجاح' });

			setTimeout(() => {
				router.reload();
				setAds('');
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
					<label htmlFor="title" className="form-label float-end">
						العنوان
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="title"
							name="title"
							placeholder="ادخل العنوان"
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className="form-group mb-2">
					<label htmlFor="description" className="form-label float-end">
						الوصف
					</label>
					<div className="input-group">
						<textarea
							className="form-control"
							id="description"
							name="description"
							placeholder="ادخل العنوان"
							onChange={handleChange}
							required
							cols="30"
							rows="10"
						></textarea>
					</div>
				</div>

				<Button title="اضافة اعلان" className="btn-info mt-2" />
			</form>
		</>
	);
};

export default CreateAds;
