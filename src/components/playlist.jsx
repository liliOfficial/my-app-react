import React from 'react';

export default function Playlists(props) {
    const { playlists } = props;
    return (
        <div className="text-left">
            <h4>My playlists</h4>
            <div className="my-playlist">
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