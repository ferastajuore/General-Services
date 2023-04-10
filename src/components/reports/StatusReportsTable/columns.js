import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { DataType, PagingPosition, SortingMode } from 'ka-table/enums';
import { doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';

import { db } from '@/middleware/firebase';
import { Button } from '@/components/UI';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

// Custom cell for statis column
const CustomCellStatus = ({ value }) => {
	const [report, setReport] = useState({});

	useEffect(() => {
		// Get company by id
		const getData = async () => {
			const docRef = doc(db, 'reporting-service', value);
			const docSnap = await getDoc(docRef);

			setReport(docSnap.data());
		};
		getData();
	}, [value]);

	return (
		<div className="d-flex justify-content-around">
			<div
				className={`h5 btn ${
					(report.companyStatus === 0 && 'btn-success') ||
					(report.companyStatus === 1 && 'btn-warning') ||
					(report.companyStatus === 2 && 'btn-danger') ||
					(report.companyStatus === 3 && 'btn-info')
				}`}
			>
				{(report.companyStatus === 0 && 'تم قبول') ||
					(report.companyStatus === 1 && 'قيد الانتظار') ||
					(report.companyStatus === 2 && 'رفض') ||
					(report.companyStatus === 3 && 'تم تنفيد')}
			</div>
			{report.companyStatus !== 0 && report.companyStatus !== 3 && (
				<Link href={`/Reports/${value}`}>
					<Button
						title="تعين شركة"
						style={{ backgroundColor: '#03213d', color: '#FFF' }}
					/>
				</Link>
			)}
		</div>
	);
};

const CustomCellFavourite = ({ value }) => {
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		// Get company by id
		const getData = async () => {
			const docRef = doc(db, 'reporting-service', value);
			const docSnap = await getDoc(docRef);

			setIsFavorite(docSnap.data().favorite);
		};
		getData();
	}, [value]);

	// handler Delete element
	const handleClick = async (getId, data) => {
		try {
			const updateReport = doc(db, 'reporting-service', getId);
			await updateDoc(updateReport, { favorite: data });

			onSnapshot(updateReport, (querySnapshot) => {
				setIsFavorite(querySnapshot.data().favorite);
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="d-flex justify-content-around">
			{isFavorite ? (
				<AiFillStar
					fontSize="1.8em"
					color="#ffc107"
					onClick={() => handleClick(value, false)}
					style={{ cursor: 'pointer' }}
				/>
			) : (
				<AiOutlineStar
					fontSize="1.8em"
					onClick={() => handleClick(value, true)}
					style={{ cursor: 'pointer' }}
				/>
			)}
		</div>
	);
};

// Table Props options
export const tablePropsInit = {
	columns: [
		{
			key: 'id2',
			title: 'المفضلة',
			style: { width: 95 },
		},
		{
			key: 'title',
			title: 'العنوان',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'phone',
			title: 'رقم الهاتف المرسل',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'dateAdded',
			title: 'تاريخ البلاغ',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'typeReport',
			title: 'نوع البلاغ',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'assignedCompany',
			title: 'شركة المرسلة',
			dataType: DataType.String,
			style: { width: 200 },
		},
		{
			key: 'id',
			title: 'حالة البلاغ',
			style: { width: 280 },
		},
	],
	// data: dataTable,
	paging: {
		enabled: true,
		pageIndex: 0,
		pageSize: 5,
		pageSizes: [5, 10, 15],
		position: PagingPosition.Bottom,
	},
	sortingMode: SortingMode.Single,
	// editingMode: EditingMode.Cell,
	loading: true,
	rowKeyField: 'id',
	childComponents: {
		cellText: {
			content: (props) => {
				switch (props.column.key) {
					case 'id2':
						return <CustomCellFavourite {...props} />;
					case 'id':
						return <CustomCellStatus {...props} />;
				}
			},
		},
	},
};
