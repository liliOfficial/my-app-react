import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import errorHandler from '../services/errorHandler';

import Playlists from './playlist';
import Pagination from './common/pagination';
import AddPopup from './addPopup';

export default function Main() {

    const [popupShow, setPopupShow] = useState(false);

    const [playlists, setPlaylists] = useState(null);

    const [keywords, setKeywords] = useState('');
    const [searchList, setSearchList] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        total: null,
        step: 20
    });

    const [selectedSong, setSelectedSong] = useState('');

    const inputKeywords = (e) => setKeywords(e.target.value);
    const popupShowStatus = (status) => setPopupShow(status);

    const selectSong = (uris) => {
        setSelectedSong(uris);
        setPopupShow(true);
    }

    const initData = async () => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("access_token");
        const userId = params.get("user_id");
        sessionStorage.setItem('userId', userId);

        if (!accessToken) return window.location.href = "http://localhost:8888";

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }

    const fetchPlaylist = async (id) => {
        const httpEndpoint = `https://api.spotify.com/v1/users/${sessionStorage.getItem('userId')}/playlists`;

        try {
            let result = await axios(`${httpEndpoint}`);
            console.log(result.data);
            setPlaylists(result.data.items);
        } catch (e) { errorHandler(e); }
    }

    const creatPlaylist = async (name) => {
        const httpEndpoint = `https://api.spotify.com/v1/users/${sessionStorage.getItem('userId')}/playlists`;
        const data = { 'name': name };

        try {
            let result = await axios.post(`${httpEndpoint}`, data);
            if (result.data.snapshot_id) {
                toast.success(`Successfully created the playlist`, {});
                fetchPlaylist();
            }
        } catch (e) { errorHandler(e); }
    }

    const search = async (num) => {
        if (!keywords) return setSearchList(null);

        const httpEndpoint = `https://api.spotify.com/v1/search`;
        const type = `track`;
        const limit = pagination.step;
        const offset = (pagination.currentPage - 1) * limit;

        try {
            let result = await axios(`${httpEndpoint}?q=${keywords}&type=${type}&limite=${limit}&offset=${offset}`);

            setSearchList(result.data);
            const newPagination = { ...pagination, total: result.data.tracks.total, currentPage: num };
            setPagination(newPagination);
        } catch (e) { errorHandler(e); }
    }

    useEffect(() => {
        initData();
        fetchPlaylist();
    }, []);

    return (
        <div className="container my-3">
            {popupShow &&
                <AddPopup playlists={playlists} popupShowStatus={popupShowStatus} selectedSong={selectedSong} />
            }

            <div className="row">
                <div className="col-md-4">
                    <Playlists playlists={playlists} creatPlaylist={creatPlaylist} />
                </div>

                <div className="col-md-8">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for songs" value={keywords} onChange={inputKeywords} />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={() => search(1)}>Search</button>
                        </div>
                    </div>
                    {pagination.total === 0 &&
                        <h4 className="mt-3">No result match!</h4>
                    }
                    {pagination.total > 0 && keywords &&
                        <div className="mt-3">
                            <Pagination
                                startNum={(pagination.currentPage - 1) * pagination.step + 1}
                                endNum={Math.min(pagination.currentPage * pagination.step, pagination.total)}
                                totalNum={pagination.total}
                                currentPage={pagination.currentPage}
                                totalPage={pagination.total / pagination.step}
                                changeCurrentPage={search}
                            />
                        </div>
                    }
                    {searchList &&
                        Object.keys(searchList).map(type => {
                            return (
                                <ul className="list-group" key={type}>
                                    {searchList[type]['items'].map(item => {
                                        return (
                                            <li className="list-group-item text-left" key={item.uri}>
                                                <button type="button" className="btn btn-sm btn-outline-dark" onClick={() => selectSong(item.uri)}>
                                                    Add to Playlist
                                                </button>
                                                <span className="ml-3">{item.name}</span>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}