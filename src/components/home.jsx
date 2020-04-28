import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import errorHandler from './errorHandler';

import Playlists from './playlist';

export default function Main() {
    const [popupShow, setPopupShow] = useState(false);
    let userId;

    const [playlists, setPlaylists] = useState(null);

    const [keywords, setKeywords] = useState('');
    const [searchList, setSearchList] = useState(null);

    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
    const [selectedSong, setSelectedSong] = useState('');

    const inputKeywords = (e) => setKeywords(e.target.value);
    const selectPlaylist = (id) => setSelectedPlaylistId(id);
    const popupShowStatus = (status) => setPopupShow(status);

    const selectSong = (uris) => {
        setSelectedSong(uris);
        setPopupShow(true);
    }

    const initData = async () => {

        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("access_token");
        userId = params.get("user_id");

        if (!accessToken) {
            window.location.href = "http://localhost:8888";
        }

        axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

        fetchPlaylist();

    }

    const fetchPlaylist = async () => {
        const httpEndpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;

        try {
            let result = await axios(`${httpEndpoint}`);
            setPlaylists(result.data.items);

        } catch (e) {
            errorHandler(e);
        }

    }

    const search = async () => {

        if (!keywords) return setSearchList(null);

        const httpEndpoint = `https://api.spotify.com/v1/search`;
        const type = `track`;

        try {
            let result = await axios(`${httpEndpoint}?q=${keywords}&type=${type}`);
            console.log(result.data);
            setSearchList(result.data);

        } catch (e) {
            errorHandler(e);
        }


    }

    const addToPlaylist = async () => {
        let urisArr = [];
        urisArr.push(selectedSong);

        const data = { 'uris': urisArr };
        const httpEndpoint = `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks`;

        try {
            let result = await axios.post(`${httpEndpoint}`, data);
            if (result.data.snapshot_id) {
                setPopupShow(false);
                setSelectedPlaylistId('');
                toast.success(`Successfully added to the playlist`, {});
            }
            console.log(result);

        } catch (e) {
            errorHandler(e);
        }


    }

    useEffect(() => {
        initData();
    }, []);

    return (
        <div className="container my-3">
            {popupShow &&
                <div className="popup">
                    <div className="popup-box">
                        <div className="popup-content p-3">
                            <h4>Click to select a playlist to add</h4>
                            {playlists.length === 0 &&
                                <div>
                                    <h2>Do not have playlist yet.</h2>
                                    <div>
                                        Go to
                                        <a href="https://open.spotify.com" target="_blank"> my accout </a>
                                        to create one.
                                    </div>
                                </div>
                            }
                            {
                                playlists.map(playlist => {
                                    return (
                                        <div key={playlist.id} onClick={() => selectPlaylist(playlist.id)}
                                            className="playlist"
                                            style={{ color: selectedPlaylistId == playlist.id ? '#484848' : '#888' }}>
                                            {playlist.name}
                                        </div>
                                    );
                                })
                            }
                            <button type="button" className="btn btn-dark btn-sm" onClick={() => addToPlaylist()} disabled={!selectedPlaylistId}>
                                Add to playlist
                            </button>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => popupShowStatus(false)}>
                                Cancle
                            </button>
                        </div>
                    </div>
                </div>
            }

            <div className="row">
                <div className="col-md-4">
                    <Playlists playlists={playlists} />
                </div>

                <div className="col-md-8">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for songs" value={keywords} onChange={inputKeywords} />
                        <div className="input-group-append" id="button-addon4">
                            <button className="btn btn-outline-secondary" type="button" onClick={search}>Search</button>
                        </div>
                    </div>

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