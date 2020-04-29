import React, { Component } from 'react';

export default class Pagination extends Component {

    render() {
        const { startNum, endNum, totalNum, changeCurrentPage, currentPage, totalPage } = this.props;

        const gotoPage = (e) => {
            const pageNum = parseInt(e.target.text);
            return changeCurrentPage(pageNum);
        }

        function PaginationLi(props) {
            let pageArr = [];

            if (totalPage <= 5) {
                for (let i = 0; i < totalPage; i++) {
                    pageArr.push(i + 1);
                }
            } else if (currentPage < 3) {
                for (let i = 0; i < 5; i++) {
                    pageArr.push(i + 1);
                }
            } else if (totalPage - currentPage < 2) {
                for (let i = 0; i < 5; i++) {
                    pageArr.push(totalPage - 4 + i);
                }
            } else {
                for (let i = 0; i < 5; i++) {
                    pageArr.push(currentPage - 2 + i);
                }
            };

            return (
                pageArr.map((item) =>
                    <li className={"page-item " + (props.currentPage == item ? "active" : "")} key={item} onClick={gotoPage}>
                        <a href="#" className="page-link">{item}</a>
                    </li>
                )
            );
        }

        return (
            <div className="row">
                <div className="col-sm-7">
                    <ul className="pagination pagination-sm">
                        <li className={"page-item " + (currentPage == 1 ? "disabled" : "")}
                            onClick={() => changeCurrentPage(currentPage == 1 ? 1 : currentPage - 1)} >
                            <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">Previous</span>
                            </a>
                        </li>
                        <PaginationLi totalPage={totalPage} currentPage={currentPage} />
                        <li className={"page-item " + (currentPage == totalPage ? "disabled" : "")}
                            onClick={() => changeCurrentPage(currentPage == totalPage ? currentPage : currentPage + 1)}>
                            <a className="page-link" href="#">Next</a>
                        </li>
                    </ul>

                </div>
                <div className="col-sm-5">
                    <div className="text-right mt-1">{startNum} to {endNum} of {totalNum} entries</div>
                </div>
            </div>
        );
    }
}