import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';

import { Button, Spinner } from '@/components/UI';
import { db, storage } from '@/middleware/firebase';
import { useRouter } from 'next/router';

const CreateAds = () => {
	const collectionRef = collection(db, 'advertisement');
	const router = useRouter();

	// useState
	const [imageUpload, setImageUpload] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [ads, setAds] = useState({
		image: '',
	});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	// handler Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setIsLoading(true);

			if (imageUpload === null) return;

			const imageRef = ref(storage, `advertisement/${imageUpload.name + v4()}`);

			await uploadBytes(imageRef, imageUpload);
			const getURL = await getDownloadURL(imageRef);

			await addDoc(collectionRef, { ...ads, date: serverTimestamp(), image: getURL });
			setMassage({ status: 'success', text: 'تم اضافة اعلان بنجاح' });

			setTimeout(() => {
				router.reload();
				setAds('');
				setMassage('');
				setIsLoading(false);
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

			<form onSubmit={handleSubmit} className="mb-5">
				<div className="row">
					<div className="form-group col-md-8">
						<label htmlFor="image" className="form-label">
							تحميل الصورة
						</label>
						<div className="input-group">
							<input
								type="file"
								className="form-control"
								id="image"
								name="image"
								placeholder="تحميل الصورة"
								onChange={(e) => setImageUpload(e.target.files[0])}
								required
							/>
						</div>
					</div>

					<div className="col-md-4 mt-4">
						{!isLoading ? (
							<Button title="اضافة اعلان" className="btn-info mt-2" />
						) : (
							<Spinner size="md" color="#03213d" />
						)}
					</div>
				</div>
			</form>
		</>
	);
};

export default CreateAds;
