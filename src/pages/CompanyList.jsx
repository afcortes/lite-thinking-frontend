import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import RoleGuard from './../components/RoleGuard'
import constants from '../constants/constants';
import CompanyItem from './../components/CompanyItem';
import { useDispatch, useSelector } from 'react-redux'
import { getCompaniesLifeCycle } from './../features/company/companySlice'
import Spinner from '../components/Spinner';


const CompanyList = () => {

    const dispatch = useDispatch();

    const { isLoading, companies } = useSelector(
        (state) => state.company
    );

    useEffect(() => {
        dispatch(getCompaniesLifeCycle())
    }, [dispatch]);

    if (isLoading) return <Spinner/>

    return (
        <>
            <RoleGuard role={constants.roles.ADMIN} children={
                <Link to='/create-company'>
                    Create company
                </Link>
            }/>
            {companies.length > 0 && (
                <>
                <div>
                    {companies.map((company) => (
                        <CompanyItem
                            company={company}
                        />
                    ))}
                </div>
                </>
            )}
        </>
    );
};
export default CompanyList;