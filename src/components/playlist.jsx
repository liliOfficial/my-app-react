import React, { useState } from 'react';

export default function Playlists(props) {
    const { playlists, creatPlaylist, fetchPlaylist } = props;

    const [name, setName] = useState('');
    const inputName = (e) => setName(e.target.value);

    return (
        <div className="text-left mb-3">
            <h4>My playlists</h4>

            <div className="input-group mb-2">
                <input type="text" className="form-control" placeholder="New playlist name" value={name} onChange={inputName} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={() => creatPlaylist(name)}>Add</button>
                </div>
            </div>

            <div className="my-playlist">
                {playlists && playlists.length === 0 &&
                    <div>
                        No playlist yet.
                    </div>
                }
                {playlists &&
                    playlists.map(playlist => {
                        return (
                            <div key={playlist.id} className="playlist">
                                {playlist.name}
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}