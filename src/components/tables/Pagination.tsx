import Pagination from '@mui/material/Pagination';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
  };

  return (
    <div className="flex items-center ">
      <Pagination count={totalPages} page={currentPage} onChange={handleChange}/>
    </div>
  );
};

export default PaginationComponent;
