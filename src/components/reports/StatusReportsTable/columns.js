import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DataType, PagingPosition, SortingMode } from 'ka-table/enums';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '@/middleware/firebase';
import { Button } from '@/components/UI';

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

// Table Props options
export const tablePropsInit = {
	columns: [
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
					// case 'status':
					// 	return <CustomCellStatus {...props} />;
					case 'id':
						return <CustomCellStatus {...props} />;
					// case 'password':
					// 	return <CustomCellPassword {...props} />;
				}
			},
		},
	},
};
