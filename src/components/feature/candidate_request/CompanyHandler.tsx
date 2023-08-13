import React, { FC, useEffect, useState } from "react";
import { useGetCompanyInformationForUserQuery } from "@/reducer/hiairBaseApi";
import { CompanyInformationForm } from "./CompanyInformation";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { updateCompanyInfo } from "@/reducer/userSession";

type CompanyHandlerProps = {
	nextStep: () => void;
};

export const CompanyHandler: FC<CompanyHandlerProps> = (props) => {
	const { nextStep } = props;
	const { data, isLoading } = useGetCompanyInformationForUserQuery();
	const userSession = useAppSelector((state) => state.userSession);
	const [createNewCompany, setCompanyCreation] = useState(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isLoading) return;

		if (data && data.companies.length > 0) {
			setCompanyCreation(false);
			return;
		}

		setCompanyCreation(true);
	}, [data, isLoading]);

	console.log("Data received length for companies", data, data?.companies.length);
	console.log("createNewCompany", createNewCompany);

	if (isLoading) {
		return <p>Loading ....</p>;
	}

	const handleCompanyInformation = (values: CompanyInformationFormState) => {
		dispatch(updateCompanyInfo(values));
		nextStep();
	};

	if (createNewCompany) {
		return (
			<CompanyInformationForm initialFormValues={userSession.companyInfo} handleFormSubmit={handleCompanyInformation} />
		);
	}

	return (
		<div className="flex flex-col items-center justify-center gap-6">
			<p className="text-lg">List of available companies</p>
			<button className="p-5 rounded-sm bg-secondaryYellow" onClick={() => setCompanyCreation(true)}>
				Create new company
			</button>
		</div>
	);
};
