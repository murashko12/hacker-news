import { PaginationProps } from "../../types/PaginationProps";
import style from "./pagination.module.css"
const Pagination: React.FC<PaginationProps> = ({
        currentPage,
        totalPages,
        onPageChange,
    }) => {
        return (
        <div className={style.container}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    disabled={page === currentPage}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination