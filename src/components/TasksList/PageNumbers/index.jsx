import React from 'react'
import "./style.css"

const PageNumbers = ({pageNumbers, setPageNumber}) => {
    return (
        <div className="page__conteiner">
            {pageNumbers.map(pageNumber =>
                <span
                    key={pageNumber}
                    className="page"
                    onClick={() => setPageNumber(pageNumber)}
                >
                    {pageNumber}
                </span>
            )}
        </div>
    )
}

export default PageNumbers
