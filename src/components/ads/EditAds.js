import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { Modal2, Button, Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';

const EditAds = ({ activeModel, closeModel, getId }) => {
	const router = useRouter();
	const [ads, setAds] = useState({});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	useEffect(() => {
		// Get company by id
		const getData = async () => {
			const docRef = doc(db, 'ads', getId);
			const docSnap = await getDoc(docRef);

			setAds(docSnap.data());
		};
		getData();
	}, []);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setAds({ ...ads, [name]: value });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const updateAds = doc(db, 'ads', getId);
			await updateDoc(updateAds, { ...ads, date: serverTimestamp() });

			setMassage({ status: 'success', text: 'تم تعديل اعلان بنجاح' });

			setTimeout(() => {
				router.reload();
				closeModel(activeModel);
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};

	return !_.isEmpty(ads) ? (
		<Modal2 title="تعديل اعلان" isActive={activeModel} isClosed={closeModel}>
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
							value={ads.title}
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
							value={ads.description}
							required
							cols="30"
							rows="10"
						></textarea>
					</div>
				</div>

				<Button title="تعديل شركة" className="btn-info mt-2" />
			</form>
		</Modal2>
	) : (
		<Spinner />
	);
};

export default EditAds;
