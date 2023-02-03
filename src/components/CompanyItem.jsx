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
          <h2>{company.name}</h2>
          <div>
            {company.NIT}
          </div>
          <div>
            {company.address}
          </div>
          <div>
            {company.phoneNumber}
          </div>
          <button onClick={handleProducts}>Products</button>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
  );
};

export default CompanyItem;