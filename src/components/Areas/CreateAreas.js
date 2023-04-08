import React, { useEffect, useState } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { Button } from '@/components/UI';
import { db } from '@/middleware/firebase';
import { useRouter } from 'next/router';

const CreateAreas = () => {
	const animatedComponents = makeAnimated();
	const collectionRef = collection(db, 'areas');
	const router = useRouter();

	// useState
	const [company, setCompany] = useState({
		title: '',
	});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	// useEffect(() => {
	// 	// Get All Sections
	// 	const getAllSections = async () => {
	// 		const data = await getDocs(sectionCollectionRef);
	// 		setSections(data.docs.map((doc) => ({ label: doc.data().name, value: doc.id })));
	// 	};
	// 	getAllSections();
	// }, []);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setCompany({ ...company, [name]: value });
	};

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addDoc(collectionRef, { ...company, numReborts: 0 });
			setMassage({ status: 'success', text: 'تم اضافة منطقة بنجاح' });

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
					<label htmlFor="tile" className="form-label float-end">
						اضافة اسم منطقة
					</label>
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							id="title"
							name="title"
							placeholder="ادخل اسم"
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<Button title="اضافة منطقة" className="btn-info mt-2" />
			</form>
		</>
	);
};

export default CreateAreas;
