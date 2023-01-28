import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { Modal2, Button, Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';

const EditContainer = ({ getId }) => {
	const router = useRouter();
	const [container, setContainer] = useState({});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	useEffect(() => {
		// Get company by id
		const getData = async () => {
			const docRef = doc(db, 'containers', getId);
			const docSnap = await getDoc(docRef);

			setContainer(docSnap.data());
		};
		getData();
	}, []);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setContainer({ ...container, [name]: value });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const updateContainer = doc(db, 'containers', getId);
			await updateDoc(updateContainer, container);

			setMassage({ status: 'success', text: 'تم تعديل الحاوية بنجاح' });

			setTimeout(() => {
				router.reload();
				closeModel(activeModel);
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};

	return !_.isEmpty(container) ? (
		<>
			{massage.status === 'success' && (
				<div className="alert alert-success text-center">{massage.text}</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="form-group mb-2">
						<label htmlFor="city" className="form-label">
							المدينة
						</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								id="city"
								name="city"
								placeholder="ادخل المدينة"
								value={container.city}
								onChange={handleChange}
								required
							/>
						</div>
					</div>

					<div className="form-group mb-2">
						<label htmlFor="address" className="form-label">
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
								value={container.address}
								required
							/>
						</div>
					</div>

					<div className="form-group mb-2">
						<label htmlFor="location" className="form-label">
							الاحداثيات
						</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								id="location"
								name="location"
								placeholder="ادخل الاحداثيات"
								value={container.location}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
				</div>

				<Button title="تعديل شركة" className="btn-info mt-2" />
			</form>
		</>
	) : (
		<Spinner />
	);
};

export default EditContainer;
