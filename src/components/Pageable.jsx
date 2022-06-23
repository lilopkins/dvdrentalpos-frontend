import React, { useEffect, useState } from "react";
import LoadingSpinner from './LoadingSpinner';
import config from "../config";

export default function Pageable(props) {
    const uri = props.uri;
    const sortableBy = {
        '__default__': 'Default',
        ...props['sortable-by'] || {},
    };
    const pageProp = +props.page || 0;
    const generator = props.generator || (item => <div>{item.title}</div>);

    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(pageProp);
    const [sortBy, setSortBy] = useState('__default__');
    const [itemsPerPage, setItemsPerPage] = useState(20);
    
    useEffect(() => {
        let url = new URL(config.API_BASE + uri);
        url.searchParams.set('page', page);
        url.searchParams.set('size', itemsPerPage);
        if (sortBy !== '__default__') {
            const direction = sortBy.substring(0, 1);
            let field = sortBy.substring(1);
            if (direction === '-') field += ',desc';
            url.searchParams.set('sort', field);
        }
        fetch(url)
            .then(res => res.json())
            .then(setData)
            .catch(setError);
    }, [uri, page, sortBy, itemsPerPage]);

    if (error !== null) {
        return (
            <div className="error">
                <h1>Error</h1>
                <p>{error.message}</p>
            </div>
        );
    } else if (data === null) {
        return (
            <LoadingSpinner />
        );
    } else {
        return (
            <div className="pagable">
                <div className="header">
                    <div className="sort">
                        Sort by:&nbsp;
                        <select value={sortBy} onChange={e => {
                                setSortBy(e.target.value);
                                setPage(0);
                            }}>
                            
                            {Object.keys(sortableBy).map(key => {
                                if (key === '__default__') {
                                    return (
                                        <option value={key} key={key}>{sortableBy[key]}</option>
                                    );
                                } else {
                                    return (
                                        <React.Fragment key={key}>
                                            <option value={'+' + key}>{sortableBy[key]} (ascending)</option>
                                            <option value={'-' + key}>{sortableBy[key]} (descending)</option>
                                        </React.Fragment>
                                    );
                                }
                            })}
                        </select>
                    </div>
                    <div className="items-per-page">
                        Items per page:&nbsp;
                        <select onChange={e => {
                                setItemsPerPage(e.target.value);
                                setPage(0);
                            }} value={itemsPerPage}>
                            <option>20</option>
                            <option>50</option>
                            <option>100</option>
                        </select>
                    </div>
                </div>

                <div className="paged-content">
                    {data.content.map(item => (
                        <React.Fragment key={item.id}>
                            { generator(item) }
                        </React.Fragment>
                    ))}
                </div>

                <div className="pages">
                    <button disabled={page <= 0} onClick={() => setPage(page - 1)}>Prev</button>
                    &nbsp;Page&nbsp;
                    <select onChange={e => setPage(e.target.value)} value={page}>
                        {Array.from(Array(data.totalPages).keys()).map(i => (
                            <option key={i} value={i}>{i + 1}</option>
                        ))}
                    </select>
                    &nbsp;of {data.totalPages}&nbsp;
                    <button disabled={page >= data.totalPages - 1} onClick={() => setPage(page + 1)}>Next</button>
                </div>
            </div>
        );
    }
}
