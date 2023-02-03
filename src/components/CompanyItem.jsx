import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { deleteCompanyLifeCycle } from '../features/company/companySlice';

const CompanyItem = ({company}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = () => {
    navigate(`./../edit-company/${company.NIT}`)
  }

  const handleProducts = () => {
    navigate(`./../company/${company.NIT}/inventory`)
  }

  const handleDelete = async () => {
    dispatch(deleteCompanyLifeCycle(company.NIT))
  }

  return (
        <>
          <div className="card my-3">
            <h2 className="card-header text-center">{company.name}</h2>
            <div className="card-body">
              <p className='fs-6'>
                NIT: {company.NIT}
              </p>
              <p className='fs-6'>
                Address: {company.address}
              </p>
              <p className='fs-6'>
                Phone number: {company.phoneNumber}
              </p>
              <div className="row">
                <div className='col-4'>
                  <button className='btn btn-primary mx-1 w-100' onClick={handleProducts}>Products</button>
                </div>
                <div className='col-4'>
                  <button className='btn btn-primary mx-1 w-100' onClick={handleEdit}>Edit</button>
                </div>
                <div className='col-4'>
                  <button className='btn btn-primary mx-1 w-100' onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </>
  );
};

export default CompanyItem;