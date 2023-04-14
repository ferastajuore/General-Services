import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { Button, Spinner } from '@/components/UI';
import { db } from '@/middleware/firebase';

const EditCompany = ({ getId }) => {
	const router = useRouter();
	const animatedComponents = makeAnimated();

	// useState
	const [company, setCompany] = useState({});
	const [sections, setSections] = useState([]);
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	useEffect(() => {
		// Get company by id
		const getData = async () => {
			const docRef = doc(db, 'areas', getId);
			const docSnap = await getDoc(docRef);

			setCompany(docSnap.data());
		};
		getData();

		// Get All Sections
		// const getAllSections = async () => {
		// 	const data = await getDocs(sectionCollectionRef);
		// 	setSections(data.docs.map((doc) => ({ label: doc.data().name, value: doc.id })));
		// };
		// getAllSections();
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
			const updateCompany = doc(db, 'areas', getId);
			await updateDoc(updateCompany, company);

			setMassage({ status: 'success', text: 'تم تعديل منطقة بنجاح' });

			setTimeout(() => {
				router.reload();
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};

	return !_.isEmpty(company) ? (
		<>
			{massage.status === 'success' && (
				<div className="alert alert-success text-center">{massage.text}</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="form-group mb-2">
						<label htmlFor="name" className="form-label">
							اسم المنطقة
						</label>
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								id="title"
								name="title"
								placeholder="ادخل اسم"
								value={company.title}
								onChange={handleChange}
								required
							/>
						</div>
					</div>
				</div>

				<Button title="تعديل منطقة" className="btn-info mt-2" />
			</form>
		</>
	) : (
		<Spinner />
	);
};

export default EditCompany;
