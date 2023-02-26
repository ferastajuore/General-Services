import _ from 'lodash';
import { useRouter } from 'next/router';
import { Button, Spinner } from '@/components/UI';
import React, { useEffect, useState } from 'react';

import { db } from '@/middleware/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Login = () => {
	const router = useRouter();
	const usersCollectionRef = collection(db, 'users');

	const [user, setUser] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loggedIn, setLoggedIn] = useState({
		phone: '',
		password: '',
	});
	const [massage, setMassage] = useState({
		status: '',
		text: '',
	});

	useEffect(() => {
		if (loggedIn.phone === '') return;

		const getData = async () => {
			// const docRef = doc(db, 'users', '0921234567');
			const q = query(usersCollectionRef, where('phone', '==', loggedIn.phone));
			const querySnapshot = await getDocs(q);

			querySnapshot.forEach((doc) => setUser(doc.data()));
		};
		getData();
	}, [loggedIn]);

	useEffect(() => {
		// Cheack is user logged in
		const storageData =
			localStorage.getItem('auth-user') !== null
				? JSON.parse(localStorage.getItem('auth-user'))
				: false;

		if (storageData.isAuth) {
			router.push('/');
		}

		if (isLoggedIn) {
			user !== undefined &&
				localStorage.setItem('auth-user', JSON.stringify({ user, isAuth: true }));
		}
	}, [isLoggedIn]);

	// Handler Change
	const handleChange = (e) => {
		const { name, value } = e.target;
		setLoggedIn({ ...loggedIn, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		setIsLoading(true);

		if (_.isEmpty(loggedIn.phone) && _.isEmpty(loggedIn.password)) {
			setIsLoading(false);
			return setMassage({ status: 'error', text: 'يرجي ادخال رقم المستخدم وكملة المرور ❌' });
		} else if (user.password !== loggedIn.password || user === undefined) {
			setIsLoading(false);
			return setMassage({ status: 'error', text: 'خطاء في رقم المستخدم او كلمة المرور ❌' });
		}

		setMassage({ status: 'success', text: 'تم تسجيل الدخول ✅' });

		setTimeout(() => {
			setMassage({ status: '', text: '' });
			setIsLoggedIn(true);
			router.push('/');
		}, 2500);
	};

	return (
		<div className="login">
			<div className="row">
				<div className="col-md-6 login-image d-flex justify-content-center align-items-center flex-column"></div>
				<div className="col-md-6 login-form d-flex justify-content-center align-items-center flex-column">
					<div className="">
						<h2 className="h1 fw-bold text-center">سجل دخولك</h2>
						<p className="h6 text-center text-secondary">
							قم بادخال رقم الهاتفك وكلمة المرور
						</p>
					</div>

					{(massage.status === 'success' && (
						<div className="alert alert-success text-center">{massage.text}</div>
					)) ||
						(massage.status === 'error' && (
							<div className="alert alert-danger text-center">{massage.text}</div>
						))}

					<form onSubmit={handleSubmit}>
						<div className="form-group my-3">
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

						<div className="form-group my-3">
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

						{isLoading ? (
							<Spinner />
						) : (
							<div className="d-grid gap-2 col-6 mx-auto">
								<Button title="تسجيل الدخول" className="btn-info mt-2" />
							</div>
						)}
					</form>
				</div>
			</div>
		</div>
		// <div
		// className="d-flex justify-content-center align-items-center"
		// style={{ height: '100vh' }}
		// >
		// 	<div className="card text-bg-light" style={{ width: '40%' }}>
		// 		<div className="card-header text-center p-3 h5">تسجيل الدخول</div>

		// 		<div className="card-body">
		// 			{(massage.status === 'success' && (
		// 				<div className="alert alert-success text-center">{massage.text}</div>
		// 			)) ||
		// 				(massage.status === 'error' && (
		// 					<div className="alert alert-danger text-center">{massage.text}</div>
		// 				))}

		// 		</div>
		// 	</div>
		// </div>
	);
};

export default Login;
