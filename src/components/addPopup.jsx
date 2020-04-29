import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import errorHandler from '../services/errorHandler';

export default function AddPopup(props) {
    const { playlists, popupShowStatus, selectedSong } = props;

    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
    const selectPlaylist = (id) => setSelectedPlaylistId(id);

    const addToPlaylist = async () => {
        let urisArr = [];
        urisArr.push(selectedSong);

        const data = { 'uris': urisArr };
        const httpEndpoint = `https://api.spotify.com/v1/playlists/${selectedPlaylistId}/tracks`;

        try {
            let result = await axios.post(`${httpEndpoint}`, data);
            if (result.data.snapshot_id) {
                popupShowStatus(false);
                setSelectedPlaylistId('');
                toast.success(`Successfully added to the playlist`, {});
            }
        } catch (e) { errorHandler(e); }
    }

    return (
        <div className="popup">
            <div className="popup-box">
                <div className="popup-content p-3">
                    <h4>Click to select a playlist to add</h4>
                    {playlists.length === 0 &&
                        <div>
                            <h2>No playlist yet.</h2>
                            <div>Please create one to add in.</div>
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
                    <button type="button" className="btn btn-dark btn-sm" onClick={addToPlaylist} disabled={!selectedPlaylistId}>
                        Add to playlist
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => popupShowStatus(false)}>
                        Cancle
                    </button>
                </div>
            </div>
        </div>
    )
}