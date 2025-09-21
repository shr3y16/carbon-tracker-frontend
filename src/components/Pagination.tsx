interface PaginationProps {
  page: number;
  onPageChange: (newPage: number) => void;
  hasNextPage: boolean;
}

export default function Pagination({ page, onPageChange, hasNextPage }: PaginationProps) {
  return (
    <div className="flex justify-between items-center mt-4">
      <button
        disabled={page === 1}
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
        onClick={() => onPageChange(page - 1)}
      >
        Prev
      </button>
      <span>Page {page}</span>
      <button
        disabled={!hasNextPage}
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </button>
    </div>
  );
}