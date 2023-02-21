import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { BsPencil, BsTrash } from 'react-icons/bs';
import { FcCheckmark } from 'react-icons/fc';
import { AiOutlineClose } from 'react-icons/ai';

import { db } from '@/middleware/firebase';

const Sections = () => {
	const [addSection, setAddSection] = useState('');
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});
	const [sections, setSections] = useState([]);
	const usersCollectionRef = collection(db, 'sections');

	useEffect(() => {
		// Get All Sections
		const getAllSections = async () => {
			const data = await getDocs(usersCollectionRef);
			setSections(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getAllSections();
	}, []);

	// functoins add new Section
	const AddNewSection = async () => {
		if (_.isEmpty(addSection)) {
			return setMassage({ status: 'error', text: 'يجب عليك ادخال قسم !!' });
		}

		try {
			await addDoc(usersCollectionRef, { name: addSection.trim() });
			setMassage({ status: 'success', text: 'تم اضافة قسم بنجاح' });
			setSections([...sections, { name: addSection }]);
		} catch (err) {
			console.log(err);
		}
	};

	// fucntion update section
	const updateSection = async (id, data) => {
		// setFildActive(id);
		console.log(data);

		try {
			const updateReport = doc(db, 'sections', id);
			await updateDoc(updateReport, {
				name: data,
			});

			setTimeout(() => {
				setFildActive('');
				setMassage('');
			}, 2000);

			setSender(companyId);
		} catch (err) {
			console.log(err);
		}
		try {
			const updateData = doc(db, 'sections', id);
			await updateDoc(updateData, { name: updateData });
			setMassage({ status: 'success', text: 'تم تحديت قسم بنجاح' });

			setTimeout(() => {
				setFildActive('');
				setMassage('');
			}, 2000);
		} catch (err) {
			console.log(err);
		}
	};

	// fucntion delete section
	const deleteSection = async (id) => {
		try {
			if (confirm('هل انت متاكد تريد حدف القسم ؟')) {
				const sectionDoc = doc(db, 'sections', id);
				await deleteDoc(sectionDoc);
				setMassage({ status: 'success', text: 'تم حدف قسم بنجاح' });

				setSections(sections.filter((data) => data.id !== id));

				setTimeout(() => {
					setAddSection('');
					setMassage('');
				}, 2000);
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="managment-sections box-shadow-dark">
			<div className="card">
				<div className="card-body">
					<div className="sections-list mb-3">
						<div className="card-title text-black mb-3">
							<div className="row">
								<div className="col-sm-10">
									<label htmlFor="section"> اضافة قسم</label>
									<input
										type="text"
										className="form-control"
										placeholder="اضافة قسم"
										value={addSection}
										onChange={(e) => setAddSection(e.target.value)}
									/>
									{massage.status === 'error' && (
										<span className="text-danger">{massage.text}</span>
									)}
								</div>
								<div className="col-sm-2 text-center py-4">
									<button className="btn btn-primary" onClick={AddNewSection}>
										اضافة{' '}
									</button>
								</div>
							</div>
						</div>

						{massage.status === 'success' && (
							<div className="alert alert-success text-center">{massage.text}</div>
						)}

						<div className="card">
							<ul className="list-group list-group-flush">
								{sections.length > 0 ? (
									sections.map((data, i) => (
										<li
											key={data ? data.id : i}
											className="list-group-item d-flex justify-content-between align-items-start"
										>
											<>
												<div>
													<div className="fw-bold">{data.name}</div>
												</div>

												<div className="d-flex flex-row-reverse">
													<BsTrash
														fontSize="1.2rem"
														color="#d42a3b"
														onClick={() => deleteSection(data.id)}
													/>
													{/* <BsPencil
															fontSize="1.2rem"
															color="#21be75"
															onClick={() => setFildActive(data.id)}
														/> */}
												</div>
											</>
										</li>
									))
								) : (
									<div className="alert alert-danger text-center">
										{' '}
										لايوجد بيانات
									</div>
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Sections;

//{fildActive !== data.id ? (
// ) : (
// 	<div
// 		className="d-flex justify-content-between align-items-center"
// 		style={{ width: '100%' }}
// 	>
// 		<input
// 			type="text"
// 			className="form-control"
// 			placeholder="اضافة قسم"
// 			value={updateData}
// 			onChange={(e) =>
// 				setUpdateData(e.target.value)
// 			}
// 		/>
// 		<button
// 			onClick={() =>
// 				updateSection(data.id, updateData)
// 			}
// 		>
// 			<FcCheckmark fontSize="1.2rem" />
// 		</button>
// 		<AiOutlineClose
// 			fontSize="1.2rem"
// 			color="#d42a3b"
// 			onClick={() => setFildActive('')}
// 		/>
// 	</div>
// )}
//</li>
